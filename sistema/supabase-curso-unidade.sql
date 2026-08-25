-- Adiciona a unidade responsável pelo curso.
alter table public.curso
  add column if not exists unidade text;

comment on column public.curso.unidade is
  'Nome da unidade/local de realização do curso.';
