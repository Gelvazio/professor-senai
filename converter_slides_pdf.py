#!/usr/bin/env python3
"""
Conversor de slides HTML para PDF — SENAI TIC
==============================================
Converte todos os HTMLs das aulas TIC para PDF usando o Chrome headless.
O arquivo HTML original nunca é modificado; o PDF fica no mesmo diretório.

Para HTMLs com slides ocultos (display:none), cria um arquivo temporário com
todos os slides visíveis antes de gerar o PDF — garante que todas as páginas
apareçam no documento final.

Uso:
    python converter_slides_pdf.py            # converte apenas os que ainda não têm PDF
    python converter_slides_pdf.py --forcar   # regera todos os PDFs (sobrescreve)
    python converter_slides_pdf.py --aula 03  # converte apenas a pasta AULA-03-*
"""

import re
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

_SLIDE_OCULTO = re.compile(r'\.slide\s*\{[^}]*display\s*:\s*none', re.IGNORECASE)

CSS_TODOS_SLIDES = (
    '\n<style id="__pdf_override__">\n'
    '  .slide {\n'
    '    display: block !important;\n'
    '    opacity: 1 !important;\n'
    '    transform: none !important;\n'
    '    animation: none !important;\n'
    '    transition: none !important;\n'
    '    page-break-after: always;\n'
    '    margin-bottom: 16px;\n'
    '  }\n'
    '  * { animation: none !important; transition: none !important; }\n'
    '  .topbar { display: none !important; }\n'
    '  .nav { display: none !important; }\n'
    '  .progress-wrap { display: none !important; }\n'
    '  .btn-print { display: none !important; }\n'
    '  .nav-dots { display: none !important; }\n'
    '  main { padding: 8px 24px !important; }\n'
    '</style>\n'
    '<script>\n'
    'document.addEventListener("DOMContentLoaded",function(){\n'
    '  document.querySelectorAll(".slide").forEach(function(s){\n'
    '    s.style.setProperty("display","block","important");\n'
    '    s.style.setProperty("opacity","1","important");\n'
    '    s.style.setProperty("transform","none","important");\n'
    '    s.style.setProperty("animation","none","important");\n'
    '  });\n'
    '});\n'
    '</script>\n'
)


def preparar_html(html_path: Path) -> tuple:
    """
    Se o HTML usa o padrão de slides ocultos, cria um arquivo temporário com
    todos os slides visíveis. Retorna (caminho_a_usar, é_temporário).
    """
    content = html_path.read_text(encoding="utf-8")

    if not _SLIDE_OCULTO.search(content):
        return html_path, False

    content_mod = content.replace("</head>", CSS_TODOS_SLIDES + "</head>", 1)
    temp = html_path.parent / f"__tmp__{html_path.name}"
    temp.write_text(content_mod, encoding="utf-8")
    return temp, True


def converter(html_path: Path, forcar: bool = False) -> bool:
    if html_path.name in IGNORAR:
        return True

    pdf_path = html_path.with_suffix(".pdf")

    if pdf_path.exists() and not forcar:
        print(f"    [JÁ EXISTE] {html_path.name}")
        return True

    html_para_converter, e_temp = preparar_html(html_path)
    abs_html = html_para_converter.resolve()
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
        resultado = subprocess.run(cmd, capture_output=True, timeout=60)
        time.sleep(0.5)

        if pdf_path.exists() and pdf_path.stat().st_size > 0:
            tamanho = pdf_path.stat().st_size // 1024
            modo = " [todos slides]" if e_temp else ""
            print(f"    [OK]{modo} {html_path.name} → {pdf_path.name} ({tamanho} KB)")
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
        sys.exit(1)
    except Exception as exc:
        print(f"    [ERRO] {html_path.name}: {exc}")
        return False
    finally:
        if e_temp and html_para_converter.exists():
            html_para_converter.unlink()


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
