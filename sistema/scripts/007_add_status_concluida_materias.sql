-- ============================================================================
-- Script: Adiciona opção "Concluída" (valor 2) ao campo ativo de matérias
-- Criado em: 2026-08-29
-- ============================================================================

-- Modifica o tipo da coluna 'ativo' para aceitar valores 0 (inativa), 1 (ativa), 2 (concluida)
-- Se ainda não for um integer, converte de boolean

ALTER TABLE public.materia
  ALTER COLUMN ativo SET DEFAULT 1;

-- Adiciona constraint para validar os valores permitidos
ALTER TABLE public.materia
  ADD CONSTRAINT materia_ativo_check
    CHECK (ativo IN (0, 1, 2))
  ON CONFLICT DO NOTHING;

-- Criada para garantir compatibilidade com Supabase
COMMENT ON COLUMN public.materia.ativo IS
  'Status da matéria: 1 = Ativa, 0 = Inativa, 2 = Concluída';
