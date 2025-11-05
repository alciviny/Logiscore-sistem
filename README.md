# Sistema de Inventário Inteligente (SII) - LogisCore

Este projeto é a construção do back-end para o novo Sistema de Inventário Inteligente da LogisCore Armazéns. Nosso objetivo é substituir o controle de estoque manual em planilhas por uma API RESTful robusta que servirá de "coração" para a nova aplicação web.

## O Problema a Resolver

A LogisCore perde dinheiro e eficiência devido a um controle de inventário impreciso, resultando em "furos de estoque" (falta de peças que deveriam existir) e "excesso de estoque" (compra de peças desnecessárias).

## Nosso Objetivo

Desenvolver a API RESTful para o CRUD (Create, Read, Update, Delete) completo dos itens do catálogo de produtos.

---

## Tarefas e Requisitos

### Back-end: API RESTful

- [ ] **`POST /produtos`**: Rota para criar um novo item no inventário.
  - **Campos:** `nome`, `SKU`, `quantidade`, `localizacao`.

- [ ] **`GET /produtos`**: Rota para ler/listar todos os produtos.
  - **Filtros:** Deve ser possível filtrar por `nome` e `SKU` via query params (ex: `/produtos?sku=XYZ-123`).

- [ ] **`GET /produtos/:id`**: Rota para obter os dados de um único produto pelo seu ID.

- [ ] **`PATCH /produtos/:id`**: Rota para atualizar a quantidade de um item.
  - **Foco:** A atualização deve ser focada em alterar a quantidade para registrar entradas e saídas.
  - **Regra de Negócio:** A API **deve** impedir que a quantidade de um item se torne negativa.

- [ ] **`DELETE /produtos/:id`**: Rota para remover um item obsoleto do catálogo.

### Front-end (Requisitos para a API suportar)

- O front-end precisará de uma tela de dashboard para exibir todos os produtos.
- O front-end implementará uma busca que consumirá os filtros da rota `GET /produtos`.
- O front-end terá um formulário para criar produtos (`POST /produtos`).
- O front-end terá botões de `+` e `-` para ajustar o estoque (`PATCH /produtos/:id`).
- O front-end irá destacar visualmente itens com estoque baixo (ex: < 10 unidades). A API deve fornecer a quantidade de forma clara.


 Consulte o arquivo `docs/README.md` para as convenções de commit e branch.
