#!/usr/bin/env python3
"""
Conversor de slides HTML para PDF — SENAI TIC
==============================================
Converte todos os HTMLs das aulas TIC para PDF usando o Chrome headless.
O arquivo HTML original nunca é modificado; o PDF fica no mesmo diretório.

Uso:
    python converter_slides_pdf.py            # converte apenas os que ainda não têm PDF
    python converter_slides_pdf.py --forcar   # regera todos os PDFs (sobrescreve)
    python converter_slides_pdf.py --aula 03  # converte apenas a pasta AULA-03-*
"""

import subprocess
import sys
import time
from pathlib import Path

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

BASE_DIR = (
    Path(__file__).parent
    / "sistema"
    / "INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO"
    / "AULAS"
)

IGNORAR = {"backfill-ids.html"}


def converter(html_path: Path, forcar: bool = False) -> bool:
    if html_path.name in IGNORAR:
        return True

    pdf_path = html_path.with_suffix(".pdf")

    if pdf_path.exists() and not forcar:
        print(f"    [JÁ EXISTE] {html_path.name}")
        return True

    abs_html = html_path.resolve()
    abs_pdf = str(pdf_path.resolve())

    cmd = [
        CHROME,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-web-security",
        "--allow-file-access-from-files",
        "--disable-extensions",
        f"--print-to-pdf={abs_pdf}",
        "--print-to-pdf-no-header",
        "--no-margins",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=8000",
        f"file:///{abs_html}",
    ]

    try:
        resultado = subprocess.run(
            cmd,
            capture_output=True,
            timeout=60,
        )

        time.sleep(0.5)

        if pdf_path.exists() and pdf_path.stat().st_size > 0:
            tamanho = pdf_path.stat().st_size // 1024
            print(f"    [OK] {html_path.name} → {pdf_path.name} ({tamanho} KB)")
            return True

        print(f"    [ERRO] {html_path.name} — PDF não gerado")
        stderr = resultado.stderr.decode("utf-8", errors="replace")
        if stderr:
            print(f"           {stderr[:300]}")
        return False

    except subprocess.TimeoutExpired:
        print(f"    [TIMEOUT] {html_path.name}")
        return False
    except FileNotFoundError:
        print(f"\n[FATAL] Chrome não encontrado em:\n  {CHROME}")
        print("Verifique o caminho e tente novamente.")
        sys.exit(1)
    except Exception as exc:
        print(f"    [ERRO] {html_path.name}: {exc}")
        return False


def main():
    args = sys.argv[1:]
    forcar = "--forcar" in args or "-f" in args

    filtro_aula = None
    if "--aula" in args:
        idx = args.index("--aula")
        if idx + 1 < len(args):
            filtro_aula = args[idx + 1]

    if not BASE_DIR.exists():
        print(f"[ERRO] Diretório de aulas não encontrado:\n  {BASE_DIR}")
        sys.exit(1)

    pastas_aula = sorted(p for p in BASE_DIR.iterdir() if p.is_dir())

    if filtro_aula:
        pastas_aula = [p for p in pastas_aula if filtro_aula in p.name]
        if not pastas_aula:
            print(f"Nenhuma pasta encontrada com '{filtro_aula}' no nome.")
            sys.exit(1)

    total_html = sum(len(list(p.glob("*.html"))) for p in pastas_aula)

    print("=" * 60)
    print("  Conversor HTML → PDF — Aulas TIC SENAI")
    print("=" * 60)
    print(f"  Diretório : {BASE_DIR}")
    print(f"  Arquivos  : {total_html} HTML(s) encontrado(s)")
    print(f"  Modo      : {'FORÇAR (regera tudo)' if forcar else 'INCREMENTAL (pula existentes)'}")
    if filtro_aula:
        print(f"  Filtro    : aulas com '{filtro_aula}'")
    print("=" * 60)

    ok = erro = 0

    for pasta in pastas_aula:
        htmls = sorted(pasta.glob("*.html"))
        if not htmls:
            continue

        print(f"\n📁 {pasta.name}")
        for html in htmls:
            if converter(html, forcar):
                ok += 1
            else:
                erro += 1

    print()
    print("=" * 60)
    print(f"  Concluído: {ok} convertido(s)  |  {erro} erro(s)")
    print("=" * 60)


if __name__ == "__main__":
    main()
