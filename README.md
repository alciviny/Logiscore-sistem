# 📦 Logiscore System | Inventory & Logistics Intelligence

**Logiscore** é uma solução de **alta performance para gestão de inventário e fluxo logístico**, projetada com foco em **Type Safety, escalabilidade e confiabilidade operacional**.

O sistema automatiza todo o **ciclo de vida dos produtos** — da entrada em estoque até a geração de **relatórios estratégicos** para suporte à tomada de decisão.

---

## 🎯 Problema que o Logiscore resolve

* Controle manual ou pouco confiável de inventário
* Dificuldade em escalar sistemas logísticos
* Falta de relatórios claros para decisão estratégica

👉 O Logiscore transforma logística em um **sistema orientado a dados e performance**.

---

## 🏗️ Engenharia de Software & Arquitetura

O projeto foi construído utilizando o padrão **Controller–Service–Model**, garantindo:

* Separação clara de responsabilidades
* Facilidade de manutenção
* Alta testabilidade

### Diferenciais Técnicos

* **Type-Safe Flow**
  Uso extensivo de **TypeScript**, interfaces e tipos customizados no backend e frontend, reduzindo drasticamente erros em tempo de execução.

* **Persistent Data Layer**
  Schemas robustos com **Mongoose**, garantindo integridade referencial e validações complexas no nível do banco de dados.

* **RESTful API Design**
  Endpoints organizados por domínios (`/produtos`, `/relatorios`), seguindo boas práticas de verbos HTTP e status codes.

* **Edge Deployment Ready**
  Configuração otimizada para o runtime da **Vercel**, garantindo baixa latência e escalabilidade global.

---

## 🛠️ Stack Tecnológica

| Camada    | Tecnologia               | Motivação                                           |
| --------- | ------------------------ | --------------------------------------------------- |
| Runtime   | Node.js                  | I/O não-bloqueante para alto volume de requisições  |
| Linguagem | TypeScript               | Robustez, produtividade e redução de débito técnico |
| Framework | Express.js               | Minimalismo e flexibilidade na construção de APIs   |
| Database  | MongoDB                  | Flexibilidade de schema para evolução do produto    |
| ODM       | Mongoose                 | Modelagem e validação avançada de dados             |
| Frontend  | TypeScript + TailwindCSS | UI responsiva e lógica de cliente tipada            |

---

## 🚀 Funcionalidades Hardcore

* **Lifecycle Management**
  CRUD completo de produtos com validação de estoque crítico.

* **Intelligence Reports**
  Motor de agregação de dados para geração de relatórios dinâmicos.

* **Search Engine**
  Busca eficiente para filtragem de grandes volumes de itens.

* **Mobile-First UI**
  Interface 100% responsiva, pensada para ambientes de armazém e logística.

---

## ⚙️ Setup & Instalação (Fast Track)

### Pré-requisitos

* Node.js **v18+**
* MongoDB (Local ou Atlas)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/alciviny/logiscore-sistem.git
cd logiscore-sistem

# Instale as dependências
npm install
```

### Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MONGODB_URI=sua_string_de_conexao
PORT=3000
```

### Execução em Desenvolvimento

```bash
npm run dev
```

### Build para Produção

```bash
npm run build
npm start
```

---

## 🔬 Decisões Arquiteturais (O que recrutadores observam)

* **Separação de Rotas**
  Cada domínio de negócio possui seu próprio arquivo de rotas, evitando o *God File*.

* **Middleware de Erros**
  Centralização do tratamento de exceções para respostas consistentes da API.

* **Configuração de Build Rigorosa**
  Uso de `tsconfig.json` restritivo para garantir alta qualidade de código.

---

## 👨‍💻 Autor

**Vinícius**
Software Engineer | Soluções Full-Stack & Sistemas Escaláveis

Este projeto demonstra minha capacidade de **entregar sistemas funcionais**, com **rigor técnico**, foco em **performance** e **boas práticas de engenharia**.

---

## 🔗 Links

* 💼 [LinkedIn](https://www.linkedin.com/in/alcionis-vinicius)
* 🌐 [GitHub Portfolio](https://github.com/alciviny)
