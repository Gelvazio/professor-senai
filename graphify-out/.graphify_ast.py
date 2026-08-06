import json
from graphify.extract import collect_files, extract
from pathlib import Path


def main():
    code_files = []
    detect = json.loads(Path('graphify-out/.graphify_incremental.json').read_text(encoding="utf-8"))
    for f in detect.get('new_files', {}).get('code', []):
        p = Path(f)
        code_files.extend(collect_files(p) if p.is_dir() else [p])

    if code_files:
        result = extract(code_files)
        Path('graphify-out/.graphify_ast.json').write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f'AST: {len(result["nodes"])} nodes, {len(result["edges"])} edges')
    else:
        Path('graphify-out/.graphify_ast.json').write_text(json.dumps({'nodes':[],'edges':[],'input_tokens':0,'output_tokens':0}, ensure_ascii=False), encoding="utf-8")
        print('Sem arquivos de codigo - AST vazio')


if __name__ == '__main__':
    main()
