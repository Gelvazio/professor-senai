#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Calculador de Notas Prova Prática UC1 TIC
Analisa entregas na pasta ENTREGAS-PROVA-PRATICA e calcula notas automaticamente
"""

import os
import json
from pathlib import Path
from datetime import datetime

# Configuração
ENTREGAS_PATH = Path(__file__).parent / "PROVA_PRATICA" / "ENTREGAS-PROVA-PRATICA"
OUTPUT_JS = Path(__file__).parent / "NOTAS-PRATICA-FINAL.js"

# Dados das equipes (template)
EQUIPES_TEMPLATE = {
    1: {'nomes': ['Heloísa', 'Emily Sofia', 'Kleiton']},
    2: {'nomes': ['Helisa', 'Mariana', 'Wagner', 'Maria Clara']},
    3: {'nomes': ['Caio Cabral', 'Guilherme Francisco', 'Eduardo Cristiano']},
    4: {'nomes': ['Pablo', 'Kauã Henrique Ambos', 'Eduardo Kramer']},
    5: {'nomes': ['Flávia', 'Yorbelis', 'Ana Lívia']},
    6: {'nomes': ['Andriew', 'Luan Rocha', 'Victor Johancin Perez']},
    7: {'nomes': ['João Pedro', 'João Lucas', 'Anna Maria']},
    8: {'nomes': ['Antonio Vicente', 'Kaike Menegelli', 'Kauan Lucas', 'Isaque Cândido']},
    9: {'nomes': ['Gabriel Vitor', 'Emily Raissa', 'Mirela Kaele']},
    10: {'nomes': ['Jhiogo', 'André Henrique', 'Lucas Nascimento']}
}

def analisar_entregas():
    """Analisa a pasta de entregas e verifica quais arquivos cada equipe entregou"""
    entregas = {}

    print(f"[*] Analisando entregas em: {ENTREGAS_PATH}")
    print("=" * 70)

    for item in ENTREGAS_PATH.iterdir():
        pasta_nome = item.name.lower()

        # Mapear pastas para números de equipe
        equipe_num = None
        if "equipe 01" in pasta_nome or "01_h" in pasta_nome:
            equipe_num = 1
        elif "equipe 03" in pasta_nome:
            equipe_num = 3
        elif "equipe 08" in pasta_nome:
            equipe_num = 8
        elif "equipe 10" in pasta_nome or "10-a" in pasta_nome:
            equipe_num = 10
        elif "equipe 5" in pasta_nome:
            equipe_num = 5
        elif "equipe-04" in pasta_nome:
            equipe_num = 4
        elif "equipe-09" in pasta_nome:
            equipe_num = 9

        if equipe_num and item.is_dir():
            if equipe_num not in entregas:
                entregas[equipe_num] = {'docs': False, 'sheets': False, 'slides': False, 'arquivos': []}

            # Verificar arquivos dentro da pasta
            for arquivo in item.rglob("*"):
                if arquivo.is_file():
                    nome_arq = arquivo.name.lower()
                    entregas[equipe_num]['arquivos'].append(arquivo.name)

                    if 'guia' in nome_arq:
                        entregas[equipe_num]['docs'] = True
                    elif 'inventario' in nome_arq:
                        entregas[equipe_num]['sheets'] = True
                    elif 'apresenta' in nome_arq:
                        entregas[equipe_num]['slides'] = True

    # Verificar arquivos soltos (Equipe 02, 06, 07)
    arquivos_soltos = {}
    for arquivo in ENTREGAS_PATH.iterdir():
        if arquivo.is_file():
            nome_arq = arquivo.name.lower()

            if 'equipe 02' in nome_arq or 'apresentação_da_equipe_02' in nome_arq:
                if 2 not in entregas:
                    entregas[2] = {'docs': False, 'sheets': False, 'slides': False, 'arquivos': []}
                entregas[2]['slides'] = True
                entregas[2]['arquivos'].append(arquivo.name)

            elif 'equipe 7' in nome_arq or 'guia_da_equipe 7' in nome_arq:
                if 7 not in entregas:
                    entregas[7] = {'docs': False, 'sheets': False, 'slides': False, 'arquivos': []}
                entregas[7]['docs'] = True
                entregas[7]['arquivos'].append(arquivo.name)

            elif 'equipe-06' in nome_arq or ('guia' in nome_arq and '06' in nome_arq) or ('inventario' in nome_arq and '06' in nome_arq):
                if 6 not in entregas:
                    entregas[6] = {'docs': False, 'sheets': False, 'slides': False, 'arquivos': []}
                if 'guia' in nome_arq:
                    entregas[6]['docs'] = True
                elif 'inventario' in nome_arq:
                    entregas[6]['sheets'] = True
                entregas[6]['arquivos'].append(arquivo.name)

    return entregas

def calcular_nota_organizacao(equipe_num, entregas_equipe):
    """
    Calcula nota de organização (1,0 ponto)
    - Identificação: 0,10
    - Acessibilidade de cada arquivo: 0,20 cada (máx 0,60)
    - Formato nativo: 0,05 cada (máx 0,15)
    - Nome correto: 0,05 cada (máx 0,15)
    """
    nota = 0.10  # Identificação automática

    # Acessibilidade
    arquivos_count = 0
    if entregas_equipe['docs']:
        nota += 0.20
        arquivos_count += 1
    if entregas_equipe['sheets']:
        nota += 0.20
        arquivos_count += 1
    if entregas_equipe['slides']:
        nota += 0.20
        arquivos_count += 1

    # Formato e nome (assumindo corretos se entregues)
    nota += arquivos_count * 0.10  # 0,05 formato + 0,05 nome

    return min(1.0, nota)

def calcular_nota_docs(equipe_num, entregas_equipe):
    """
    Calcula nota do Google Docs (2,0 pontos)
    Se entregue: 1,0 (arquivo presente)
    Se não entregue: 0,0
    """
    if entregas_equipe['docs']:
        return 1.0  # Será analisado manualmente ou por OCR
    return 0.0

def calcular_nota_sheets(equipe_num, entregas_equipe):
    """
    Calcula nota do Google Sheets (2,0 pontos)
    Se entregue: 1,0 (arquivo presente)
    Se não entregue: 0,0
    """
    if entregas_equipe['sheets']:
        return 1.0  # Será analisado manualmente ou por OCR
    return 0.0

def calcular_nota_slides(equipe_num, entregas_equipe):
    """
    Calcula nota do Google Slides (1,5 pontos)
    Se entregue: 0,75 (arquivo presente)
    Se não entregue: 0,0
    """
    if entregas_equipe['slides']:
        return 0.75  # Será analisado manualmente ou por OCR
    return 0.0

def calcular_nota_seguranca():
    """
    Calcula nota de Segurança e Interpretação (0,5 pontos)
    Será completada após análise manual
    """
    return 0.0  # Pendente análise manual

def calcular_notas_automaticas(entregas):
    """Calcula notas automáticas para cada equipe"""
    notas = {}

    for equipe_num in range(1, 11):
        if equipe_num in entregas:
            e = entregas[equipe_num]
            notas[equipe_num] = {
                'organizacao': calcular_nota_organizacao(equipe_num, e),
                'docs': calcular_nota_docs(equipe_num, e),
                'sheets': calcular_nota_sheets(equipe_num, e),
                'slides': calcular_nota_slides(equipe_num, e),
                'seguranca': calcular_nota_seguranca(),
                'arquivos_entregues': e['arquivos'],
                'completa': e['docs'] and e['sheets'] and e['slides']
            }
        else:
            notas[equipe_num] = {
                'organizacao': 0.0,
                'docs': 0.0,
                'sheets': 0.0,
                'slides': 0.0,
                'seguranca': 0.0,
                'arquivos_entregues': [],
                'completa': False
            }

    return notas

def calcular_nota_automatica_total(nota_eq):
    """Calcula nota automática total (até 7,0)"""
    # Reajustar notas para os pesos corretos
    total = (
        nota_eq['organizacao'] * 1.0 +  # 1,0
        nota_eq['docs'] * 2.0 +          # 2,0
        nota_eq['sheets'] * 2.0 +        # 2,0
        nota_eq['slides'] * 1.5 +        # 1,5
        nota_eq['seguranca'] * 0.5       # 0,5
    )

    # Normalizar para 7,0
    total_normalizado = min(7.0, total * (7.0 / 7.0))
    return round(total_normalizado, 2)

def gerar_status(nota_eq, nota_auto):
    """Gera status baseado na entrega e notas"""
    if not nota_eq['arquivos_entregues']:
        return '❌ Não entregue'
    elif not nota_eq['completa']:
        arquivos = []
        if nota_eq['arquivos_entregues']:
            if not nota_eq['docs']:
                arquivos.append('Docs')
            if not nota_eq['sheets']:
                arquivos.append('Sheets')
            if not nota_eq['slides']:
                arquivos.append('Slides')
        if arquivos:
            return f'⚠️ Entrega incompleta ({", ".join(arquivos)} faltando)'

    if nota_auto >= 5.6:
        return '✅ Requisitos objetivos atendidos'
    else:
        return '⚠️ Revisar requisitos'

def gerar_feedback(nota_eq, nota_auto):
    """Gera feedback automático"""
    feedback = f"Arquivos entregues: {len(nota_eq['arquivos_entregues'])}/3\n"

    if nota_eq['docs']:
        feedback += "✅ Google Docs entregue\n"
    else:
        feedback += "❌ Google Docs faltando\n"

    if nota_eq['sheets']:
        feedback += "✅ Google Sheets entregue\n"
    else:
        feedback += "❌ Google Sheets faltando\n"

    if nota_eq['slides']:
        feedback += "✅ Google Slides entregue\n"
    else:
        feedback += "❌ Google Slides faltando\n"

    feedback += f"\nNota automática provisória: {nota_auto}/7,0"

    return feedback

def gerar_js_file(entregas, notas):
    """Gera o arquivo JavaScript com as notas calculadas"""

    equipes_data = []
    media_automatica = 0

    for equipe_num in range(1, 11):
        nota_eq = notas[equipe_num]
        nota_auto = calcular_nota_automatica_total(nota_eq)
        media_automatica += nota_auto

        status = gerar_status(nota_eq, nota_auto)
        feedback = gerar_feedback(nota_eq, nota_auto)

        equipes_data.append({
            'numero': equipe_num,
            'nomes': EQUIPES_TEMPLATE[equipe_num]['nomes'],
            'notas': {
                'organizacao': round(nota_eq['organizacao'], 2),
                'docs': round(nota_eq['docs'], 2),
                'sheets': round(nota_eq['sheets'], 2),
                'slides': round(nota_eq['slides'], 2),
                'seguranca': round(nota_eq['seguranca'], 2),
                'notaAutomatica': nota_auto,
                'status': status,
                'clareza': None,
                'correcaoTecnica': None,
                'apresentacao': None,
                'notaDocente': None,
                'notaFinal': None,
                'feedback': feedback
            },
            'arquivos': {
                'docs': '✅' if nota_eq['docs'] else '❌',
                'sheets': '✅' if nota_eq['sheets'] else '❌',
                'slides': '✅' if nota_eq['slides'] else '❌'
            }
        })

    media_automatica = round(media_automatica / 10, 2)

    js_content = f"""/**
 * NOTAS DA PROVA PRÁTICA UC1 TIC - 26-08-2026
 * Estrutura de dados com notas automáticas calculadas das entregas
 * Gerado automaticamente em: {datetime.now().strftime('%d-%m-%Y %H:%M:%S')}
 */

const notasProvaPratica = {{
  prova: {{
    titulo: 'Avaliação Prática — Prova Simples UC1 TIC',
    data: '26-08-2026',
    turma: 'Turma PG',
    totalAlunos: 32,
    notaMaximaAutomatica: 7.0,
    notaMaximaDocente: 3.0,
    notaMaximaTotal: 10.0,
    dataAtualizacao: '{datetime.now().strftime('%d-%m-%Y %H:%M:%S')}'
  }},
  criterios: {{
    automaticos: [
      {{ nome: 'Organização e Entrega', peso: 1.0, descricao: 'Identificação da equipe, acessibilidade e formato dos arquivos' }},
      {{ nome: 'Google Docs (Guia)', peso: 2.0, descricao: 'Conteúdo, estrutura, termos técnicos e fontes' }},
      {{ nome: 'Google Sheets (Inventário)', peso: 2.0, descricao: 'Cabeçalhos, registros, fórmulas e formatação' }},
      {{ nome: 'Google Slides (Apresentação)', peso: 1.5, descricao: 'Estrutura de slides, conteúdo e apresentação' }},
      {{ nome: 'Segurança e Interpretação', peso: 0.5, descricao: 'Termos de segurança encontrados nos documentos' }}
    ],
    docente: [
      {{ nome: 'Clareza e Linguagem', peso: 1.0, descricao: 'Clareza na comunicação escrita e oral' }},
      {{ nome: 'Correção Técnica', peso: 1.0, descricao: 'Precisão dos conteúdos técnicos' }},
      {{ nome: 'Apresentação e Cooperação', peso: 1.0, descricao: 'Qualidade da apresentação e trabalho em equipe' }}
    ]
  }},
  equipes: {json.dumps(equipes_data, ensure_ascii=False, indent=4)},
  resumo: {{
    equipesEntregues: {sum(1 for e in equipes_data if e['notas']['notaAutomatica'] > 0)},
    equipesPendentes: {sum(1 for e in equipes_data if e['notas']['notaAutomatica'] == 0)},
    mediaNotaAutomatica: {media_automatica},
    mediaNotaFinal: null,
    ultimaAtualizacao: '{datetime.now().strftime('%d-%m-%Y %H:%M:%S')}'
  }}
}};

// Exportar para Node.js (se aplicável)
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = notasProvaPratica;
}}
"""

    return js_content, media_automatica

def main():
    print("\n" + "=" * 70)
    print("CALCULADOR DE NOTAS - PROVA PRATICA UC1 TIC")
    print("=" * 70)

    # Analisar entregas
    entregas = analisar_entregas()

    print(f"\n[OK] Analise concluida!")
    print(f"   Total de equipes analisadas: {len(entregas)}")

    for eq_num in sorted(entregas.keys()):
        e = entregas[eq_num]
        arquivos = f"[*] {len(e['arquivos'])} arquivo(s)"
        docs_status = "[OK] Docs" if e['docs'] else "[X] Docs"
        sheets_status = "[OK] Sheets" if e['sheets'] else "[X] Sheets"
        slides_status = "[OK] Slides" if e['slides'] else "[X] Slides"
        print(f"   Equipe {eq_num:2d}: {docs_status} | {sheets_status} | {slides_status}")

    # Calcular notas
    print(f"\nCalculando notas automaticas...")
    notas = calcular_notas_automaticas(entregas)

    # Gerar arquivo JS
    print(f"\nGerando arquivo JavaScript...")
    js_content, media = gerar_js_file(entregas, notas)

    # Salvar arquivo
    with open(OUTPUT_JS, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"[OK] Arquivo salvo: {OUTPUT_JS}")
    print(f"\nResumo:")
    print(f"   Media de nota automatica: {media}/7,0")

    print("\n" + "=" * 70)
    print("Processo concluido com sucesso!")
    print("=" * 70 + "\n")

if __name__ == '__main__':
    main()
