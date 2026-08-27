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

echo Iniciando OpenClaude com Alibaba Qwen...
openclaude --provider dashscope-intl --model qwen3.6-plus %*
set "OPENCLAUDE_EXIT_CODE=!ERRORLEVEL!"

if not "!OPENCLAUDE_EXIT_CODE!"=="0" (
  echo.
  echo OpenClaude terminou com o codigo !OPENCLAUDE_EXIT_CODE!.
  pause
)

exit /b !OPENCLAUDE_EXIT_CODE!
