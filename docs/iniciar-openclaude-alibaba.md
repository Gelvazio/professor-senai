# Inicializador OpenClaude com Alibaba Qwen

**Objetivo:** Disponibilizar um arquivo BAT para iniciar o OpenClaude usando a API compatível com OpenAI da Alibaba Cloud.

## 1. Validar os requisitos

**Status:** ✅ Concluído

- Confirmar que o comando `openclaude` está disponível.
- Confirmar que `DASHSCOPE_API_KEY` está configurada.
- Solicitar o `WorkspaceId` quando `DASHSCOPE_WORKSPACE_ID` não existir.

## 2. Configurar a sessão

**Status:** ✅ Concluído

- Usar a chave apenas em memória por meio de `OPENAI_API_KEY`.
- Configurar o endpoint regional de Singapura.
- Selecionar o modelo `qwen3.8-max`.

## 3. Iniciar o agente

**Status:** ✅ Concluído

- Executar o OpenClaude e encaminhar argumentos adicionais recebidos pelo BAT.
- Informar falhas de inicialização sem exibir a chave.

## Verificação permitida

Revisão estática do arquivo BAT, sem executar o agente ou chamadas ao modelo.
