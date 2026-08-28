# Transcrever Vídeos do YouTube

Sistema automatizado para baixar e transcrever vídeos do YouTube em português.

## Funcionalidades

- ✅ Download de vídeos do YouTube
- ✅ Extração de áudio em MP3
- ✅ Transcrição automática usando Google Speech Recognition
- ✅ Exportação em TXT e JSON
- ✅ Suporte a timestamps
- ✅ Limpeza automática de arquivos temporários

## Instalação

```bash
pip install -r requirements.txt
```

## Uso

### Transcrever um vídeo

```bash
python transcrever.py "https://www.youtube.com/watch?v=..."
```

### Opções adicionais

```bash
python transcrever.py "URL" --format json
python transcrever.py "URL" --language pt-BR
python transcrever.py "URL" --output meu_arquivo.txt
```

## Configuração

### Usando Google Speech Recognition (Gratuito)

Funciona out-of-the-box com limitações de tamanho.

### Usando OpenAI Whisper (Recomendado)

1. Configure a variável de ambiente:
   ```bash
   $env:OPENAI_API_KEY = "sua-chave-aqui"
   ```

2. Use o script com Whisper:
   ```bash
   python transcrever.py "URL" --engine whisper
   ```

## Estrutura de Arquivos

```
transcrever-video-youtube/
├── transcrever.py          # Script principal
├── requirements.txt        # Dependências
├── README.md              # Este arquivo
└── output/                # Transcrições geradas
    ├── videos/            # Vídeos baixados
    └── audio/             # Áudios extraídos
```

## Troubleshooting

### "ModuleNotFoundError"
```bash
pip install -r requirements.txt --upgrade
```

### "Vídeo não encontrado"
- Verifique se a URL está correta
- Tente colar a URL completa no navegador
- Alguns vídeos podem estar privados ou removidos

### "Transcrição lenta"
- Use `--engine whisper` (mais rápido)
- Reduza a duração do vídeo
- Aumente o tamanho dos chunks para processamento

## Limitações

- **Google Speech Recognition**: Até 5 minutos por áudio
- **OpenAI Whisper**: Até 25 MB por arquivo
- Vídeos privados/restritos não funcionam
- Requer conexão com internet

## Autor

Desenvolvido para SENAI Professor

---

**Dúvidas?** Abra uma issue ou entre em contato.
