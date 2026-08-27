# Configurar OpenClaude com Alibaba Cloud

**Objetivo:** Instalar o OpenClaude e prepará-lo para usar o modelo Alibaba por uma API compatível com OpenAI.

## 1. Instalar o OpenClaude

**Status:** ✅ Concluído

- Instalar globalmente o pacote oficial `@gitlawb/openclaude`.
- Não utilizar o pacote reservado `openclaude`.

## 2. Configurar autenticação e modelo

**Status:** ✅ Concluído

- Reutilizar a chave persistente `DASHSCOPE_API_KEY` como `OPENAI_API_KEY`.
- Ativar o provedor compatível com OpenAI.
- Selecionar o modelo `qwen3.8-max`.
- Não armazenar a chave em arquivos versionados.

## 3. Configurar endpoint do workspace

**Status:** ⬜ Pendente

- Obter o ID do workspace Alibaba Cloud.
- Formar o endpoint regional compatível com OpenAI e salvá-lo em `OPENAI_BASE_URL`.

## Verificação permitida

Conferência da instalação e das variáveis sem executar chamadas ao modelo.
