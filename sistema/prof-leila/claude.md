# Orientações para Geração de Infográficos — Prof. Leila

## Referência visual
Arquivo base: `INFOGRAFICO-PROF-LEILA.png`

---

## Formato e dimensões

- **Formato**: Imagem PNG, orientação **retrato (portrait)**
- **Proporção**: aproximadamente 800 × 2200 px (largura × altura) — proporção ~1:2,75
- **Fundo geral**: branco `#FFFFFF` com seções coloridas por bloco

---

## Estrutura do layout (zonas)

### 1. Cabeçalho (Header)
- Fundo **azul-marinho escuro** (`#1B2B52` ou similar)
- Título principal em branco, caixa alta, fonte **bold**, grande (ex: 36–42px)
- Subtítulo em **dourado/amarelo** (`#F0B942`), menor, itálico ou regular
- Ilustração no canto esquerdo: personagem apresentador (homem com laptop/quadro)
- Ilustração no canto direito: plateia (silhuetas de pessoas + gráfico de pizza)
- Ocupa ~12% da altura total da imagem

### 2. Faixa de cards superiores (3 colunas)
- Três cards lado a lado, cada um com cor de fundo distinta
- **Card 1 — Objetivo**: fundo verde-escuro (`#2D6A4F` ou similar)
- **Card 2 — Público**: fundo azul-médio (`#1A5C8A`)
- **Card 3 — Estrutura Básica**: fundo laranja/âmbar (`#C8861A`)
- Número do tópico em círculo colorido no canto superior esquerdo de cada card
- Título do card em branco, bold
- Conteúdo com texto claro, ícones e exemplos bom/ruim (✓ / ✗)
- Ocupa ~28% da altura total

### 3. Grade média (4 colunas — Tips 4 a 7)
- Quatro cards menores em linha
- Cores de fundo distintas por card:
  - 4: verde (`#3A7D44`)
  - 5: laranja escuro (`#C85A1A`)
  - 6: cinza-roxo (`#5C5B8A`)
  - 7: amarelo-mostarda (`#B8A020`)
- Cada card tem: número em círculo, título branco, ícones, texto explicativo
- Ocupa ~25% da altura total

### 4. Grade inferior (4 colunas — Tips 8 a 11)
- Quatro cards menores em linha, cores alternadas
- Ocupa ~20% da altura total

### 5. Rodapé (4 colunas estreitas — Tips 12, 13, 14 + Regra de Ouro)
- Cards mais estreitos e baixos
- **Regra de Ouro**: fundo azul-marinho escuro, ícone de troféu dourado, texto em destaque
- Ocupa ~15% da altura total

---

## Paleta de cores

| Elemento | Cor | Hex |
|---|---|---|
| Header / Regra de Ouro | Azul-marinho | `#1B2B52` |
| Subtítulo header | Dourado | `#F0B942` |
| Card Objetivo | Verde escuro | `#2D6A4F` |
| Card Público | Azul médio | `#1A5C8A` |
| Card Estrutura | Laranja âmbar | `#C8861A` |
| Tip 4 | Verde | `#3A7D44` |
| Tip 5 | Laranja-escuro | `#C85A1A` |
| Tip 6 | Cinza-roxo | `#5C5B8A` |
| Tip 7 | Mostarda | `#B8A020` |
| Exemplo bom (✓) | Verde claro | `#28A745` |
| Exemplo ruim (✗) | Vermelho | `#DC3545` |
| Fundo geral | Branco | `#FFFFFF` |
| Texto principal | Preto/dark | `#1A1A2E` |

---

## Tipografia

- **Título do header**: Sans-serif bold, caixa alta, ~38px, branco
- **Subtítulo header**: Sans-serif regular/italic, ~16px, dourado
- **Títulos de cards**: Sans-serif bold, caixa alta ou small caps, branco, ~14–16px
- **Texto de corpo**: Sans-serif regular, ~11–13px, branco ou cinza-escuro conforme fundo
- **Números dos tópicos**: Bold, em círculo colorido, ~18px

---

## Elementos visuais obrigatórios

1. **Números em círculo**: cada tópico tem um número (1–14) em círculo sólido no canto do card
2. **Ícones**: cada seção tem pelo menos um ícone representativo (alvo, pessoa, seta, troféu, relógio, etc.)
3. **Exemplos bom/ruim**: tópicos 1, 7 e 8 mostram contraste ✗ (ruim) vs ✓ (bom) em fundo colorido
4. **Fluxos com setas**: tópico 5 (Problema → Causa → Consequência → Solução) usa setas verticais
5. **Ilustrações de pessoas**: header tem ilustrações de personagens estilo flat/cartoon
6. **Troféu dourado**: Regra de Ouro tem ícone de troféu
7. **Checklist**: tópico 14 usa ícones de checkbox marcado (✓)

---

## Geração como imagem

Para gerar o infográfico como arquivo PNG:

### Opção 1 — Python + Pillow/ReportLab
- Usar `Pillow` para montar cada seção como bloco de imagem
- Compor todas as seções verticalmente com `Image.paste()`
- Salvar como PNG com `image.save("infografico.png")`

### Opção 2 — HTML → Screenshot (recomendado)
1. Criar o HTML do infográfico com todas as seções
2. Iniciar servidor HTTP local: `python -m http.server 8781`
3. Abrir no navegador via `mcp__Claude_Browser__preview_start`
4. Redimensionar para largura 900px
5. Usar `mcp__Claude_Browser__javascript_tool` para obter a altura total da página
6. Capturar screenshot de página inteira
7. Salvar o PNG resultante no diretório do projeto

### Opção 3 — Python + playwright (headless)
```bash
C:\Python314\python.exe -m pip install playwright
C:\Python314\python.exe -m playwright install chromium
```
```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 900, "height": 800})
    page.goto("http://localhost:8781/infografico.html")
    page.screenshot(path="infografico.png", full_page=True)
    browser.close()
```

---

## Arquivo de saída

- **Nome**: `INFOGRAFICO-<TEMA>.png`
- **Local**: dentro da pasta da UC correspondente ou na raiz de `sistema/prof-leila/`
- **Resolução mínima**: 800 × 2000 px

---

## Observações importantes

- O infográfico deve ser **autocontido**: todo o conteúdo do `prompt.md` precisa estar representado
- Manter a hierarquia visual: header grande → cards médios → cards pequenos → rodapé
- Cada tópico do prompt deve ter seu próprio card numerado
- Usar cores diferentes por seção para facilitar a leitura rápida
- O estilo é **flat design** com ilustrações simples, sem sombras pesadas
- A "Regra de Ouro" sempre fecha o infográfico no canto inferior direito com destaque especial
