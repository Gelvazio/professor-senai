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

### 📦 Containers de UCs (Exceção à REGRA 01)

Algumas pastas são **containers** que contêm múltiplas UCs dentro delas:
- `FICHA-PRODUTO-MAIS-TECH` — Container de UCs de produtos MAIS TECH

Para containers:
- ❌ A pasta em si NÃO é uma UC
- ✅ Suas **SUBPASTAS** são tratadas como UCs individuais
- ✅ Aplicar REGRA 02 a cada subpasta do container

## 🔴 REGRA 02 — Estrutura Obrigatória de Unidades Curriculares

⚠️ **CRÍTICO** — Toda UC deve conter:

### 📁 Pastas Obrigatórias
- `AULAS/` — Pasta contendo as aulas da UC
- `AVALIACOES/` ou `AVALIACOES_CRIADAS/` — Pasta contendo as avaliações

### 📄 Arquivos Obrigatórios com Nomenclatura Específica

⚠️ **CRÍTICO**: Arquivo EMENTA e APOSTILA DEVEM ter nomes descritivos (não podem ser genéricos)

#### EMENTA_<NOME_DA_UC>.md
- ✅ Deve começar com `EMENTA_` ou `EMENTA-` ou `EMENTA `
- ✅ Deve ter nome descritivo após o prefixo
- ✅ Extensão: `.md` ou `.txt`

Exemplos **VÁLIDOS**:
- `EMENTA_TECNOLOGIA.md`
- `EMENTA_INTRODUCAO_COMUNICACAO.md`
- `EMENTA_REFORCO_MATEMATICA.md`
- `EMENTA-ELETRICIDADE-CIRCUITOS.txt`

Exemplos **INVÁLIDOS**:
- ❌ `EMENTA.md` (sem nome descritivo)
- ❌ `ementa_UC1.md` (muito genérico)

#### APOSTILA_<NOME_DA_UC>.md
- ✅ Deve começar com `APOSTILA_` ou `APOSTILA-` ou `APOSTILA `
- ✅ Deve ter nome descritivo após o prefixo
- ✅ Extensão: `.md`, `.txt`, ou `.docx`

Exemplos **VÁLIDOS**:
- `APOSTILA_PYTHON_BASICO.md`
- `APOSTILA_FUNDAMENTOS_TECNOLOGIA.md`
- `APOSTILA_REFORCO_MATEMATICA_RACIOCINIO_LOGICO.md`
- `APOSTILA-OFICINAS-ROBOTICA.md`
- `APOSTILA_COMPLETA_EMPREENDEDORISMO.docx`

Exemplos **INVÁLIDOS**:
- ❌ `APOSTILA.md` (sem nome descritivo)
- ❌ `apostila_v1.md` (muito genérico)

#### PLANO_ENSINO.md
- ✅ Nome exato: `PLANO_ENSINO.md` (sem variações)
- ✅ Extensão: `.md` ou `.txt`

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

## 🔴 REGRA 03 — Script de Geração de Slides

⚠️ **CRÍTICO** — Toda UC deve conter:

### 📝 Arquivo Obrigatório
- `gerar_slides.js` — Script Node.js que gera apresentações PPTX automaticamente

#### Características
- ✅ Usa biblioteca `PptxGenJS` para gerar PowerPoint
- ✅ Define paleta de cores da UC (BORDO, AMBAR, FUNDO, CINZA, etc.)
- ✅ Implementa funções padrão:
  - `titleSlide(title, subtitle)` — Slide de capa com rodapé
  - `sectionSlide(title)` — Slide de seção
  - `contentSlide(title, bullets)` — Slide de conteúdo com bullets
  - `twoColSlide(title, col1title, col1bullets, col2title, col2bullets)` — Slide com duas colunas
  - `addFooter(slide)` — Adiciona rodapé padrão "Rio do Sul Mais Tech · SENAI"
- ✅ Exporta arquivo `.pptx` ao final
- ✅ Inclui `.gitignore` na pasta UC

#### Exemplo Mínimo
```javascript
const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';

// Definir cores da UC
const BORDO = '#004384';
const AMBAR = '#FFB300';
const FUNDO = '#F5F5F5';
const FOOTER_TEXT = 'Rio do Sul Mais Tech · SENAI';

function titleSlide(title) {
  const s = pptx.addSlide();
  s.background = { color: BORDO };
  s.addText(title, {
    x: 0.8, y: 2, w: 8.4, h: 2,
    fontSize: 36, bold: true, color: '#FFFFFF', align: 'center'
  });
  return s;
}

// Adicionar slides...
pptx.save({ path: './SLIDES_UC.pptx' });
```

#### Prioridade
- 🟡 **MEDIA** — Complementar (pode ser gerado automaticamente)

#### Dependência
- `npm install pptxgenjs` deve ser executado na pasta UC antes de rodar o script

## 🔴 REGRA 04 — Pasta de Atividades e Exercícios

⚠️ **CRÍTICO** — Toda UC deve conter:

### 📁 Pasta Obrigatória
- `ATIVIDADES/` — Pasta contendo as atividades sugeridas para a UC

### 📐 Cálculo de Atividades

**Fórmula**: Para cada **2 horas de aula** = **1 atividade** (15 minutos)

Exemplos:
- 20 horas de aula → 10 atividades
- 40 horas de aula → 20 atividades
- 60 horas de aula → 30 atividades

O número de horas deve ser obtido do `PLANO_ENSINO.md` ou `EMENTA_*.md` da UC.

### 📝 Arquivos de Atividades

Dentro de `ATIVIDADES/`:

#### Arquivo Gerador (obrigatório)
- `GERAR_ATIVIDADES.js` — Script Node.js que gera as atividades
  - ✅ Lê a EMENTA da matéria
  - ✅ Gera atividades baseadas no conteúdo da ementa
  - ✅ Cria versões online (Google Forms links) e versões impressas (PDF)
  - ✅ Exporta arquivos de atividade

#### Arquivos de Atividade (quantidade calculada)
- `ATIVIDADE_01.md` — Descrição/conteúdo da atividade 1
- `ATIVIDADE_02.md` — Descrição/conteúdo da atividade 2
- ... até `ATIVIDADE_NN.md`

Nomenclatura: **ATIVIDADE_NN.md** onde NN = número zero-preenchido (01, 02, ..., 30)

#### Versões Impressas (PDF)
- `ATIVIDADE_01_VERSAO_IMPRESSA.pdf` — PDF pronto para imprimir
- `ATIVIDADE_02_VERSAO_IMPRESSA.pdf` — PDF pronto para imprimir
- ... até `ATIVIDADE_NN_VERSAO_IMPRESSA.pdf`

**Conteúdo**: Cada PDF deve conter o conteúdo completo da atividade, pronto para impressão.

### 🌐 Formato Online
- **Plataforma**: Google Forms (link externo)
- **Funcionalidade**: Mostrar nota ao final da atividade ao aluno
- **Link**: Pode ser armazenado no arquivo ATIVIDADE_NN.md ou em arquivo separado

### ✅ Checklist de Conformidade
1. ✅ Pasta `ATIVIDADES/` existe
2. ✅ Arquivo `GERAR_ATIVIDADES.js` existe
3. ✅ Número de arquivos `ATIVIDADE_NN.md` ≥ (horas_aula / 2)
4. ✅ Para cada `ATIVIDADE_NN.md`, existe correspondente `ATIVIDADE_NN_VERSAO_IMPRESSA.pdf`
5. ✅ Nomes seguem padrão exato (ATIVIDADE_01, ATIVIDADE_02, etc)

### 🔴 Prioridade
- **MEDIA** — Complementar (pode ser gerado automaticamente)

## 🔴 REGRA 05 — Pasta de Substituições

⚠️ **CRÍTICO** — Toda UC deve conter:

### 📁 Pasta Obrigatória
- `SUBSTITUICOES/` — Pasta contendo instruções e materiais para aulas de substituição

### 📄 Arquivo Obrigatório
- `SUBSTITUICOES/CLAUDE.md` — Documentação sobre como montar aulas de substituição

#### Conteúdo do Arquivo CLAUDE.md

O arquivo deve descrever o processo de:

1. **Acessar o SGN (Sistema de Gestão de Notação)**
   - URL: https://sgn.sesisenai.org.br/pages/diarioClasse/diario-classe.html?idDiario=XXXXX
   - Cada matéria tem um `idDiario` único
   - Exemplo: `idDiario=509634` para uma UC específica

2. **Coletar Aulas Já Lecionadas**
   - Ir em **Aulas/Avaliações** dentro do diário
   - Salvar a lista de aulas já lecionadas
   - Avaliar quais aulas foram completadas

3. **Preparar Aulas de Substituição**
   - Selecionar aulas não lecionadas
   - Montar sequência para substituição
   - Documentar duração e conteúdo

#### Exemplo de Estrutura

```markdown
# Substituições — [NOME DA UC]

## 🔗 Acesso ao Diário de Classe

1. Acesse o link do diário de classe:
   https://sgn.sesisenai.org.br/pages/diarioClasse/diario-classe.html?idDiario=509634

2. Navegue até a seção **Aulas/Avaliações**

3. Copie a lista de aulas já lecionadas

## 📋 Aulas Disponíveis para Substituição

[Lista de aulas NÃO lecionadas]

## ⏱️ Cronograma Recomendado

[Sugestões de sequência e duração]
```

### ✅ Checklist de Conformidade
1. ✅ Pasta `SUBSTITUICOES/` existe
2. ✅ Arquivo `SUBSTITUICOES/CLAUDE.md` existe
3. ✅ Arquivo contém referência ao SGN
4. ✅ Arquivo contém instruções sobre Aulas/Avaliações
5. ✅ Arquivo contém processo de seleção de aulas

### 🔴 Prioridade
- **BAIXA** — Complementar (informativo)

## 🔴 REGRA 06 — Arquivo CLAUDE.md em Cada UC

⚠️ **CRÍTICO** — Toda UC deve conter:

### 📄 Arquivo Obrigatório
- `CLAUDE.md` — Documentação explicativa sobre os conteúdos e estrutura da UC

#### Conteúdo Esperado

O arquivo deve descrever:

1. **Visão Geral da UC**
   - Nome completo da unidade curricular
   - Objetivo geral
   - Público-alvo

2. **Estrutura de Pastas**
   - Descrição de cada pasta (AULAS/, AVALIACOES/, ATIVIDADES/, SUBSTITUICOES/, etc)
   - Conteúdo esperado em cada uma

3. **Como Usar os Materiais**
   - Pré-requisitos de conhecimento
   - Sequência recomendada de conteúdo
   - Ligações entre tópicos

4. **Geração de Slides**
   - Como executar `gerar_slides.js`
   - Dependências necessárias
   - Como personalizar cores e conteúdo

5. **Dados do SGN**
   - Links para acessar o diário de classe
   - Como sincronizar informações com o SGN
   - Estrutura de dados esperada

#### Exemplo de Estrutura

```markdown
# UC: [NOME DA UNIDADE CURRICULAR]

## 📋 Objetivo Geral
[Breve descrição do objetivo]

## 📁 Estrutura de Pastas

### /AULAS
Contém aulas numeradas e organizadas. Cada aula é uma pasta com:
- Slides HTML
- Material de apoio
- Atividades práticas

### /AVALIACOES
[Descrição]

### /ATIVIDADES
[Descrição]

... (outras pastas)

## 🚀 Como Usar Esta UC

1. **Preparação**: [Passos]
2. **Execução**: [Passos]
3. **Avaliação**: [Passos]

## 🔗 Links Úteis

- Diário de Classe: [URL SGN]
- Ementa: EMENTA_*.md
- Plano de Ensino: PLANO_ENSINO.md

## ⚙️ Geração de Slides

```bash
npm install pptxgenjs
node gerar_slides.js
```

```

#### Checklist de Conformidade
1. ✅ Arquivo `CLAUDE.md` existe na raiz da UC
2. ✅ Arquivo descreve objetivo e público-alvo
3. ✅ Arquivo documenta estrutura de pastas
4. ✅ Arquivo explica como usar os materiais
5. ✅ Arquivo inclui informações sobre geração de slides
6. ✅ Arquivo contém referências úteis

### 🔴 Prioridade
- **MEDIA** — Informativo (melhora significativamente a usabilidade)

---

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
