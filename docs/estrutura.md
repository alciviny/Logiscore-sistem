# 📂 Estrutura do Projeto Logiscore

Este documento detalha a organização de pastas e a responsabilidade de cada arquivo principal no sistema **Logiscore**. A arquitetura segue o padrão MVC (Model-View-Controller) adaptado para API REST com camadas de Serviço.

## 🌳 Árvore de Diretórios

```text
logiscore-sistem/
├── .env                     # Variáveis de ambiente (Configurações sensíveis)
├── package.json             # Gerenciador de dependências e scripts
├── server.js                # Ponto de entrada principal da aplicação
├── public/                  # Arquivos estáticos (Frontend)
│   ├── index.html           # Página principal
│   ├── styles/              # Folhas de estilo CSS
│   ├── scripts/             # Lógica do lado do cliente (DOM, Fetch API)
│   └── images/              # Assets e ícones
└── src/                     # Código fonte do Backend (API)
    ├── app.js               # Configuração do App Express e Middlewares
    ├── server.js            # Inicialização do servidor HTTP
    ├── config/              # Configurações globais
    ├── controllers/         # Controladores das rotas
    ├── models/              # Modelos de dados (MongoDB/Mongoose)
    ├── routes/              # Definição das rotas da API
    └── services/            # Regras de negócio e acesso ao banco