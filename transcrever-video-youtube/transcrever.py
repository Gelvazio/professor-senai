#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import json
import argparse
from pathlib import Path
from datetime import datetime
import subprocess
import tempfile
import re

try:
    import yt_dlp
    from pydub import AudioSegment
    import speech_recognition as sr
    from dotenv import load_dotenv
except ImportError:
    print("❌ Dependências não instaladas!")
    print("Execute: pip install -r requirements.txt")
    sys.exit(1)

# Carregar variáveis de ambiente
load_dotenv()

class TranscriptorYouTube:
    def __init__(self, engine="google", language="pt-BR"):
        self.engine = engine
        self.language = language
        self.recognizer = sr.Recognizer()
        self.output_dir = Path("output")
        self.videos_dir = self.output_dir / "videos"
        self.audio_dir = self.output_dir / "audio"
        self._setup_dirs()

    def _setup_dirs(self):
        """Criar diretórios de saída"""
        self.videos_dir.mkdir(parents=True, exist_ok=True)
        self.audio_dir.mkdir(parents=True, exist_ok=True)

    def baixar_video(self, url):
        """Baixar vídeo do YouTube"""
        print(f"📥 Baixando vídeo: {url}")

        try:
            ydl_opts = {
                'format': 'best[ext=mp4]',
                'outtmpl': str(self.videos_dir / '%(title)s.%(ext)s'),
                'quiet': False,
                'no_warnings': False,
            }

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                video_path = ydl.prepare_filename(info)
                print(f"✅ Vídeo baixado: {video_path}")
                return video_path, info.get('title', 'video')
        except Exception as e:
            print(f"❌ Erro ao baixar: {e}")
            raise

    def extrair_audio(self, video_path, titulo):
        """Extrair áudio do vídeo"""
        print(f"🎵 Extraindo áudio...")

        audio_path = self.audio_dir / f"{self._sanitize_filename(titulo)}.mp3"

        try:
            # Tentar usar ffmpeg via yt-dlp
            cmd = [
                'ffmpeg',
                '-i', video_path,
                '-q:a', '0',
                '-map', 'a',
                str(audio_path),
                '-y'
            ]

            subprocess.run(cmd, capture_output=True, check=True)
            print(f"✅ Áudio extraído: {audio_path}")
            return str(audio_path)
        except FileNotFoundError:
            print("❌ FFmpeg não encontrado. Usando pydub...")
            return self._extrair_audio_pydub(video_path, audio_path)
        except Exception as e:
            print(f"❌ Erro ao extrair áudio: {e}")
            raise

    def _extrair_audio_pydub(self, video_path, audio_path):
        """Fallback: extrair áudio com pydub"""
        try:
            audio = AudioSegment.from_file(video_path)
            audio.export(str(audio_path), format="mp3")
            print(f"✅ Áudio extraído: {audio_path}")
            return str(audio_path)
        except Exception as e:
            print(f"❌ Erro no pydub: {e}")
            raise

    def transcrever_google(self, audio_path):
        """Transcrever usando Google Speech Recognition"""
        print(f"🎙️  Transcrevendo com Google Speech Recognition...")

        try:
            audio = AudioSegment.from_mp3(audio_path)

            # Dividir em chunks de 60 segundos
            chunk_length = 60 * 1000  # 60 segundos em ms
            chunks = [audio[i:i + chunk_length]
                     for i in range(0, len(audio), chunk_length)]

            transcript = []
            timestamp = 0

            for i, chunk in enumerate(chunks, 1):
                print(f"  Processando chunk {i}/{len(chunks)}...", end=" ", flush=True)

                # Salvar chunk temporário
                with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
                    chunk.export(tmp.name, format="wav")
                    tmp_path = tmp.name

                try:
                    with sr.AudioFile(tmp_path) as source:
                        audio_data = self.recognizer.record(source)

                    text = self.recognizer.recognize_google(
                        audio_data,
                        language=self.language
                    )

                    transcript.append({
                        "timestamp": f"{timestamp // 60:02d}:{timestamp % 60:02d}",
                        "text": text
                    })
                    print("✅")

                except sr.UnknownValueError:
                    print("⚠️  (inaudível)")
                    transcript.append({
                        "timestamp": f"{timestamp // 60:02d}:{timestamp % 60:02d}",
                        "text": "[inaudível]"
                    })
                except sr.RequestError as e:
                    print(f"❌ ({e})")
                finally:
                    os.unlink(tmp_path)

                timestamp += 60

            return transcript
        except Exception as e:
            print(f"❌ Erro na transcrição: {e}")
            raise

    def transcrever_whisper(self, audio_path):
        """Transcrever usando OpenAI Whisper"""
        print(f"🎙️  Transcrevendo com OpenAI Whisper...")

        try:
            import openai

            api_key = os.getenv('OPENAI_API_KEY')
            if not api_key:
                print("❌ OPENAI_API_KEY não configurada!")
                print("Configure: $env:OPENAI_API_KEY = 'sua-chave'")
                raise ValueError("API key não encontrada")

            with open(audio_path, 'rb') as audio_file:
                transcript_response = openai.Audio.transcribe(
                    model="whisper-1",
                    file=audio_file,
                    language="pt",
                    response_format="verbose_json"
                )

            # Processar resposta
            transcript = []
            if isinstance(transcript_response, dict) and 'segments' in transcript_response:
                for segment in transcript_response['segments']:
                    transcript.append({
                        "timestamp": self._format_timestamp(segment.get('start', 0)),
                        "text": segment.get('text', '')
                    })
            else:
                # Fallback para resposta simples
                transcript.append({
                    "timestamp": "00:00",
                    "text": str(transcript_response)
                })

            return transcript
        except Exception as e:
            print(f"❌ Erro no Whisper: {e}")
            raise

    def transcrever(self, audio_path):
        """Transcrever áudio usando engine configurado"""
        if self.engine == "whisper":
            return self.transcrever_whisper(audio_path)
        else:
            return self.transcrever_google(audio_path)

    def salvar_resultados(self, titulo, transcript):
        """Salvar transcrição em TXT e JSON"""
        filename = self._sanitize_filename(titulo)

        # Salvar como TXT
        txt_path = self.output_dir / f"{filename}.txt"
        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write(f"Título: {titulo}\n")
            f.write(f"Data: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\n")
            f.write("=" * 80 + "\n\n")

            for item in transcript:
                f.write(f"[{item['timestamp']}] {item['text']}\n")

        # Salvar como JSON
        json_path = self.output_dir / f"{filename}.json"
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump({
                "titulo": titulo,
                "data": datetime.now().isoformat(),
                "motor": self.engine,
                "idioma": self.language,
                "transcrip": transcript
            }, f, indent=2, ensure_ascii=False)

        print(f"\n✅ Resultados salvos:")
        print(f"   📄 {txt_path}")
        print(f"   📋 {json_path}")

        return txt_path, json_path

    def limpar_temporarios(self, video_path):
        """Limpar arquivos temporários"""
        try:
            if os.path.exists(video_path):
                os.remove(video_path)
                print(f"🗑️  Vídeo temporário removido")
        except Exception as e:
            print(f"⚠️  Erro ao limpar: {e}")

    @staticmethod
    def _sanitize_filename(filename):
        """Sanitizar nome de arquivo"""
        return re.sub(r'[<>:"/\\|?*]', '', filename)[:200]

    @staticmethod
    def _format_timestamp(seconds):
        """Formatar timestamp"""
        mins = int(seconds) // 60
        secs = int(seconds) % 60
        return f"{mins:02d}:{secs:02d}"


def main():
    parser = argparse.ArgumentParser(
        description="Transcrever vídeos do YouTube"
    )
    parser.add_argument("url", help="URL do vídeo do YouTube")
    parser.add_argument("--engine", choices=["google", "whisper"],
                       default="google",
                       help="Motor de transcrição (padrão: google)")
    parser.add_argument("--language", default="pt-BR",
                       help="Idioma (padrão: pt-BR)")
    parser.add_argument("--output", help="Arquivo de saída personalizado")
    parser.add_argument("--keep-video", action="store_true",
                       help="Manter vídeo após transcrição")

    args = parser.parse_args()

    try:
        transcriptor = TranscriptorYouTube(
            engine=args.engine,
            language=args.language
        )

        # Baixar vídeo
        video_path, titulo = transcriptor.baixar_video(args.url)

        # Extrair áudio
        audio_path = transcriptor.extrair_audio(video_path, titulo)

        # Transcrever
        transcript = transcriptor.transcrever(audio_path)

        # Salvar resultados
        txt_path, json_path = transcriptor.salvar_resultados(titulo, transcript)

        # Limpar temporários
        if not args.keep_video:
            transcriptor.limpar_temporarios(video_path)

        print(f"\n🎉 Transcrição concluída com sucesso!")

    except KeyboardInterrupt:
        print("\n⚠️  Operação cancelada pelo usuário")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Erro fatal: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
