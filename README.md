# Talent Guard - Global Solution 2025/2 🚀

![Talent Guard Logo](https://via.placeholder.com/800x200?text=Talent+Guard+Banner)


> **"TalentGuard AI: Visão preditiva. Retenção estratégica. Equidade para todos."**

Este projeto foi desenvolvido como parte da avaliação **Global Solution - O Futuro do Trabalho** (2025/2) para a disciplina de **Front-End Design Engineering** da FIAP.

A solução consiste em uma plataforma de RH impulsionada por IA para analisar a "saúde de carreira" dos colaboradores, prevenindo turnover e garantindo equidade salarial em um mercado de trabalho em constante transformação.

---

## 📋 Sumário

1. [Status do Projeto](#-status-do-projeto)
2. [Sobre o Projeto](#-sobre-o-projeto)
3. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
4. [Instalação](#-instalação)
5. [Como Usar](#-como-usar)
6. [Estrutura de Pastas](#-estrutura-de-pastas)
7. [Endpoints e Rotas](#-endpoints-e-rotas)
8. [Autores e Créditos](#-autores-e-créditos)
9. [Screenshots e Demonstração](#-screenshots-e-demonstração)
10. [Links Importantes](#-links-importantes)
11. [Contato](#-contato)

---

## 🚦 Status do Projeto

✅ **Concluído (Versão 1.0)**

---

## 💡 Sobre o Projeto

O **Talent Guard** é uma resposta aos desafios do *Futuro do Trabalho*. Com a automação e a IA transformando profissões, a retenção de talentos humanos e o desenvolvimento de *soft skills* tornaram-se cruciais.

Nossa aplicação Front-End consome uma API Java (Backend) para fornecer aos gestores de RH:
* **Dashboard de Risco:** Visualização de colaboradores com alto risco de saída.
* **Análise de Sentimento:** Dados processados por IA sobre a satisfação do time.
* **Benchmark Salarial:** Comparação de mercado para garantir justiça financeira.
* **Gestão de Talentos:** Interface CRUD para administração de colaboradores.

A interface foi projetada com foco em **Acessibilidade** e **User Experience (UX)**, utilizando temas Claro/Escuro e design responsivo.

---

## 🛠 Tecnologias Utilizadas

O projeto segue estritamente os requisitos da disciplina, não utilizando frameworks de UI proibidos (como Bootstrap ou Material UI).

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Framework:** [React](https://react.dev/) (v18)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) (Responsividade + Dark Mode)
* **Roteamento:** React Router Dom
* **Gerenciamento de Formulários:** React Hook Form
* **Ícones:** Lucide React
* **Deploy:** Vercel

---
## 💾 Instalação

Pré-requisitos: Certifique-se de ter o **Node.js** e o **NPM** (ou PNPM) instalados em sua máquina.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/3BugBuddies/Talent-Guard-Front.git
   cd talent-guard-frontend


2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto se necessário (exemplo para URL da API):

    ```env
    VITE_API_URL="https://talent-guard-api.onrender.com"
    ```

-----

## 🚀 Como Usar

### Ambiente de Desenvolvimento

Para rodar o projeto localmente:

```bash
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

### Produção (Deploy)

A aplicação está implantada e acessível publicamente através da Vercel no link abaixo:

🔗 **Acesse o Projeto Online:** **(https://talent-guard-front.vercel.app/)**

-----

## 📂 Estrutura de Pastas

A arquitetura do projeto foca em componentização e separação de responsabilidades:

```
talent-guard-frontend/
├── src/
│   ├── assets/          # Imagens e recursos estáticos
│   ├── components/      # Componentes reutilizáveis (Header, Footer, Cards)
│   ├── contexts/        # Context API (Ex: ThemeContext para Dark Mode)
│   ├── pages/           # Páginas da aplicação (Rotas)
│   │   ├── Dashboard/
│   │   ├── Login/
│   │   ├── Colaboradores/
│   │   └── Integrantes/
│   ├── services/        # Integração com a API Java (Axios/Fetch)
│   ├── types/           # Definições de Tipos TypeScript (Interfaces)
│   ├── App.tsx          # Componente Raiz
│   └── main.tsx         # Ponto de entrada
├── public/
├── index.html
├── tailwind.config.js   # Configuração de temas e cores
├── tsconfig.json
└── package.json
```

-----

## 🛣 Endpoints e Rotas

A aplicação é uma SPA (Single Page Application). Abaixo estão as principais rotas do Front-End e sua interação com o Back-End.

### Rotas do Front-End (React Router)

  * `/login` - **Login**: Tela de acesso ao sistema.
  * `/rh-dashboard` - **Home**: Visão geral dos KPIs e gráficos.
  * `/admin` - **Listagem**: Tabela de funcionários (CRUD).
  * `/integrantes` - **Sobre Nós**: Página obrigatória com dados do grupo.

### Integração com API (Backend Java)

Esta aplicação consome uma API RESTful hospedada em *"https://talent-guard-api.onrender.com"*.

  * `GET /api/employees` - Lista todos os colaboradores.
  * `POST /api/employees` - Cria um novo colaborador.
  * `GET /api/dashboard/metrics` - Retorna dados para os gráficos.


-----

## 👥 Autores e Créditos

**Turma: 1TDS - Fevereiro**

*   **Mariana Inoue** RM - 565834
*   **Giovanna Neri** RM - 566154
*   **Gabriel Nogueira** RM - 563925

> *Projeto desenvolvido com apoio dos professores da FIAP.*

-----

## 📸 Screenshots e Demonstração

### 1\. Dashboard (Dark Mode)

*Visão geral com gráficos e KPIs estratégicos.*

### 2\. Gestão de Colaboradores

*Listagem responsiva com ações de editar e excluir.*

### 3\. Página de Integrantes

*Página obrigatória com os dados da equipe.*

-----

## 🔗 Links Importantes

  * **Repositório GitHub:** [ACESSAR REPOSITÓRIO](https://github.com/3BugBuddies/Talent-Guard-Front)
  * **Deploy (Vercel):** [ACESSAR PROJETO ONLINE](https://talent-guard-front.vercel.app/)
  * **Vídeo Pitch (YouTube):** [ASSISTIR VÍDEO](https://www.google.com/search?q=https://youtu.be/SEU_VIDEO)

-----

## 📞 Contato

Caso tenha dúvidas sobre a implementação ou queira fornecer feedbacks:

  * **3bugbuddies@gmail.com**

-----

Copyright © 2025 Talent Guard. All rights reserved.
