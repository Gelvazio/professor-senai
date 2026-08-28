# Transcrever vídeos do YouTube
# Uso: .\transcrever.ps1 "https://www.youtube.com/watch?v=..."

param(
    [string]$URL,
    [string]$Engine = "google",
    [string]$Language = "pt-BR",
    [switch]$Help
)

# Função para exibir ajuda
function Show-Help {
    Write-Host "`n🎬 Transcritor de Vídeos do YouTube`n" -ForegroundColor Cyan
    Write-Host "Uso: .\transcrever.ps1 -URL <url> [opções]`n" -ForegroundColor Yellow
    Write-Host "Opções:" -ForegroundColor Cyan
    Write-Host "  -URL <url>              URL do vídeo do YouTube (obrigatório)"
    Write-Host "  -Engine <google|whisper> Motor de transcrição (padrão: google)"
    Write-Host "  -Language <idioma>      Idioma (padrão: pt-BR)"
    Write-Host "  -Help                   Exibir esta ajuda`n" -ForegroundColor Yellow
    Write-Host "Exemplos:" -ForegroundColor Cyan
    Write-Host "  .\transcrever.ps1 -URL 'https://www.youtube.com/watch?v=...'"
    Write-Host "  .\transcrever.ps1 -URL 'https://...' -Engine whisper"
    Write-Host "  .\transcrever.ps1 -URL 'https://...' -Language en-US`n"
}

# Exibir ajuda se solicitado
if ($Help -or -not $URL) {
    Show-Help
    exit 1
}

Write-Host "`n🎬 Transcritor de Vídeos do YouTube" -ForegroundColor Cyan
Write-Host "=" * 40 -ForegroundColor Cyan
Write-Host ""

# Verificar Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python encontrado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python não encontrado!" -ForegroundColor Red
    Write-Host "Instale em: https://www.python.org/downloads/" -ForegroundColor Yellow
    exit 1
}

# Verificar dependências
Write-Host "`n📦 Verificando dependências..." -ForegroundColor Yellow
$missingPackages = @()

@("yt-dlp", "pydub", "SpeechRecognition", "openai", "python-dotenv", "requests") | ForEach-Object {
    $output = python -m pip show $_ 2>&1
    if ($LASTEXITCODE -ne 0) {
        $missingPackages += $_
    }
}

if ($missingPackages.Count -gt 0) {
    Write-Host "Instalando pacotes: $($missingPackages -join ', ')" -ForegroundColor Yellow
    python -m pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar dependências!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependências instaladas" -ForegroundColor Green
} else {
    Write-Host "✅ Todas as dependências já estão instaladas" -ForegroundColor Green
}

# Executar script Python
Write-Host ""
Write-Host "🚀 Iniciando transcrição..." -ForegroundColor Cyan
Write-Host ""

python transcrever.py $URL --engine $Engine --language $Language

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Concluído com sucesso!" -ForegroundColor Green
    Write-Host "Confira os arquivos em: output/" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Erro durante a execução!" -ForegroundColor Red
}

Write-Host ""
