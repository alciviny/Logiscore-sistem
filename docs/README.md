# Guia de Nomenclatura para Git

Este documento define as convenções de nomenclatura para branches e commits a serem usadas neste projeto, visando um histórico mais claro, organizado e automatizável.

## Estrutura de Commits (Conventional Commits)

Adotamos o padrão [Conventional Commits](https://www.conventionalcommits.org/). A estrutura de uma mensagem de commit deve ser a seguinte:

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit

-   **feat**: Uma nova funcionalidade (feature).
-   **fix**: Uma correção de bug.
-   **docs**: Alterações apenas na documentação.
-   **style**: Alterações que não afetam o significado do código (espaços em branco, formatação, ponto e vírgula, etc).
-   **refactor**: Uma alteração de código que não corrige um bug nem adiciona uma funcionalidade.
-   **perf**: Uma alteração de código que melhora o desempenho.
-   **test**: Adicionando testes ou corrigindo testes existentes.
-   **build**: Alterações que afetam o sistema de build ou dependências externas (ex: package.json).
-   **ci**: Alterações em nossos arquivos e scripts de configuração de CI (ex: GitHub Actions).
-   **chore**: Outras alterações que não modificam o código-fonte ou os testes (ex: .gitignore).
-   **revert**: Reverte um commit anterior.

**Exemplo:**

```
feat(auth): adicionar login com Google OAuth
```

```
fix: corrigir cálculo de imposto no checkout

O cálculo anterior não considerava a nova taxa para produtos importados.
```

## Nomenclatura de Branches

As branches devem seguir um padrão simples para facilitar a identificação do seu propósito.

### Padrão

`<tipo>/<descrição-curta>`

Onde `<tipo>` pode ser:

-   **feat**: Para o desenvolvimento de novas funcionalidades.
-   **fix**: Para correções de bugs.
-   **hotfix**: Para correções críticas e urgentes em produção.
-   **docs**: Para trabalhar na documentação.
-   **refactor**: Para refatorar uma parte do código.

A `<descrição-curta>` deve ser em `kebab-case` (palavras minúsculas separadas por hífens).

**Exemplos:**

-   `feat/adicionar-carrinho-de-compras`
-   `fix/erro-login-usuario-invalido`
-   `hotfix/corrigir-falha-pagamento-stripe`
-   `docs/atualizar-guia-instalacao`

Seguir estas convenções tornará nosso fluxo de trabalho mais eficiente e nosso histórico de projeto muito mais legível.
