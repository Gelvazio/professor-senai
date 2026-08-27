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

if "!GEMINI_API_KEY!"=="" if "!GOOGLE_API_KEY!"=="" (
  echo Nenhuma chave Gemini foi encontrada nas variaveis de ambiente.
  echo O Gemini CLI usara o login da conta Google salvo ou solicitara autenticacao.
  echo.
)

pushd "%~dp0"
echo Iniciando o Gemini CLI como agente de IA...
gemini --approval-mode default %*
set "GEMINI_EXIT_CODE=!ERRORLEVEL!"
popd

if not "!GEMINI_EXIT_CODE!"=="0" (
  echo.
  echo Gemini CLI terminou com o codigo !GEMINI_EXIT_CODE!.
  pause
)

exit /b !GEMINI_EXIT_CODE!
