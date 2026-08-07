-- Backfill: gera gen_random_uuid() para materiais sem id dentro de curso.materias
UPDATE curso
SET materias = (
  SELECT jsonb_agg(
    jsonb_set(
      aula,
      '{materiais}',
      COALESCE(
        (
          SELECT jsonb_agg(
            CASE
              WHEN mat->>'id' IS NULL OR mat->>'id' = ''
              THEN mat || jsonb_build_object('id', gen_random_uuid()::text)
              ELSE mat
            END
          )
          FROM jsonb_array_elements(aula->'materiais') AS mat
        ),
        '[]'::jsonb
      )
    )
  )
  FROM jsonb_array_elements(materias) AS aula
)
WHERE materias IS NOT NULL;
