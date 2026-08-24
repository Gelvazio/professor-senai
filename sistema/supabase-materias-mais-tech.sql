-- Cadastra as 8 pastas de FICHA-PRODUTO-MAIS-TECH como matérias
-- e cria os vínculos com o curso Rio do Sul Mais Tech.
-- O script é idempotente: pode ser executado novamente sem duplicar dados.

alter table public.materia
  add column if not exists ementa_caminho text;

alter table public.materia
  add column if not exists apostila_caminho text;

alter table public.materia
  add column if not exists status_criacao_avaliacao text not null default 'PENDENTE'
    check (status_criacao_avaliacao in ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO'));

alter table public.materia
  add column if not exists status_plano_aula text not null default 'PENDENTE'
    check (status_plano_aula in ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO'));

alter table public.materia
  add column if not exists status_plano_ensino text not null default 'PENDENTE'
    check (status_plano_ensino in ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO'));

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

  update public.materia
     set ementa_caminho = case lower(trim(descricao))
       when lower('Competências Socioemocionais e Empreendedorismo') then 'FICHA-PRODUTO-MAIS-TECH/COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO/ementa_Competencias_Socioemocionais_Empreendedorismo.md'
       when lower('Exploração de Carreiras Industriais e Tecnológicas') then 'FICHA-PRODUTO-MAIS-TECH/EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/ementa_Exploracao_Carreiras_Industriais_Tecnologicas.md'
       when lower('Fundamentos da Tecnologia e Programação') then 'FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ementa_Fundamentos_Tecnologia_Programacao.md'
       when lower('Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho') then 'FICHA-PRODUTO-MAIS-TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/Ementa_Introducao_Comunicacao_Oral_Escrita.md'
       when lower('Noções de Eletricidade e Circuitos Básicos') then 'FICHA-PRODUTO-MAIS-TECH/NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS/Ementa_Nocoes_Eletricidade_Circuitos_Basicos.md'
       when lower('Oficinas de Impressão 3D e Robótica') then 'FICHA-PRODUTO-MAIS-TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/Ementa_Oficinas_Impressao_3D_Robotica.md'
       when lower('Reforço de Linguagens') then 'FICHA-PRODUTO-MAIS-TECH/REFORCO_LINGUAGENS/Ementa_Reforco_Linguagens.md'
       when lower('Reforço Matemática e Raciocínio Lógico') then 'FICHA-PRODUTO-MAIS-TECH/REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO/ementa_Reforco_Matematica_Raciocinio_Logico.md'
       else ementa_caminho
     end
   where lower(trim(descricao)) in (
     lower('Competências Socioemocionais e Empreendedorismo'),
     lower('Exploração de Carreiras Industriais e Tecnológicas'),
     lower('Fundamentos da Tecnologia e Programação'),
     lower('Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho'),
     lower('Noções de Eletricidade e Circuitos Básicos'),
     lower('Oficinas de Impressão 3D e Robótica'),
     lower('Reforço de Linguagens'),
     lower('Reforço Matemática e Raciocínio Lógico')
   );

  update public.materia
     set apostila_caminho = case lower(trim(descricao))
       when lower('Competências Socioemocionais e Empreendedorismo') then 'FICHA-PRODUTO-MAIS-TECH/COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO/Apostila_Competencias_Socioemocionais_Empreendedorismo.md'
       when lower('Exploração de Carreiras Industriais e Tecnológicas') then 'FICHA-PRODUTO-MAIS-TECH/EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/Apostila_Exploracao_Carreiras_Industriais_Tecnologicas.md'
       when lower('Fundamentos da Tecnologia e Programação') then 'FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/Apostila_Fundamentos_Tecnologia_Programacao.md'
       when lower('Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho') then 'FICHA-PRODUTO-MAIS-TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/Apostila_Comunicacao_Oral_Escrita_33h.md'
       when lower('Noções de Eletricidade e Circuitos Básicos') then 'FICHA-PRODUTO-MAIS-TECH/NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS/Apostila_Nocoes_Eletricidade_Circuitos_Basicos.md'
       when lower('Oficinas de Impressão 3D e Robótica') then 'FICHA-PRODUTO-MAIS-TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/Apostila_Oficinas_Impressao_3D_Robotica.md'
       when lower('Reforço de Linguagens') then 'FICHA-PRODUTO-MAIS-TECH/REFORCO_LINGUAGENS/Apostila_Reforco_Linguagens.md'
       when lower('Reforço Matemática e Raciocínio Lógico') then 'FICHA-PRODUTO-MAIS-TECH/REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO/Apostila_Reforco_Matematica_Raciocinio_Logico.md'
       else apostila_caminho
     end
   where lower(trim(descricao)) in (
     lower('Competências Socioemocionais e Empreendedorismo'),
     lower('Exploração de Carreiras Industriais e Tecnológicas'),
     lower('Fundamentos da Tecnologia e Programação'),
     lower('Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho'),
     lower('Noções de Eletricidade e Circuitos Básicos'),
     lower('Oficinas de Impressão 3D e Robótica'),
     lower('Reforço de Linguagens'),
     lower('Reforço Matemática e Raciocínio Lógico')
   );
end;
$$;
