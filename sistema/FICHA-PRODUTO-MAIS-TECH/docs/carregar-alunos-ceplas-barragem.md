# Carregamento automático de alunos — CEPLAS Barragem

## Objetivo

Carregar automaticamente a turma CEPLAS Barragem ao iniciar uma nova Avaliação Comportamentos em qualquer matéria do curso correspondente.

## Etapas

1. ✅ Identificar a turma pela identificação do curso ou da matéria aberta.
2. ✅ Estruturar a fonte `LISTA-ALUNOS-NOME-UNIDADE.json` com unidade, turma e nomes.
3. ✅ Buscar os alunos dessa fonte ao abrir uma nova avaliação, sem manter nomes fixos no código.
4. ✅ Preservar os históricos já salvos e tratar indisponibilidade da fonte.
5. ✅ Revisar as alterações e publicar no repositório.

## Compatibilidade da fonte

- ✅ Formato atual: objeto com os campos `unidade`, `turma` e `alunos`.
- ✅ Formato compatível: array JSON direto contendo os nomes dos alunos.

## Correção do carregamento

1. ✅ Identificar que a validação pelo nome do curso/matéria interrompia o fluxo antes da leitura do JSON.
2. ✅ Remover a dependência dessa identificação externa.
3. ✅ Usar o campo `unidade` do próprio JSON como referência e carregar seus alunos.
4. ✅ Publicar a correção.

## Verificação prevista

```powershell
git diff -- sistema/dashboard.html sistema/FICHA-PRODUTO-MAIS-TECH/docs/carregar-alunos-ceplas-barragem.md
```

Conforme as regras do projeto, não serão executados testes, servidor ou validação em navegador.
