-- Cadastra as 8 pastas de FICHA-PRODUTO-MAIS-TECH como matérias
-- e cria os vínculos com o curso Rio do Sul Mais Tech.
-- O script é idempotente: pode ser executado novamente sem duplicar dados.

do $$
declare
  v_curso_id bigint;
begin
  select id
    into v_curso_id
    from public.curso
   where nome_completo ilike '%MAIS%TECH%'
   order by case
     when upper(trim(nome_completo)) = 'RIO DO SUL MAIS TECH - SENAI' then 0
     else 1
   end,
   id
   limit 1;

  if v_curso_id is null then
    raise exception 'Curso Rio do Sul Mais Tech não encontrado na tabela curso.';
  end if;

  with materias_mais_tech(nome) as (
    values
      ('Competências Socioemocionais e Empreendedorismo'),
      ('Exploração de Carreiras Industriais e Tecnológicas'),
      ('Fundamentos da Tecnologia e Programação'),
      ('Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho'),
      ('Noções de Eletricidade e Circuitos Básicos'),
      ('Oficinas de Impressão 3D e Robótica'),
      ('Reforço de Linguagens'),
      ('Reforço Matemática e Raciocínio Lógico')
  )
  insert into public.materia (descricao, ativo)
  select mm.nome, 1
    from materias_mais_tech mm
   where not exists (
     select 1
       from public.materia m
      where lower(trim(m.descricao)) = lower(trim(mm.nome))
   );

  with materias_mais_tech(nome) as (
    values
      ('Competências Socioemocionais e Empreendedorismo'),
      ('Exploração de Carreiras Industriais e Tecnológicas'),
      ('Fundamentos da Tecnologia e Programação'),
      ('Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho'),
      ('Noções de Eletricidade e Circuitos Básicos'),
      ('Oficinas de Impressão 3D e Robótica'),
      ('Reforço de Linguagens'),
      ('Reforço Matemática e Raciocínio Lógico')
  )
  insert into public.cursomateria (cursoid, materiaid)
  select v_curso_id, m.id
    from materias_mais_tech mm
    join public.materia m
      on lower(trim(m.descricao)) = lower(trim(mm.nome))
   where not exists (
     select 1
       from public.cursomateria cm
      where cm.cursoid = v_curso_id
        and cm.materiaid = m.id
   );
end;
$$;
