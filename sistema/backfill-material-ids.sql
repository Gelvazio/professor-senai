-- Backfill: atribui id inteiro incremental a materiais sem id em curso.materias
DO $$
DECLARE
  max_id  INTEGER;
  counter INTEGER;
  cur     RECORD;
  i       INTEGER;
  j       INTEGER;
  aula    JSONB;
  mat     JSONB;
  new_mats    JSONB;
  new_aula    JSONB;
  new_materias JSONB;
BEGIN
  -- acha o maior id inteiro já existente em qualquer material
  SELECT COALESCE(MAX((m->>'id')::integer), 0) INTO max_id
  FROM curso c,
       jsonb_array_elements(c.materias) AS a,
       jsonb_array_elements(a->'materiais') AS m
  WHERE c.materias IS NOT NULL
    AND m->>'id' ~ '^\d+$';

  counter := max_id;

  FOR cur IN SELECT id, materias FROM curso WHERE materias IS NOT NULL LOOP
    new_materias := '[]'::jsonb;

    FOR i IN 0 .. jsonb_array_length(cur.materias) - 1 LOOP
      aula     := cur.materias -> i;
      new_mats := '[]'::jsonb;

      IF aula -> 'materiais' IS NOT NULL THEN
        FOR j IN 0 .. jsonb_array_length(aula -> 'materiais') - 1 LOOP
          mat := aula -> 'materiais' -> j;
          IF (mat->>'id') IS NULL OR (mat->>'id') = '' THEN
            counter  := counter + 1;
            mat      := mat || jsonb_build_object('id', counter);
          END IF;
          new_mats := new_mats || jsonb_build_array(mat);
        END LOOP;
        new_aula := jsonb_set(aula, '{materiais}', new_mats);
      ELSE
        new_aula := aula;
      END IF;

      new_materias := new_materias || jsonb_build_array(new_aula);
    END LOOP;

    UPDATE curso SET materias = new_materias WHERE id = cur.id;
  END LOOP;

  RAISE NOTICE 'Backfill concluido. Ultimo id atribuido: %', counter;
END $$;
