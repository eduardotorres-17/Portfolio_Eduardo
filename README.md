# 👨‍💻 Portfólio de Desenvolvedor - Eduardo

> Um portfólio dinâmico e responsivo, focado em performance e boas práticas de arquitetura de software, construído com React e alimentado por uma API RESTful dedicada.

![Status do Projeto](https://img.shields.io/badge/Status-Produção-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![API REST](https://img.shields.io/badge/API_REST-FF424D?style=for-the-badge&logo=json&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## 🌐 Links do Projeto
- **Front-end (Aplicação Live):** https://portfolio-eduardo-torres.vercel.app/
- **Back-end (API Base URL):** https://portfolio-eduardo.onrender.com/
  
## 💡 A Arquitetura: Por que uma API separada?

Em vez de criar um portfólio estático com os dados fixos (hardcoded) no código front-end, optei por uma abordagem de **Arquitetura Desacoplada** (Client-Server). 

A aplicação React consome dados dinâmicos de uma API construída especificamente para este projeto. Essa decisão técnica traz vantagens fundamentais:

1. **Separação de Responsabilidades (Separation of Concerns):** O front-end fica focado exclusivamente na Interface do Usuário (UI), Experiência (UX) e tratamento de estados. O back-end cuida da regra de negócio e fornecimento dos dados.
2. **Manutenção Ágil:** Quando preciso adicionar um novo projeto, atualizar minha bio ou alterar uma tecnologia no currículo, não preciso fazer um novo *deploy* do front-end. Basta atualizar a base de dados da API e o site reflete a mudança instantaneamente.
3. **Escalabilidade:** A mesma API que alimenta este portfólio web pode, no futuro, alimentar um aplicativo mobile ou um terminal CLI.
4. **Demonstração de Competência Full Stack:** O consumo de dados assíncronos (`fetch`/`axios`), tratamento de estados de carregamento (`loading`), e a gestão de possíveis falhas na requisição mostram o domínio sobre cenários reais de desenvolvimento.

## 🛠️ Stack Tecnológico e Infraestrutura

O projeto foi dividido e hospedado utilizando os melhores serviços de nuvem modernos para garantir alta disponibilidade e integração contínua (CI/CD).

### Front-end
- **Tecnologia:** React.js
- **Estilização:** [Insira aqui, ex: Tailwind CSS / Styled Components]
- **Hospedagem:** **Vercel** - Escolhida pela integração nativa com o ecossistema React, garantindo *builds* ultrarrápidos e entrega via CDN global.

### Back-end (API)
- **Tecnologia:** [Insira aqui a tech da API, ex: Node.js com Express]
- **Hospedagem:** **Render** - Plataforma PaaS robusta que permite o deploy direto do repositório, mantendo o serviço de back-end estável e escalável.
