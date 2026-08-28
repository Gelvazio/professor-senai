@echo off
REM Transcrever vídeos do YouTube
REM Uso: transcrever.bat "https://www.youtube.com/watch?v=..."

setlocal enabledelayedexpansion

if "%~1"=="" (
    echo.
    echo ❌ URL do YouTube não fornecida!
    echo.
    echo Uso: transcrever.bat "URL" [--engine google^|whisper] [--language pt-BR]
    echo.
    echo Exemplos:
    echo   transcrever.bat "https://www.youtube.com/watch?v=..."
    echo   transcrever.bat "https://www.youtube.com/watch?v=..." --engine whisper
    echo.
    pause
    exit /b 1
)

echo.
echo 🎬 Transcritor de Vídeos do YouTube
echo ===================================
echo.

REM Verificar se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python não encontrado!
    echo Instale Python de: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Verificar se as dependências estão instaladas
python -m pip show yt-dlp >nul 2>&1
if errorlevel 1 (
    echo 📦 Instalando dependências...
    python -m pip install -r requirements.txt
    if errorlevel 1 (
        echo ❌ Erro ao instalar dependências!
        pause
        exit /b 1
    )
)

REM Executar o script Python
python transcrever.py %*

endlocal
pause
