-- Script para adicionar coluna visivel_alunos na tabela materia
-- Permite controlar visibilidade de matérias para alunos
-- Data: 01-09-2026

ALTER TABLE materia ADD COLUMN IF NOT EXISTS visivel_alunos VARCHAR(3) DEFAULT 'SIM';

-- Adicionar comentário à coluna
COMMENT ON COLUMN materia.visivel_alunos IS 'SIM = matéria visível para alunos | NAO = matéria oculta para alunos | Professor sempre vê tudo';

-- Criar índice para filtros rápidos
CREATE INDEX IF NOT EXISTS idx_materia_visivel_alunos ON materia(visivel_alunos);
