# Quick Start - Transcrever YouTube em 3 Passos

## 1️⃣ Instalar Dependências

### Windows (PowerShell)
```powershell
pip install -r requirements.txt
```

### Windows (CMD)
```cmd
python -m pip install -r requirements.txt
```

### macOS / Linux
```bash
pip install -r requirements.txt
```

## 2️⃣ Transcrever um Vídeo

### Opção A: Usar o Script Batch (Windows)
```batch
transcrever.bat "https://www.youtube.com/watch?v=XXXXXXXXXX"
```

### Opção B: Usar PowerShell (Windows)
```powershell
.\transcrever.ps1 -URL "https://www.youtube.com/watch?v=XXXXXXXXXX"
```

### Opção C: Usar Python Diretamente
```bash
python transcrever.py "https://www.youtube.com/watch?v=XXXXXXXXXX"
```

## 3️⃣ Encontrar os Resultados

Os arquivos são salvos em `output/`:
- 📄 `nome_do_video.txt` - Texto puro com timestamps
- 📋 `nome_do_video.json` - Formato estruturado

## Exemplos Reais

### YouTube Aula SENAI
```bash
python transcrever.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ" --language pt-BR
```

### Usando OpenAI Whisper (melhor qualidade)
```bash
# Primeiro, configure a chave:
# Windows:
$env:OPENAI_API_KEY = "sk-..."

# Depois:
python transcrever.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ" --engine whisper
```

### Salvar com nome customizado
```bash
python transcrever.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ" --output minha_aula.txt
```

## Dúvidas Comuns

### ❓ Qual motor é melhor?
- **Google Speech Recognition**: Gratuito, rápido, não precisa de API key
- **OpenAI Whisper**: Mais preciso, requer API key e créditos

### ❓ Quanto tempo leva?
- Depende da duração do vídeo e do motor:
  - 10 minutos com Google: ~5-10 segundos
  - 10 minutos com Whisper: ~15-30 segundos

### ❓ Posso transcrever vídeos privados?
Não, apenas vídeos públicos funcionam.

### ❓ Qual é o limite de tamanho?
- Google: Até 25 MB de áudio (dividido em chunks)
- Whisper: Até 25 MB de arquivo

### ❓ Preciso de FFmpeg?
Opcionalmente. Se instalado, a extração é mais rápida. Caso contrário, usa-se pydub.

## Configuração Avançada

Crie um arquivo `.env` com base em `.env.example`:

```bash
cp .env.example .env
# Edite .env com sua configuração
```

Conteúdo do `.env`:
```
OPENAI_API_KEY=sk-...
LANGUAGE=pt-BR
TRANSCRIPTION_ENGINE=google
```

## Suporte

- 📖 Leia [README.md](README.md) para documentação completa
- 🐛 Abra uma issue se encontrar problemas
- 💬 Contate o responsável pelo projeto

---

**Pronto para começar?** Copie uma das URLs de exemplo e execute! 🚀
