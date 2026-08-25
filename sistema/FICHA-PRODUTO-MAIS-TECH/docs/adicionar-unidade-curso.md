# Adicionar Unidade aos cursos

## Objetivo

Adicionar o campo `unidade` ao cadastro de cursos e exibi-lo nas interfaces administrativas do sistema.

## Etapas

1. ✅ Mapear a consulta, o formulário e as listagens de cursos.
2. ✅ Criar a alteração idempotente da tabela `curso`.
3. ✅ Incluir `unidade` na leitura e gravação dos cursos.
4. ✅ Exibir a coluna Unidade nas listagens administrativas.
5. ✅ Revisar as alterações e publicar.

## Alteração de banco

```sql
alter table public.curso add column if not exists unidade text;
```

Conforme as regras do projeto, não serão executados testes, servidor ou validação em navegador.
