-- Previne cursos com o mesmo nome na mesma unidade.
-- Cria índice único parcial: apenas quando unidade não é nula.

CREATE UNIQUE INDEX IF NOT EXISTS idx_curso_nome_unidade_unique
  ON public.curso (lower(trim(nome_completo)), lower(trim(unidade)))
  WHERE unidade IS NOT NULL;

-- Para unidades nulas, permite duplicatas (trata como "sem unidade definida")
-- mas previne múltiplos cursos sem unidade com o mesmo nome.
CREATE UNIQUE INDEX IF NOT EXISTS idx_curso_nome_sem_unidade_unique
  ON public.curso (lower(trim(nome_completo)))
  WHERE unidade IS NULL;

COMMENT ON INDEX public.idx_curso_nome_unidade_unique IS
  'Impede cursos com mesmo nome na mesma unidade.';

COMMENT ON INDEX public.idx_curso_nome_sem_unidade_unique IS
  'Impede cursos com mesmo nome quando a unidade não está definida.';
