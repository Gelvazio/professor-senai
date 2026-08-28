# SYNCDATA — Sincronizador de Aulas e Pendências

Projeto Node.js que sincroniza aulas, materiais e pendências do sistema SENAI.

## 🚀 Instalação

```bash
cd sistema/syncdata
npm install
```

## 📖 Como Usar

### 1. **Linha de Comando (CLI)**

```bash
# Sincronização completa
npm start

# Apenas escanear aulas
npm run scan

# Relatório de pendências
npm run pendencias

# Modo desenvolvimento (watch)
npm run dev
```

### 2. **Servidor Express (API REST)**

```bash
# Iniciar servidor na porta 3333
node server.js

# Ou com porta customizada
PORT=5000 node server.js
```

Endpoints disponíveis:
- `GET /health` — Health check
- `GET /api/status` — Status do servidor
- `POST /api/sync` — Executar sincronização completa
- `GET /api/aulas` — Listar aulas cacheadas
- `GET /api/pendencias` — Listar pendências (`?status=PENDENTE`)
- `GET /api/resumo` — Resumo da sincronização

### 3. **No Dashboard SENAI**

1. Login como **professor**
2. Clique no botão **🔄 Atualizar Arquivos** no menu superior
3. Aguarde a sincronização concluir
4. Página será recarregada automaticamente

## 📁 Estrutura

```
syncdata/
├── package.json              # Dependências
├── index.js                  # CLI principal
├── server.js                 # Servidor Express
├── CLAUDE.md                 # Regras do projeto
├── README.md                 # Este arquivo
├── src/
│   ├── scan-aulas.js         # Scanner de aulas
│   ├── generate-pendencias.js # Gerador de pendências
│   ├── utils.js              # Utilitários
│   └── constants.js          # Constantes
└── data/                     # Cache de dados
    ├── aulas.json
    └── pendencias.json
```

## 🔍 Como Funciona

### Scanner de Aulas (scan-aulas.js)

1. Percorre recursivamente a pasta `sistema/`
2. Identifica pastas de aulas pelo padrão: `AULA-NN-DD-MM-YYYY-*`
3. Cataloga arquivos (slides, materiais, atividades)
4. Retorna lista estruturada de aulas

**Padrões reconhecidos:**
- `AULA-01-03-08-2026-TEMA`
- `AULA-01`
- `AULA01`

**Arquivos detectados:**
- Slides: `SLIDE_*.html`
- Atividades: arquivos com "atividade", "exercicio" ou "lista"
- Materiais: arquivos com "material", "conteudo" ou "apostila"

### Gerador de Pendências (generate-pendencias.js)

Analisa cada aula e cria pendências automáticas se:
- Sem slides (prioridade ALTA)
- Sem material complementar (prioridade MEDIA)
- Sem atividade associada (prioridade MEDIA)

Formata pendências para o arquivo `../pendencias.js`

## 🎯 Exemplos de Uso

### Exemplo 1: Sincronização via CLI

```bash
cd sistema/syncdata
npm start

# Output:
# ╔═══════════════════════════════════════════════════════════════════╗
# ║                        SYNCDATA v1.0.0                           ║
# ║   Sincronizador de Aulas e Pendências — SENAI                   ║
# ╚═══════════════════════════════════════════════════════════════════╝
# 
# 🔍 Escaneando aulas...
#    ✅ Encontradas 24 aulas
# 
# 📋 Gerando pendências...
#    ✅ Identificadas 18 pendências
```

### Exemplo 2: Servidor rodando continuamente

```bash
# Terminal 1: Iniciar servidor
node server.js

# Terminal 2: Fazer requisição
curl -X POST http://localhost:3333/api/sync

# Output:
# {"sucesso":true,"mensagem":"Sincronização concluída","dados":{"totalAulas":24,"totalPendencias":18,"timestamp":"2026-08-28T10:30:45.123Z"}}
```

### Exemplo 3: Integração com JavaScript

```javascript
// Chamar a API de sincronização
async function atualizarArquivos() {
  const response = await fetch('http://localhost:3333/api/sync', {
    method: 'POST'
  });
  
  const resultado = await response.json();
  console.log(`${resultado.dados.totalAulas} aulas, ${resultado.dados.totalPendencias} pendências`);
}
```

## 🔧 Configuração

### Variáveis de Ambiente

```bash
PORT=3333                 # Porta do servidor (padrão: 3333)
VERBOSE=true             # Logs detalhados
CACHE=true               # Ativar cache
```

## 📊 Saída de Dados

### Estrutura de Aula

```javascript
{
  numero: 1,
  nome: "AULA-01-03-08-2026",
  caminho: "/caminho/absoluto",
  data: "2026-08-03",
  unidade_curricular: "INTRODUÇÃO À TECNOLOGIA",
  arquivos: [
    { nome: "SLIDE_AULA_01.html", caminho: "..." },
    { nome: "ATIVIDADE-03-08-2026.docx", caminho: "..." }
  ],
  status: "ENCONTRADA"
}
```

### Estrutura de Pendência

```javascript
{
  id: 1001,
  titulo: "Preparar slides — AULA 1",
  unidade_curricular: "INTRODUÇÃO À TECNOLOGIA",
  tipo: "AULA",
  status: "PENDENTE",
  prioridade: "ALTA",
  data_vencimento: "2026-08-03",
  observacoes: "Aula encontrada, mas sem slides"
}
```

## 🐛 Troubleshooting

### Erro: "Express não está instalado"
```bash
npm install express cors
```

### Servidor não conecta
- Verificar se está rodando: `curl http://localhost:3333/health`
- Alterar porta: `PORT=5000 node server.js`
- Verificar firewall

### Aulas não encontradas
- Verificar padrão de pasta: deve começar com `AULA-`
- Verificar se pasta está em `sistema/`
- Rodar com `VERBOSE=true npm start`

## 📝 Logs

- CLI: Impresso no console
- Servidor: Disponível em `logs/syncdata.log` (quando implementado)
- Cache: Salvo em `data/aulas.json` e `data/pendencias.json`

## 🔐 Segurança

- ✅ Validação de caminhos com `path.resolve()`
- ✅ Sem modificação de arquivos (apenas leitura)
- ✅ Sem credenciais nas fontes
- ✅ CORS configurado

## 📄 Licença

MIT

## 👤 Autor

Desenvolvido por Gelvazio para o projeto SENAI — Rio do Sul Mais Tech

---

**Versão:** 1.0.0  
**Última atualização:** 28-08-2026
