# ERP Victor Anato — Orientações de Desenvolvimento

> Documento de referência para o desenvolvimento do sistema ERP. Leia integralmente antes de implementar qualquer módulo.

---

## Visão Geral do Sistema

Sistema ERP (Enterprise Resource Planning) voltado para gestão integrada de cadastros, compras, estoque, vendas e logística. O sistema deve ser construído como uma aplicação web moderna, com módulos independentes que se comunicam entre si através de vínculos entre registros (ex: Pedido de Compras vincula a uma Solicitação de Compras).

### Princípios Fundamentais

- Campos marcados com `*` são **obrigatórios** — deve haver validação no frontend e backend.
- Campos com numeração automática (ex: `P00001`, `SC00001`, `PC00001`) são **gerados pelo sistema**, sequenciais, **nunca editáveis** pelo usuário.
- Todo registro deve ter campo de **Observações** livre para anotações.
- O sistema deve manter **rastreabilidade** entre módulos: um Pedido de Venda pode ser rastreado até a Entrega.
- Registros com campo **Ativo/Ativa** permitem desativação sem exclusão (soft delete).

---

## Módulo 1 — CADASTROS

Módulo base do sistema. Todos os demais módulos dependem dos cadastros aqui realizados.

### 1.1 Clientes

Cadastro de clientes pessoa física ou jurídica.

| Campo | Tipo | Regras |
|-------|------|--------|
| Nome / Razão Social | Texto | **Obrigatório** |
| CNPJ / CPF | Texto | Validação de formato CPF (000.000.000-00) ou CNPJ (00.000.000/0001-00) |
| E-mail | E-mail | Validação de formato |
| Telefone | Texto | Máscara de telefone brasileiro |
| Segmento | Select | Tecnologia, Saúde, Varejo, Alimentação, Automobilístico, Metalmecânica, Madeireiro, Serviços, Agricultura, Transporte, Outros |
| Endereço | Texto | — |
| Cidade | Texto | — |
| Estado | Select | 27 UFs brasileiras (sigla) |
| CEP | Texto | Máscara 00000-000; integrar com API ViaCEP para autopreenchimento |
| Ativo | Toggle/Checkbox | Default: Ativo. Inativo oculta o cliente de seleções em outros módulos |

**Regras de negócio:**
- Não permitir CNPJ/CPF duplicado.
- Cliente inativo não deve aparecer em selects de Pedido de Venda, Romaneio, Entrega etc.
- Ao pesquisar por CEP via ViaCEP, preencher automaticamente Endereço, Cidade e Estado.

---

### 1.2 Fornecedores

Cadastro de fornecedores (sempre pessoa jurídica).

| Campo | Tipo | Regras |
|-------|------|--------|
| Nome / Razão Social | Texto | **Obrigatório** |
| CNPJ | Texto | Validação de formato CNPJ |
| Contato | Texto | Nome da pessoa de contato |
| E-mail | E-mail | Validação de formato |
| Telefone | Texto | Máscara de telefone |
| Segmento | Select | Mesmos segmentos de Clientes (exceto Embalagens, Manutenção e Reparos) |
| Endereço | Texto | — |
| Cidade | Texto | — |
| Estado | Select | 27 UFs brasileiras |
| CEP | Texto | Máscara + autopreenchimento via ViaCEP |
| Ativo | Toggle/Checkbox | Default: Ativo |

**Regras de negócio:**
- Não permitir CNPJ duplicado.
- Fornecedor inativo não aparece em selects de Pedido de Compras, Recebimento, Conferência etc.

---

### 1.3 Produtos

Cadastro do catálogo de produtos da empresa.

| Campo | Tipo | Regras |
|-------|------|--------|
| Código | Texto | **Gerado automaticamente** pelo sistema. Formato: `P00001` (sequencial, nunca editável) |
| Nome do Produto | Texto | **Obrigatório** |
| Categoria | Select | Tecnologia, Saúde, Varejo, Alimentação, Automobilístico, Metalmecânica, Madeireiro, Serviços, Agricultura, Transporte, Embalagens, Manutenção e Reparos, Outros |
| Unidade | Select | UN (Unidade), KG (Quilograma), LT (Litro), CX (Caixa), PC (Peça), MT (Metro) |
| Preço de Custo | Número | Formato monetário R$ 1.000,00 (separador de milhar ponto, decimal vírgula) |
| Preço de Venda | Número | Formato monetário R$ 1.000,00 |
| Estoque Atual | Número | Inteiro ou decimal conforme unidade. Atualizado automaticamente por movimentações |
| Estoque Mínimo | Número | Alerta visual quando Estoque Atual ≤ Estoque Mínimo |
| Estoque Máximo | Número | — |
| Imagem do Produto | Upload | Upload de imagem (JPG, PNG). Exibir thumbnail no cadastro e na listagem |
| Descrição | Texto longo | Campo textarea |
| Ativo | Toggle/Checkbox | Default: Ativo |

**Regras de negócio:**
- O código `P00001` é gerado no momento da criação e nunca se repete, mesmo que o produto seja excluído.
- O **Estoque Atual** não é editado manualmente — é calculado automaticamente com base nas movimentações (entradas via Recebimento de Compra; saídas via Pedido de Venda / Expedição).
- Exibir **alerta visual** (badge vermelho ou ícone de aviso) quando `Estoque Atual ≤ Estoque Mínimo`.
- Produto inativo não aparece em selects dos demais módulos.

---

### 1.4 Transportadoras

Cadastro das empresas de transporte utilizadas nas operações de logística.

| Campo | Tipo | Regras |
|-------|------|--------|
| Nome da Transportadora | Texto | **Obrigatório** |
| CNPJ | Texto | Validação de formato CNPJ |
| Tipo de Serviço | Texto/Select | Ex: Rodoviário, Aéreo, Marítimo, Expresso |
| Contato | Texto | Nome do responsável |
| E-mail | E-mail | Validação de formato |
| Telefone | Texto | Máscara de telefone |
| Cidade | Texto | — |
| Estado | Select | 27 UFs brasileiras |
| Ativa | Toggle/Checkbox | Default: Ativa |

**Regras de negócio:**
- Transportadora inativa não aparece em selects de Romaneio, Expedição, Entrega, Nota Fiscal de Venda.

---

## Módulo 2 — COMPRAS

Controla todo o ciclo de compras: do planejamento ao recebimento e entrada de nota fiscal.

### Fluxo do Módulo de Compras

```
Planejamento → Solicitação de Compras → Pedido de Compras → Recebimento → Conferência → Entrada de Nota Fiscal
```

### 2.1 Planejamento

Registro do planejamento de compras por período.

| Campo | Tipo | Regras |
|-------|------|--------|
| Título | Texto | **Obrigatório** |
| Tipo | Select/Texto | Ex: Mensal, Trimestral, Anual |
| Produto | Select | Produtos ativos do cadastro |
| Período | Data ou Texto | Mês/Ano ou intervalo de datas |
| Qtd. Planejada | Número | Quantidade prevista |
| Qtd. Realizada | Número | Quantidade efetivamente comprada (atualizada ao longo do período) |
| Status | Select | Ex: Em Planejamento, Em Andamento, Concluído, Cancelado |
| Data | Data | Data do planejamento |
| Observações | Texto longo | — |

---

### 2.2 Solicitação de Compras

Registro formal de necessidade de compra de um produto.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número da Solicitação | Texto | **Gerado automaticamente**. Formato: `SC00001` (sequencial, nunca editável) |
| Produto | Select | **Obrigatório**. Produtos ativos |
| Quantidade | Número | **Obrigatório** |
| Unidade | Texto | Preenchido automaticamente com base no produto selecionado |
| Solicitante | Texto/Select | Nome ou usuário que solicitou |
| Prioridade | Select | Baixa, Média, Alta, Urgente |
| Status | Select | Pendente, Em Análise, Aprovada, Reprovada, Cancelada |
| Data | Data | Data da solicitação (default: hoje) |
| Observações | Texto longo | — |

---

### 2.3 Pedido de Compras

Formalização da compra junto ao fornecedor, vinculada a uma Solicitação.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número do Pedido | Texto | **Gerado automaticamente**. Formato: `PC00001` (sequencial, nunca editável) |
| Solicitação de Compras | Select | SC vinculada (opcional — pedido pode ser criado sem SC) |
| Fornecedor | Select | **Obrigatório**. Fornecedores ativos |
| Produto | Select | **Obrigatório**. Produtos ativos |
| Quantidade | Número | **Obrigatório** |
| Preço Unitário | Número | Formato R$ 1.000,00 |
| Valor Total | Número | **Calculado automaticamente**: Quantidade × Preço Unitário |
| Status | Select | Rascunho, Enviado, Confirmado, Cancelado, Recebido |
| Data | Data | Data do pedido (default: hoje) |
| Data Prevista | Data | Previsão de entrega do fornecedor |
| Observações | Texto longo | — |

**Ação especial:**
- Botão **"Salvar como PDF"** por registro: gera um PDF com todas as informações do pedido formatadas, pronto para envio ao fornecedor. O PDF deve incluir: número do pedido, dados do fornecedor, produto, quantidade, preço unitário, valor total, data, data prevista e observações.

---

### 2.4 Recebimento

Registro da chegada física da mercadoria.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número do Recebimento | Texto | **Obrigatório** (gerado automaticamente, formato `RC00001`) |
| Pedido de Compra | Select | PC vinculado |
| Fornecedor | Select/Texto | Preenchido automaticamente ao selecionar o PC |
| Produto | Select | **Obrigatório** |
| Qtd. Esperada | Número | Preenchida automaticamente com base no PC |
| Qtd. Recebida | Número | Quantidade que chegou fisicamente |
| Status | Select | Aguardando, Recebido Parcial, Recebido Total, Com Divergência |
| Responsável | Select/Texto | Usuário ou nome do responsável pelo recebimento |
| Data | Data | Data do recebimento (default: hoje) |
| Observações | Texto longo | — |

---

### 2.5 Conferência

Verificação da conformidade do que foi recebido.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número do Recebimento | Select | **Obrigatório**. Vinculado a um Recebimento existente |
| Fornecedor | Texto | Preenchido automaticamente |
| Produto | Select | **Obrigatório** |
| Qtd. Esperada | Número | Vinda do Recebimento |
| Qtd. Recebida | Número | Confirmação da quantidade conferida |
| Status | Select | Aprovado, Reprovado, Em Análise, Pendente |
| Responsável | Select/Texto | Conferente |
| Data | Data | Data da conferência |
| Observações | Texto longo | Registrar discrepâncias, avarias etc. |

---

### 2.6 Entrada de Nota Fiscal

Registro da Nota Fiscal do fornecedor para fins contábeis/fiscais.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número da Nota Fiscal | Texto | **Obrigatório** |
| Fornecedor | Select | **Obrigatório**. Fornecedores ativos |
| Recebimento | Select | Recebimento vinculado |
| Valor | Número | Valor total da NF em R$ |
| Qtd. Itens | Número | Quantidade de itens na nota |
| Status | Select | Pendente, Lançada, Cancelada, Devolvida |
| Data | Data | Data de emissão da NF |
| Observações | Texto longo | — |

**Regra de negócio:**
- Ao confirmar a Entrada de Nota Fiscal com status "Lançada", o sistema deve atualizar o **Estoque Atual** do produto (entrada no estoque).

---

## Módulo 3 — ESTOQUE

Controla armazenagem, movimentações e inventário dos produtos.

### 3.1 Armazenagem

Registro de movimentações físicas de produtos entre endereços/locais do estoque.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número da Movimentação | Texto | **Obrigatório** (gerado automaticamente, formato `MV00001`) |
| Produto | Select | **Obrigatório** |
| Tipo | Select | Entrada, Saída, Transferência |
| Quantidade | Número | **Obrigatório** |
| Origem (Endereço) | Texto | Localização de onde o produto sai |
| Destino (Endereço) | Texto | Localização para onde o produto vai |
| Usuário | Select/Texto | Usuário que registrou a movimentação |
| Data | Data | Data da movimentação |
| Hora | Hora | Hora da movimentação |
| Observações | Texto longo | — |

---

### 3.2 Controle de Estoque

Painel de visão geral — **não possui formulário de cadastro próprio**.

- Exibe todos os produtos cadastrados com: Código, Nome, Categoria, Unidade, Estoque Atual, Estoque Mínimo, Estoque Máximo.
- Indicador visual de status:
  - 🟢 Normal: `Estoque Atual > Estoque Mínimo`
  - 🟡 Atenção: `Estoque Atual = Estoque Mínimo`
  - 🔴 Crítico: `Estoque Atual < Estoque Mínimo`
- Filtros por Categoria, Status e busca por nome/código.
- Os dados vêm exclusivamente do módulo Produtos + histórico de movimentações.

---

### 3.3 Movimentações

Histórico completo de todas as movimentações de estoque.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número da Movimentação | Texto | **Obrigatório** (gerado automaticamente) |
| Produto | Select | **Obrigatório** |
| Tipo | Select | Entrada (compra, ajuste+), Saída (venda, ajuste-), Transferência |
| Quantidade | Número | **Obrigatório** |
| Origem | Texto | Local/endereço de origem |
| Destino | Texto | Local/endereço de destino |
| Usuário | Select/Texto | Quem registrou |
| Data | Data | — |
| Hora | Hora | — |
| Observações | Texto longo | — |

---

### 3.4 Inventário

Contagem física para conciliação com o sistema.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número do Inventário | Texto | **Obrigatório** (gerado automaticamente, formato `INV00001`) |
| Produto | Select | **Obrigatório** |
| Qtd. Sistema | Número | Preenchida automaticamente com o Estoque Atual do produto |
| Qtd. Contada | Número | Quantidade apurada na contagem física |
| Diferença | Número | **Calculada automaticamente**: Qtd. Contada − Qtd. Sistema |
| Status | Select | Pendente, Em Contagem, Conferido, Ajustado |
| Responsável | Select/Texto | — |
| Data | Data | Data da contagem |
| Observações | Texto longo | — |

**Regra de negócio:**
- Ao marcar inventário como "Ajustado", o sistema deve gerar automaticamente uma Movimentação de ajuste (positivo ou negativo) para corrigir o Estoque Atual.

---

## Módulo 4 — VENDAS E LOGÍSTICA

Controla todo o ciclo de venda: do pedido à entrega ao cliente.

### Fluxo do Módulo de Vendas e Logística

```
Pedido de Venda → Nota Fiscal de Venda → Separação (Picking) → Romaneio → Expedição → Entrega
```

### 4.1 Pedido de Venda

Registro do pedido feito pelo cliente.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número do Pedido | Texto | **Obrigatório** (gerado automaticamente, formato `PV00001`) |
| Cliente | Select | **Obrigatório**. Clientes ativos |
| Produto | Select | **Obrigatório**. Produtos ativos |
| Quantidade | Número | **Obrigatório** |
| Preço Unitário | Número | Preenchido automaticamente com o Preço de Venda do produto (editável) |
| Valor Total | Número | **Calculado automaticamente**: Quantidade × Preço Unitário |
| Status | Select | Rascunho, Confirmado, Em Separação, Em Expedição, Entregue, Cancelado |
| Data | Data | Data do pedido (default: hoje) |
| Data Prevista | Data | Previsão de entrega ao cliente |
| Observações | Texto longo | — |

**Regra de negócio:**
- Ao confirmar o Pedido de Venda, verificar se há estoque disponível. Alertar se `Qtd. Pedida > Estoque Atual`.
- Múltiplos produtos por pedido: o formulário deve permitir adicionar N linhas de produto.

---

### 4.2 Nota Fiscal de Venda

Documento fiscal emitido para o cliente.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número da NF | Texto | **Obrigatório** |
| Série | Texto | Série da NF (ex: 001) |
| Data de Emissão | Data | **Obrigatório** |
| Natureza da Operação | Texto | Ex: Venda de Mercadoria |
| Empresa Emitente | Select/Texto | **Obrigatório**. Dados da empresa emissora |
| Cliente Destinatário | Select | **Obrigatório**. Clientes ativos |
| Pedido de Venda | Select | PV vinculado |
| Produto | Select | **Obrigatório** |
| Quantidade | Número | — |
| Valor Unitário | Número | R$ |
| Valor dos Produtos | Número | Calculado automaticamente |
| Desconto | Número | R$ ou % |
| Frete | Número | R$ |
| Base ICMS | Número | R$ |
| Valor ICMS | Número | R$ |
| Valor IPI | Número | R$ |
| Valor Total | Número | **Calculado automaticamente** |
| Transportadora | Select | Transportadoras ativas |
| Frete por Conta | Select | Emitente (CIF), Destinatário (FOB), Sem Frete |
| Qtd. Volumes | Número | — |
| Peso Líquido | Número | kg |
| Peso Bruto | Número | kg |
| Status | Select | Rascunho, Emitida, Cancelada |
| Informações Complementares | Texto longo | — |

---

### 4.3 Romaneio

Lista de itens a serem despachados em uma operação de entrega.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número do Romaneio | Texto | **Obrigatório** (gerado automaticamente, formato `ROM00001`) |
| Data | Data | — |
| Pedido de Venda | Select | PV vinculado |
| Nota Fiscal | Select | NF vinculada |
| Expedição | Select | Expedição vinculada |
| Cliente | Select | **Obrigatório**. Clientes ativos |
| Transportadora | Select | **Obrigatório**. Transportadoras ativas |
| Produto | Select | **Obrigatório** |
| Quantidade | Número | — |
| Qtd. Volumes | Número | — |
| Peso Líquido | Número | kg |
| Peso Bruto | Número | kg |
| Responsável | Select/Texto | — |
| Status | Select | Rascunho, Emitido, Despachado |
| Observações | Texto longo | — |

---

### 4.4 Separação (Picking)

Processo de separação dos produtos no estoque para atender ao pedido.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número da Separação | Texto | **Obrigatório** (gerado automaticamente, formato `SEP00001`) |
| Pedido de Venda | Select | PV vinculado |
| Produto | Select | **Obrigatório** |
| Quantidade | Número | **Obrigatório** |
| Separador | Select/Texto | Usuário ou nome do responsável pela separação |
| Status | Select | Pendente, Em Separação, Concluído, Com Divergência |
| Data | Data | — |
| Observações | Texto longo | — |

---

### 4.5 Expedição

Registro do processo de envio dos produtos separados.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número da Expedição | Texto | **Obrigatório** (gerado automaticamente, formato `EXP00001`) |
| Pedido de Venda | Select | PV vinculado |
| Separação | Select | Separação vinculada |
| Transportadora | Select | **Obrigatório**. Transportadoras ativas |
| Quantidade | Número | — |
| Tipo de Embalagem | Select/Texto | Ex: Caixa, Palete, Saco, Granel |
| Status | Select | Pendente, Em Expedição, Expedido, Cancelado |
| Responsável | Select/Texto | — |
| Data | Data | — |
| Observações | Texto longo | — |

**Regra de negócio:**
- Ao confirmar a Expedição como "Expedido", o sistema deve baixar o estoque do produto (saída de estoque).

---

### 4.6 Entrega

Registro do rastreamento e confirmação de entrega ao cliente.

| Campo | Tipo | Regras |
|-------|------|--------|
| Número da Entrega | Texto | **Obrigatório** (gerado automaticamente, formato `ENT00001`) |
| Expedição | Select | Expedição vinculada |
| Transportadora | Select | **Obrigatório**. Transportadoras ativas |
| Cliente | Select | **Obrigatório**. Clientes ativos |
| Código de Rastreio | Texto | Código fornecido pela transportadora |
| Status | Select | Em Trânsito, Entregue, Tentativa de Entrega, Devolvido, Extraviado |
| Data | Data | Data de envio |
| Data de Entrega | Data | Data efetiva de entrega (preenchida ao confirmar entrega) |
| Responsável | Select/Texto | — |
| Observações | Texto longo | — |

---

## Módulo 5 — CONFIGURAÇÕES

### 5.1 Usuários

Gerenciamento de usuários e permissões de acesso ao sistema.

| Campo | Tipo | Regras |
|-------|------|--------|
| Nome Completo | Texto | Definido no momento do convite; não editável após criação |
| E-mail | E-mail | Definido no convite; usado como login; não editável |
| Cargo | Texto | Cargo na empresa |
| Telefone | Texto | Máscara de telefone |
| Perfil | Select | **Obrigatório**: Administrador ou Usuário |
| Status | Toggle | Ativo / Inativo |
| Permissões de Acesso | Checkboxes | Visão Geral, Cadastros, Compras, Estoque, Vendas e Logística |

**Regras de negócio:**
- **Administrador**: acesso total a todos os módulos e às Configurações. Pode gerenciar usuários.
- **Usuário**: acesso restrito apenas aos módulos com permissão marcada. Não acessa Configurações.
- Usuário inativo não consegue fazer login.
- O convite é enviado por e-mail. O usuário define sua senha no primeiro acesso.
- Deve haver ao menos **um Administrador ativo** no sistema em todo momento.

---

## Visão Geral (Dashboard)

A tela inicial do sistema deve exibir um painel resumido com:

- Total de Clientes ativos
- Total de Fornecedores ativos
- Total de Produtos com estoque crítico (Estoque Atual < Estoque Mínimo)
- Pedidos de Compra em aberto
- Pedidos de Venda em aberto
- Últimas movimentações de estoque (5 registros mais recentes)
- Indicadores rápidos: faturamento do mês, compras do mês (se disponível)

---

## Regras Gerais de Interface

### Listagens (tabelas)
- Toda listagem deve ter: busca por texto, filtro por status, ordenação por coluna, paginação.
- Ações por registro: **Editar**, **Visualizar**, **Excluir** (quando aplicável) e ações especiais (ex: "Salvar como PDF" no Pedido de Compras).
- Confirmação antes de excluir: modal "Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita."

### Formulários
- Validação em tempo real dos campos obrigatórios.
- Ao selecionar um registro vinculado (ex: selecionar Produto em Solicitação), preencher automaticamente campos derivados (Unidade, Preço, etc.).
- Botões: **Salvar**, **Cancelar** (volta à listagem sem salvar).
- Mensagem de sucesso/erro após salvar.

### Numeração Automática
Todos os números sequenciais devem usar padding fixo de 5 dígitos:
- Produto: `P00001`
- Solicitação de Compras: `SC00001`
- Pedido de Compras: `PC00001`
- Recebimento: `RC00001`
- Movimentação: `MV00001`
- Inventário: `INV00001`
- Pedido de Venda: `PV00001`
- Romaneio: `ROM00001`
- Separação: `SEP00001`
- Expedição: `EXP00001`
- Entrega: `ENT00001`

### Responsividade
- O sistema deve ser responsivo (funcionar em desktop, tablet e mobile).
- Menu lateral recolhível em telas menores.

### Autenticação
- Login por e-mail + senha.
- Sessão autenticada com token JWT ou similar.
- Logout disponível em todas as telas.
- Redirecionamento para login ao tentar acessar rota protegida sem autenticação.

---

## Tecnologias Recomendadas

> Estas são sugestões — adaptar conforme decisão do time.

- **Frontend**: React + TypeScript + Tailwind CSS (ou similar)
- **Backend**: Node.js + Express (ou Next.js full-stack)
- **Banco de dados**: PostgreSQL (Supabase) ou MySQL
- **Autenticação**: Supabase Auth ou JWT próprio
- **PDF**: `jsPDF`, `pdfmake` ou geração server-side
- **API de CEP**: ViaCEP (`https://viacep.com.br/ws/{cep}/json/`)

---

## Ordem de Implementação Sugerida

1. Autenticação (login, sessão, perfis)
2. Módulo Configurações → Usuários
3. Módulo Cadastros → Clientes, Fornecedores, Produtos, Transportadoras
4. Dashboard (Visão Geral)
5. Módulo Compras (fluxo completo)
6. Módulo Estoque (controle e movimentações)
7. Módulo Vendas e Logística (fluxo completo)
8. Geração de PDF (Pedido de Compras)
9. Testes de integração entre módulos

---

*Documento baseado no relatório "Campos Disponíveis por Módulo" gerado em 05/08/2026.*
