-- Tabela de Unidades (locais de realização dos cursos)

CREATE TABLE IF NOT EXISTS public.unidade (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  descricao text NOT NULL,
  cidade text,
  bairro text,
  endereco text
);

ALTER TABLE public.unidade ENABLE ROW LEVEL SECURITY;

CREATE POLICY "unidade_select" ON public.unidade
  FOR SELECT USING (true);

CREATE POLICY "unidade_insert" ON public.unidade
  FOR INSERT WITH CHECK (true);

CREATE POLICY "unidade_update" ON public.unidade
  FOR UPDATE USING (true);

CREATE POLICY "unidade_delete" ON public.unidade
  FOR DELETE USING (true);

COMMENT ON TABLE public.unidade IS 'Locais onde os cursos são realizados.';
COMMENT ON COLUMN public.unidade.descricao IS 'Nome da unidade.';
COMMENT ON COLUMN public.unidade.cidade IS 'Cidade da unidade.';
COMMENT ON COLUMN public.unidade.bairro IS 'Bairro da unidade.';
COMMENT ON COLUMN public.unidade.endereco IS 'Endereço completo da unidade.';
