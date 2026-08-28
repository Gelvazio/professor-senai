# SYNCDATA — Regras do Projeto

## 📋 Propósito
O projeto `syncdata` é um sincronizador Node.js que:
1. Lê as pastas de aulas, materiais e avaliações
2. Escaneia arquivos e estrutura de diretórios
3. Identifica pendências automáticamente
4. Sincroniza dados com o arquivo `../pendencias.js`

## 🏗️ Estrutura do Projeto

```
syncdata/
├── package.json              # Dependências e scripts
├── index.js                  # Entrada principal
├── CLAUDE.md                 # Este arquivo
├── src/
│   ├── scan-aulas.js         # Scanner de aulas
│   ├── generate-pendencias.js # Gerador de pendências
│   ├── utils.js              # Funções utilitárias
│   └── constants.js          # Constantes do projeto
├── data/                     # Dados processados (local)
└── logs/                     # Logs de execução
```

## 📝 Convenções de Código

### Nomeação
- Arquivos e pastas: `kebab-case` (ex: `scan-aulas.js`)
- Variáveis/funções: `camelCase` (ex: `scanearAulas()`)
- Constantes: `UPPER_SNAKE_CASE` (ex: `SISTEMA_DIR`)

### Estrutura de Funções

Toda função assíncrona deve:
1. Verificar entradas
2. Log inicial (console.log com emoji)
3. Processar dados
4. Retornar resultado estruturado
5. Tratamento de erros com try/catch

```javascript
async function minhafuncao(parametro) {
  console.log('🔍 Processando...');
  
  try {
    // lógica aqui
    return { sucesso: true, dados: resultado };
  } catch (erro) {
    console.error('❌ Erro:', erro.message);
    throw erro;
  }
}
```

### Emojis Padrão
- 🔍 Buscando/escaneando
- 📝 Lendo arquivo
- 💾 Salvando
- ✅ Sucesso
- ❌ Erro
- ⚠️ Aviso
- 📊 Relatório
- 🔄 Sincronizando

## 🔴 REGRA 01 — Pastas Permitidas

⚠️ **CRÍTICO**
Ler **TODAS** as pastas dentro de `C:\fontes\professor-senai\sistema`
com **EXCEÇÃO** para:
- `PROFESSOR` — Pasta exclusiva do professor (não é UC)
- `.claude` — Configurações Claude Code
- `graphify-out` — Output do graphify
- `scripts` — Scripts auxiliares

Qualquer outra pasta em `sistema/` é considerada uma **Unidade Curricular (UC)** válida.

## 🔴 REGRA 02 — Estrutura Obrigatória de Unidades Curriculares

⚠️ **CRÍTICO** — Toda UC deve conter:

### 📁 Pastas Obrigatórias
- `AULAS/` — Pasta contendo as aulas da UC
- `AVALIACOES/` ou `AVALIACOES_CRIADAS/` — Pasta contendo as avaliações

### 📄 Arquivos Obrigatórios
- `EMENTA_*.md` — Ementa da UC (aceita qualquer sufixo após "EMENTA_")
  - Exemplos válidos: `EMENTA_UC1.md`, `EMENTA_NOME_COMPLETO.md`, `EMENTA.md`
- `PLANO_ENSINO.md` — Plano de ensino oficial da UC
- `APOSTILA_*.md` — Material de apostila (aceita qualquer sufixo após "APOSTILA_")
  - Exemplos válidos: `APOSTILA_COMPLETA.md`, `APOSTILA_UC1.md`, `APOSTILA.md`

### ❌ Consequências de Não Conformidade
Itens faltantes geram **pendências automáticas** com prioridades:
- **ALTA**: Pastas e arquivos críticos (AULAS, AVALIACOES, EMENTA, PLANO_ENSINO)
- **MEDIA**: Arquivos complementares (APOSTILA)

### 📊 Verificação Automática
Executar `npm run verify` para verificar todas as UCs:
```bash
cd syncdata
npm run verify  # Gera relatório de estrutura
```

## 🎯 Regras Críticas

### ✅ Obrigatório
- ✅ Toda função deve ter `console.log()` com emoji para debug
- ✅ Usar `async/await` para operações I/O
- ✅ Validar entradas com verificações nulas/vazias
- ✅ Retornar objetos estruturados: `{ sucesso: boolean, dados: *, erro?: string }`
- ✅ Adicionar comentários em lógica complexa
- ✅ Usar `path.resolve()` para caminhos, nunca strings hardcoded

### ❌ Proibido
- ❌ Usar callbacks (prefer Promises/async-await)
- ❌ Operações síncronas (`fs.readFileSync`) exceto em inicialização
- ❌ Caminhos hardcoded (usar variáveis PROJETO_ROOT, SISTEMA_DIR)
- ❌ Variáveis globais desnecessárias
- ❌ `console.log()` sem contexto/emoji
- ❌ Modificar arquivos sem backup

## 📂 Padrão de Leitura de Arquivos

```javascript
const fs = require('fs').promises;
const path = require('path');

async function lerArquivos(diretorio) {
  console.log(`📝 Lendo ${diretorio}...`);
  
  try {
    const arquivos = await fs.readdir(diretorio, { withFileTypes: true });
    const resultados = [];
    
    for (const arquivo of arquivos) {
      const caminhoCompleto = path.join(diretorio, arquivo.name);
      
      if (arquivo.isDirectory()) {
        // Processar pasta recursivamente
        const subResultados = await lerArquivos(caminhoCompleto);
        resultados.push(...subResultados);
      } else if (arquivo.name.endsWith('.html') || arquivo.name.endsWith('.md')) {
        // Processar arquivo
        const conteudo = await fs.readFile(caminhoCompleto, 'utf-8');
        resultados.push({ caminho: caminhoCompleto, conteudo });
      }
    }
    
    return resultados;
  } catch (erro) {
    console.error(`❌ Erro ao ler ${diretorio}:`, erro.message);
    throw erro;
  }
}
```

## 🔄 Integração com pendencias.js

As pendências geradas devem seguir o formato:

```javascript
{
  id: number,
  titulo: string,
  unidade_curricular: string,
  tipo: 'AULA' | 'MATERIAL' | 'ATIVIDADE' | 'AVALIAÇÃO' | 'OUTRO',
  status: 'PENDENTE' | 'EM_PROGRESSO' | 'BLOQUEADA' | 'CONCLUIDA',
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA',
  data_criacao: string (YYYY-MM-DD),
  data_vencimento?: string (YYYY-MM-DD),
  responsavel?: string,
  observacoes?: string,
  tags?: string[]
}
```

## 📊 Tipos de Aula Reconhecidas

A scanear deve procurar por:
- Pastas com padrão `AULA-NN-DD-MM-YYYY-*`
- Pastas com padrão `AULA-NN-*`
- Arquivos `SLIDE_*.html`
- Arquivos `*AULA*.html`
- Pastas `AULAS/`

## 🚀 Scripts Disponíveis

```bash
npm start          # Sincronização completa
npm run scan       # Escanear aulas apenas
npm run pendencias # Relatório de pendências
npm run dev        # Modo watch (desenvolvimento)
```

## 📝 Exemplos de Uso

### Importar em outro arquivo
```javascript
const { PROJETO_ROOT, SISTEMA_DIR } = require('./index');
const { scanearAulas } = require('./src/scan-aulas');

async function meu_script() {
  const aulas = await scanearAulas(SISTEMA_DIR);
  console.log(aulas);
}
```

### Executar como CLI
```bash
cd sistema/syncdata
npm start
```

## ⚠️ Notas Importantes

1. **Não modificar diretamente**: O syncdata LÊ os dados, não deve modificar arquivos HTML ou estrutura de pastas
2. **Cache opcional**: Pode usar arquivo `data/cache.json` para evitar re-scanear tudo
3. **Logs**: Todos os erros devem ir para `logs/syncdata.log`
4. **Performance**: Para >1000 aulas, considerar processamento em chunks
5. **Supabase opcional**: Se implementar integração, usar variáveis de ambiente

## 🔐 Segurança

- Nunca commit com credenciais (usar `.env`)
- Validar caminhos com `path.resolve()` para evitar path traversal
- Não confiar em nomes de arquivos do usuário
- Sanitizar logs antes de exibir

## 📚 Recursos Externos

- Node.js fs API: https://nodejs.org/api/fs.html
- Path module: https://nodejs.org/api/path.html
- Async/await: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function

---

**Último update:** 28-08-2026  
**Versão:** 1.0.0
