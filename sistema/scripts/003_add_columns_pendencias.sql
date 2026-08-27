-- =============================================================================
-- Script: Adiciona colunas faltantes à tabela pendencias
-- Descrição: Migração segura - adiciona campos sem dropar a tabela existente
-- Data: 2026-08-27
-- =============================================================================

-- Adicionar coluna descricao se não existir
ALTER TABLE pendencias
ADD COLUMN IF NOT EXISTS descricao TEXT;

-- Adicionar coluna materia_descricao se não existir
ALTER TABLE pendencias
ADD COLUMN IF NOT EXISTS materia_descricao VARCHAR(255);

-- Adicionar coluna status se não existir (com constraint)
ALTER TABLE pendencias
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'PENDENTE'
    CHECK (status IN ('PENDENTE', 'CONCLUIDA', 'CANCELADA'));

-- Adicionar coluna data se não existir
ALTER TABLE pendencias
ADD COLUMN IF NOT EXISTS data DATE DEFAULT CURRENT_DATE;

-- Adicionar coluna datavencimento se não existir
ALTER TABLE pendencias
ADD COLUMN IF NOT EXISTS datavencimento DATE;

-- Adicionar coluna total_horas se não existir
ALTER TABLE pendencias
ADD COLUMN IF NOT EXISTS total_horas NUMERIC(10, 2);

-- Adicionar coluna horas_ministradas se não existir
ALTER TABLE pendencias
ADD COLUMN IF NOT EXISTS horas_ministradas NUMERIC(10, 2);

-- =============================================================================
-- Criar índice para datavencimento (se não existir)
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_pendencias_datavencimento ON pendencias(datavencimento);

-- =============================================================================
-- Atualizar constraint de validação (adiciona verificação de descricao)
-- =============================================================================

-- Nota: PostgreSQL não permite modificar constraints diretamente
-- Se precisar adicionar a constraint de "pelo menos um campo",
-- execute este comando manualmente:
/*
ALTER TABLE pendencias DROP CONSTRAINT IF EXISTS pendencias_pelo_menos_um_status;

ALTER TABLE pendencias ADD CONSTRAINT pendencias_pelo_menos_um_status_ou_descricao CHECK (
    status_criacao_avaliacao IS NOT NULL OR
    status_plano_aula IS NOT NULL OR
    status_plano_ensino IS NOT NULL OR
    status_avaliacao IS NOT NULL OR
    status_gabarito IS NOT NULL OR
    status_revisao IS NOT NULL OR
    status_cadastro_sgn IS NOT NULL OR
    acompanhamento_pedagogico_sgn IS NOT NULL OR
    descricao IS NOT NULL
);
*/

-- =============================================================================
-- Atualizar comentários das colunas
-- =============================================================================

COMMENT ON COLUMN pendencias.descricao IS 'Descrição da pendência (para tarefas manuais)';
COMMENT ON COLUMN pendencias.materia_descricao IS 'Nome da matéria associada (cópia para busca/exibição)';
COMMENT ON COLUMN pendencias.status IS 'Status geral da pendência: PENDENTE, CONCLUIDA ou CANCELADA';
COMMENT ON COLUMN pendencias.data IS 'Data de criação/registro da pendência';
COMMENT ON COLUMN pendencias.datavencimento IS 'Data de vencimento da pendência';
COMMENT ON COLUMN pendencias.total_horas IS 'Total de horas planejadas (para tarefas)';
COMMENT ON COLUMN pendencias.horas_ministradas IS 'Horas já ministradas (para tarefas)';

-- =============================================================================
-- Verificação
-- =============================================================================

-- Para verificar se os campos foram adicionados:
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'pendencias'
-- ORDER BY ordinal_position;
