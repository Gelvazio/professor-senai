# Andamento do Módulo de Recursos Humanos

> Acompanhamento de implementação baseado em `rh/recursos-humanos.md`.  
> Atualizado em: 2026-08-16

## Legenda

| Ícone | Status |
|-------|--------|
| ✅ | Concluído |
| 🔄 | Em andamento (parcialmente implementado — campos faltantes ou divergências) |
| ❌ | Não iniciado |

---

## Seção 2 — Cadastros Base

### 2.1 Departamentos

| Item | Status | Observação |
|------|--------|------------|
| `rh/departamentos.html` | ✅ Concluído | CRUD completo com numeração `DEP00001` |
| Tabela `rh_departamentos` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Campos: codigo, nome, responsavel, centro_custo, ativo, observacoes | ✅ Concluído | — |

---

### 2.2 Cargos

| Item | Status | Observação |
|------|--------|------------|
| `rh/cargos.html` | ✅ Concluído | CRUD completo com numeração `CGO00001` |
| Tabela `rh_cargos` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Campos: codigo, nome, departamento, cbo, salario_base, nivel, ativo, descricao | ✅ Concluído | — |

---

### 2.3 Funcionários

| Item | Status | Observação |
|------|--------|------------|
| `rh/funcionarios.html` | ✅ Concluído | CRUD completo com numeração `F00001` |
| Tabela `rh_funcionarios` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Autopreenchimento via ViaCEP | ✅ Concluído | — |
| Upload de foto (thumbnail) | ✅ Concluído | — |
| Campos: matricula, nome, cpf, rg, data_nascimento, sexo, estado_civil, email, telefone, endereco, cidade, estado, cep, departamento, cargo, tipo_contrato, salario, data_admissao, data_desligamento, banco, agencia, conta, tipo_conta, chave_pix, foto, pis_pasep, ctps, ativo, observacoes | ✅ Concluído | — |

---

### 2.4 Benefícios Cadastrados

| Item | Status | Observação |
|------|--------|------------|
| `rh/beneficios.html` | 🔄 Em andamento | Campos base implementados; campos extras da seção 11.1 faltam |
| Tabela `rh_beneficios` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Campos base: nome, tipo, valor_empresa, valor_funcionario, ativo, observacoes | ✅ Concluído | — |
| Campo `descricao` (seção 11.1) | ❌ Não implementado | Campo adicional definido em `beneficios` (sec 11.1) |
| Campo `periodicidade` — Mensal/Anual/Eventual (seção 11.1) | ❌ Não implementado | — |
| Campo `obrigatorio` toggle — para todos os CLT (seção 11.1) | ❌ Não implementado | — |

---

## Seção 3 — Ponto Eletrônico

### 3.1 Jornadas de Trabalho

| Item | Status | Observação |
|------|--------|------------|
| `rh/jornadas.html` | ✅ Concluído | CRUD completo |
| Tabela `rh_jornadas` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Campos: nome, entrada, inicio_intervalo, fim_intervalo, saida, carga_horaria_diaria, dias_semana (checkboxes), ativo | ✅ Concluído | — |

---

### 3.2 Registros de Ponto

| Item | Status | Observação |
|------|--------|------------|
| `rh/ponto.html` | ✅ Concluído | CRUD completo com numeração `PT00001` |
| Tabela `rh_ponto` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Cálculo automático de horas trabalhadas e horas extras | ✅ Concluído | — |
| Campos: numero, funcionario, data, entrada, inicio_intervalo, fim_intervalo, saida, horas_trabalhadas, horas_extras, ocorrencia, responsavel, observacoes | ✅ Concluído | — |

---

### 3.3 Apuração de Ponto (Painel)

| Item | Status | Observação |
|------|--------|------------|
| `rh/apuracao-ponto.html` | ✅ Concluído | Painel de visão consolidada por período |
| Filtros: Funcionário, Departamento, Período (Mês/Ano) | ✅ Concluído | — |
| Totais: dias trabalhados, faltas, horas extras, banco de horas | ✅ Concluído | — |
| Exportar PDF | ✅ Concluído | via `window.print()` |

---

## Seção 4 — Folha de Pagamento

### 4.1 Competências (Períodos de Folha)

| Item | Status | Observação |
|------|--------|------------|
| Tabela `rh_folha_competencias` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Gestão de competências (AAAA-MM) | 🔄 Em andamento | Gerenciada inline em `folha.html` como texto, não como tabela separada com FK |
| Campos: competencia, status (Em Elaboração/Fechada/Paga), data_pagamento, observacoes | 🔄 Em andamento | Status e data_pagamento gerenciados diretamente nos lançamentos |

---

### 4.2 Lançamentos da Folha

| Item | Status | Observação |
|------|--------|------------|
| `rh/folha.html` | 🔄 Em andamento | Implementado com texto direto em vez de FK para `rh_folha_competencias` |
| Tabela `rh_folha_lancamentos` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Numeração `FL00001` | ✅ Concluído | — |
| Cálculo automático INSS (tabela progressiva 2026) | ✅ Concluído | — |
| Cálculo automático IRRF (tabela progressiva 2026) | ✅ Concluído | — |
| Cálculo Salário Líquido | ✅ Concluído | — |
| Botão "Salvar como PDF" (holerite) | ✅ Concluído | — |
| Campo `competencia_id` FK para `rh_folha_competencias` | 🔄 Em andamento | Usa campo `competencia` texto (AAAA-MM) em vez de FK |
| Campo `valor_horas_extras` (separado de `horas_extras`) | ✅ Concluído | — |
| Campo `desc_vale_transporte` (máx 6% salário bruto) | ✅ Concluído | — |
| Campo `desc_vale_refeicao` | ✅ Concluído | — |
| Status: Rascunho, Calculado, Aprovado, Pago | ✅ Concluído | — |

---

### 4.3 13º Salário

| Item | Status | Observação |
|------|--------|------------|
| `rh/decimo-terceiro.html` | ✅ Concluído | CRUD completo com numeração `13S00001` |
| Tabela `rh_decimo_terceiro` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Cálculo proporcional (meses/12 × salário) | ✅ Concluído | — |
| Cálculo INSS e IRRF (2ª parcela) | ✅ Concluído | — |
| Campos: numero, competencia (ano), funcionario, parcela (1ª/2ª), valor_bruto, inss, irrf, valor_liquido, status | ✅ Concluído | — |

---

## Seção 5 — Férias e Afastamentos

### 5.1 Controle de Férias

| Item | Status | Observação |
|------|--------|------------|
| `rh/ferias.html` | ✅ Concluído | CRUD completo com numeração `FER00001` |
| Tabela `rh_ferias` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Cálculo automático Data de Término | ✅ Concluído | — |
| Cálculo Valor Adicional (1/3) | ✅ Concluído | — |
| Alerta de férias vencidas (> 24 meses) | ✅ Concluído | — |
| Abono Pecuniário (toggle) | ✅ Concluído | — |
| Campos: numero, funcionario, periodo_aquisitivo, dias_ferias, data_inicio, data_termino, abono_pecuniario, valor_adicional, status, aprovado_por, observacoes | ✅ Concluído | — |

---

### 5.2 Afastamentos

| Item | Status | Observação |
|------|--------|------------|
| `rh/afastamentos.html` | ✅ Concluído | CRUD completo com numeração `AFS00001` |
| Tabela `rh_afastamentos` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Upload de documento (PDF atestado) | ✅ Concluído | — |
| Cálculo automático Dias Afastados | ✅ Concluído | — |
| Campos: numero, funcionario, tipo, data_inicio, data_termino, dias_afastados, cid, numero_inss, gera_desconto, documento_url, status, responsavel, observacoes | ✅ Concluído | — |

---

## Seção 6 — Treinamentos

### 6.1 Catálogo de Treinamentos

| Item | Status | Observação |
|------|--------|------------|
| `rh/treinamentos.html` | 🔄 Em andamento | CRUD implementado; campos `modalidade` e `obrigatorio` faltam |
| Tabela `rh_treinamentos` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Campos: codigo (`TRN00001`), nome, tipo, carga_horaria, validade_meses, instrutor, custo, ativo, descricao | ✅ Concluído | — |
| Campo `modalidade` — Presencial/Online/Híbrido | ❌ Não implementado | Previsto na spec e na tabela `rh_treinamentos` |
| Campo `obrigatorio` (toggle) | ❌ Não implementado | Indica se todos os funcionários devem realizar |

---

### 6.2 Participações em Treinamentos

| Item | Status | Observação |
|------|--------|------------|
| `rh/participacoes.html` | 🔄 Em andamento | CRUD implementado; campo certificado diverge do spec |
| Tabela `rh_participacoes` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Numeração `PAR00001` | ✅ Concluído | — |
| Preenchimento automático data de vencimento | ✅ Concluído | Calcula com base em `validade_meses` do treinamento |
| Status: Pendente, Realizado, Aprovado, Reprovado, Vencido | ✅ Concluído | — |
| Campo `certificado_url` (upload PDF) | 🔄 Em andamento | Implementado como `certificado_emitido` (boolean) em vez de upload |
| Campos: numero, treinamento, funcionario, data_realizacao, data_vencimento, nota, status, observacoes | ✅ Concluído | — |

---

## Seção 7 — Admissão e Desligamento

### 7.1 Solicitação de Admissão

| Item | Status | Observação |
|------|--------|------------|
| `rh/admissao.html` | 🔄 Em andamento | Implementado com campos extras de candidato não previstos na spec |
| Tabela `rh_admissoes` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Numeração `ADM00001` | ✅ Concluído | — |
| Campos da vaga: cargo, departamento (auto), salario_proposto, tipo_contrato, data_inicio_prevista, solicitante, status, observacoes | ✅ Concluído | — |
| Campo `justificativa` (texto longo) | ❌ Não implementado | Previsto na spec |
| Campo `aprovado_por` | ❌ Não implementado | Previsto na spec |
| Status: Pendente, Aprovada, Reprovada, Cancelada, Concluída | 🔄 Em andamento | Nossa implementação pode ter opções diferentes |
| Campos extras não previstos: nome_candidato, cpf, email, telefone, data_nascimento | ⚠️ Extra | Adicionados na implementação mas não estão no spec |

---

### 7.2 Desligamento

| Item | Status | Observação |
|------|--------|------------|
| `rh/desligamento.html` | 🔄 Em andamento | Implementado com campos incompletos vs. spec |
| Tabela `rh_desligamentos` (Supabase) | ❌ A criar | SQL disponível na seção 11 do spec |
| Numeração `DLG00001` | ✅ Concluído | — |
| Inativação automática do funcionário ao concluir | ✅ Concluído | Chama `sbAtualizar('rh_funcionarios', id, {ativo:false})` |
| Campo `tipo_desligamento` com opções completas (Pedido de Demissão, Dispensa Sem/Com Justa Causa, etc.) | 🔄 Em andamento | Implementado como `tipo` com opções simplificadas |
| Campo `data_aviso_previo` | ❌ Não implementado | Data em que foi dado o aviso |
| Campo `dias_aviso` (30 padrão CLT) | ❌ Não implementado | — |
| Campo `aviso_trabalhado` (toggle Sim/Não) | ❌ Não implementado | Spec: Sim = cumpre aviso; Não = indenizado |
| Campo `saldo_ferias` (calculado automaticamente) | ❌ Não implementado | Férias proporcionais a pagar |
| Campo `decimo_proporcional` (calculado automaticamente) | ❌ Não implementado | Meses trabalhados no ano corrente |
| Campo `multa_fgts` (40% — só para dispensa sem justa causa) | ❌ Não implementado | Condicional por tipo de desligamento |
| Campo `homologado_por` | ❌ Não implementado | Responsável pela homologação |
| Status: Em Andamento, Homologado, Cancelado | 🔄 Em andamento | Nossa implementação usa "Concluído" em vez de "Homologado" |

---

## Seção 8 — Vínculos de Benefícios

| Item | Status | Observação |
|------|--------|------------|
| Tela `rh/vinculo-beneficios.html` | ❌ Não iniciado | Não listada na seção 10 (telas), mas prevista na seção 8 e 11.1 |
| Tabela `rh_funcionario_beneficios` (Supabase) | ❌ Não iniciado | SQL disponível na seção 11 do spec |
| Tabela `beneficio_funcionario` (Supabase, seção 11.1) | ❌ Não iniciado | Versão alternativa com campos extras: `periodicidade`, `obrigatorio` |
| Campos: funcionario, beneficio, data_inicio, data_termino, valor_customizado, observacoes | ❌ Não iniciado | — |

---

## Seção 9 — Painel de RH (Dashboard)

| Item | Status | Observação |
|------|--------|------------|
| `rh/dashboard.html` | ✅ Concluído | Painel sem formulário próprio |
| KPIs: funcionários ativos, afastamentos, férias em gozo, admissões pendentes | ✅ Concluído | — |
| Aniversariantes do mês | ✅ Concluído | — |
| Afastamentos em andamento | ✅ Concluído | — |
| Próximas férias agendadas | ✅ Concluído | — |
| Admissões pendentes | ✅ Concluído | — |
| Últimas participações em treinamentos | ✅ Concluído | — |
| Folha do mês (total líquido) | ✅ Concluído | — |

---

## Seção 11.1 — Tabelas e Telas Extras

### Progressão de Desempenho

| Item | Status | Observação |
|------|--------|------------|
| Tela `rh/progressao-desempenho.html` | ❌ Não iniciado | CRUD de faixas salariais por cargo/nível |
| Tabela `progressao_desempenho` (Supabase) | ❌ Não iniciado | SQL disponível na seção 11.1 do spec |
| Campos: cargo, nivel, nivel_ordem, salario_minimo, salario_medio, salario_maximo, tempo_minimo_meses, nota_minima, requisitos, ativo | ❌ Não iniciado | — |

---

### Avaliação de Desempenho

| Item | Status | Observação |
|------|--------|------------|
| Tela `rh/avaliacao-desempenho.html` | ❌ Não iniciado | CRUD de avaliações com elegibilidade de promoção |
| Tabela `avaliacao_desempenho` (Supabase) | ❌ Não iniciado | SQL disponível na seção 11.1 do spec |
| Numeração `AVL00001` | ❌ Não iniciado | — |
| Campos: numero, funcionario, avaliador, periodo, nota_tecnica, nota_comportamental, nota_geral (média ponderada), elegivel_promocao (calculado), promocao_aprovada, novo_nivel, novo_salario, data_avaliacao, proxima_avaliacao, observacoes | ❌ Não iniciado | — |
| Regras de elegibilidade automática (verifica `progressao_desempenho`) | ❌ Não iniciado | — |

---

## Integração com Sistema

| Item | Status | Observação |
|------|--------|------------|
| `sistema.json` — entrada siscodigo=11 "Recursos Humanos" | ✅ Concluído | Verificado |
| `configuracoes/perfis.html` — sisOrdem inclui 11 | ✅ Concluído | Verificado |
| Sidebar RH adicionada em todos os HTML do ERP | ✅ Concluído | 33+ arquivos atualizados |

---

## Banco de Dados (Supabase) — SQL a executar

Todos os SQLs estão disponíveis na seção 11 e 11.1 de `rh/recursos-humanos.md`.

| Tabela | Status |
|--------|--------|
| `rh_departamentos` | ❌ A criar no Supabase |
| `rh_cargos` | ❌ A criar no Supabase |
| `rh_funcionarios` | ❌ A criar no Supabase |
| `rh_beneficios` | ❌ A criar no Supabase |
| `rh_funcionario_beneficios` | ❌ A criar no Supabase |
| `rh_jornadas` | ❌ A criar no Supabase |
| `rh_ponto` | ❌ A criar no Supabase |
| `rh_folha_competencias` | ❌ A criar no Supabase |
| `rh_folha_lancamentos` | ❌ A criar no Supabase |
| `rh_decimo_terceiro` | ❌ A criar no Supabase |
| `rh_ferias` | ❌ A criar no Supabase |
| `rh_afastamentos` | ❌ A criar no Supabase |
| `rh_treinamentos` | ❌ A criar no Supabase |
| `rh_participacoes` | ❌ A criar no Supabase |
| `rh_admissoes` | ❌ A criar no Supabase |
| `rh_desligamentos` | ❌ A criar no Supabase |
| `beneficio_funcionario` (sec 11.1) | ❌ A criar no Supabase |
| `progressao_desempenho` (sec 11.1) | ❌ A criar no Supabase |
| `avaliacao_desempenho` (sec 11.1) | ❌ A criar no Supabase |

---

## Resumo Geral

| Categoria | Concluído | Em Andamento | Não Iniciado |
|-----------|-----------|--------------|--------------|
| Páginas HTML (seção 10) | 10 | 6 | 0 |
| Páginas extras (seção 11.1) | 0 | 0 | 3 |
| Tabelas Supabase | 0 | 0 | 19 |
| Integração (sistema.json, sidebar, perfis) | 3 | 0 | 0 |

### Pendências prioritárias

1. **Banco de dados** — executar os SQLs da seção 11 e 11.1 no Supabase (19 tabelas)
2. **`rh/desligamento.html`** — adicionar campos: `data_aviso_previo`, `dias_aviso`, `aviso_trabalhado`, `saldo_ferias`, `decimo_proporcional`, `multa_fgts`, `homologado_por`
3. **`rh/treinamentos.html`** — adicionar campos: `modalidade`, `obrigatorio`
4. **`rh/vinculo-beneficios.html`** — criar tela de vínculos funcionário × benefício
5. **`rh/progressao-desempenho.html`** — criar tela de faixas salariais
6. **`rh/avaliacao-desempenho.html`** — criar tela de avaliações periódicas (`AVL00001`)
7. **`rh/admissao.html`** — adicionar campos `justificativa` e `aprovado_por`; revisar status options
8. **`rh/beneficios.html`** — adicionar campos `descricao`, `periodicidade`, `obrigatorio`
9. **`rh/participacoes.html`** — substituir `certificado_emitido` (boolean) por upload de PDF
