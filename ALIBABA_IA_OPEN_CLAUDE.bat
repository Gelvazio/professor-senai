@echo off
setlocal EnableExtensions EnableDelayedExpansion

title Alibaba Qwen - OpenClaude

where openclaude >nul 2>&1
if errorlevel 1 (
  echo ERRO: OpenClaude nao foi encontrado no PATH.
  echo Instale com: npm install --global @gitlawb/openclaude@latest
  pause
  exit /b 1
)

if "!DASHSCOPE_API_KEY!"=="" (
  echo ERRO: A variavel DASHSCOPE_API_KEY nao esta configurada.
  echo Configure a chave e abra um novo terminal antes de tentar novamente.
  pause
  exit /b 1
)

if "!DASHSCOPE_WORKSPACE_ID!"=="" set /p "DASHSCOPE_WORKSPACE_ID=Informe o WorkspaceId da Alibaba Cloud: "
if "!DASHSCOPE_WORKSPACE_ID!"=="" (
  echo ERRO: O WorkspaceId e obrigatorio.
  pause
  exit /b 1
)

set "CLAUDE_CODE_USE_OPENAI=1"
set "OPENAI_API_KEY=!DASHSCOPE_API_KEY!"
set "OPENAI_MODEL=qwen3.8-max"
set "OPENAI_BASE_URL=https://!DASHSCOPE_WORKSPACE_ID!.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1"

echo Iniciando OpenClaude com Alibaba Qwen...
openclaude %*
set "OPENCLAUDE_EXIT_CODE=!ERRORLEVEL!"

if not "!OPENCLAUDE_EXIT_CODE!"=="0" (
  echo.
  echo OpenClaude terminou com o codigo !OPENCLAUDE_EXIT_CODE!.
  pause
)

exit /b !OPENCLAUDE_EXIT_CODE!
