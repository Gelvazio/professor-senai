@echo off
setlocal EnableExtensions EnableDelayedExpansion

title Gemini CLI - Agente de IA

where gemini >nul 2>&1
if errorlevel 1 (
  echo ERRO: Gemini CLI nao foi encontrado no PATH.
  echo Instale com: npm install --global @google/gemini-cli@latest
  pause
  exit /b 1
)

if "!GEMINI_API_KEY!"=="" (
  echo ERRO: A variavel GEMINI_API_KEY nao esta configurada.
  echo Crie uma chave no Google AI Studio e configure essa variavel de ambiente.
  pause
  exit /b 1
)

set "GOOGLE_API_KEY="
set "GOOGLE_GENAI_USE_VERTEXAI=false"

pushd "%~dp0"
echo Iniciando o Gemini CLI com Google AI Studio...
gemini --approval-mode default %*
set "GEMINI_EXIT_CODE=!ERRORLEVEL!"
popd

if not "!GEMINI_EXIT_CODE!"=="0" (
  echo.
  echo Gemini CLI terminou com o codigo !GEMINI_EXIT_CODE!.
  pause
)

exit /b !GEMINI_EXIT_CODE!
