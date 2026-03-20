// api/index.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- DADOS ---

const dadosPessoais = {
  nome: "Eduardo Bertinetti Torres",
  cargo: "Full Stack Developer",
  bio: "Apaixonado por tecnologia e desenvolvimento de software. Tecnólogo em Sistemas para Internet, formado pelo IFSul Pelotas. Sempre em busca de novos desafios e aprendizados na área de desenvolvimento web.",
  telefone: "5553984014033",
  experiencia: [
    {
      ano: "Nov 2024 - Atual",
      empresa: "Proenergia",
      cargo: "Projetista Elétrico",
      desc: "Atuando na empresa parceira do Grupo Ceee Equatorial, projetando redes elétricas de média e baixa tensão.",
    },
    {
      ano: "Fev 2024 - Set 2024",
      empresa: "Prefeitura Municipal de Pelotas",
      cargo: "Estagiário de TI",
      desc: "Manutenção de computadores, construção de redes lógicas de internet e suporte técnico em geral.",
    },
    {
      ano: "Dez 2021 - Fev 2024",
      empresa: "Techneer Componentes Metálicos LTDA",
      cargo: "Auxiliar de Produção",
      desc: "Monitoramento de produção e controle de qualidade.",
    },
  ],
};

const formacao = [
  {
    id: 1,
    instituicao: "IFSul - Câmpus Pelotas",
    curso: "Tecnólogo em Sistemas para Internet",
    nivel: "Ensino Superior",
    descricao:
      "Formação focada em desenvolvimento full stack, engenharia de software, redes de computadores, segurança da informação e dispositivos móveis.",
  },
  {
    id: 2,
    instituicao: "IFSul - Câmpus Pelotas",
    curso: "Técnico em Eletrotécnica",
    nivel: "Ensino Técnico",
    descricao:
      "Capacitação em projetos elétricos, sistemas de potência, automação industrial e eficiência energética.",
  },
];

const skills = {
  hardSkills: [
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "React.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "React Native",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "Spring",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    },
    {
      name: "Laravel",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
  ],
  softSkills: [
    "Proativo",
    "Comunicativo",
    "Trabalho em Equipe",
    "Resolução de Problemas",
    "Adaptabilidade",
    "Gestão de Tempo",
    "Autonomia",
    "Criatividade",
    "Aprendizado Continuo",
    "Responsabilidade Pessoal",
  ],
};

const projetos = [
  {
    id: "tecnope",
    titulo: "Tecnopé - Sistema de Gestão Clínica (SaaS)",
    descricao:
      "Plataforma Full Stack desenvolvida para automatizar o agendamento de consultas. Conta com gerador inteligente de vagas (Time Slots) para evitar double booking, gestão completa de status da consulta e painel administrativo protegido por JWT.",
    link: "https://tecnope-web.vercel.app/",
    imagem: "/tecnope.jpg",
    techs: ["React", "Supabase", "PostgreSQL", "Tailwind"],
  },
  {
    id: "encurtador-url",
    titulo: "Encurtador de URL Serverless",
    descricao:
      "Aplicação Full Stack moderna para encurtamento de links. Conta com redirecionamento ultrarrápido, dashboard de cliques em tempo real, UI vibrante em Dark/Neon e arquitetura Serverless.",
    link: "https://encurtador-url-vert.vercel.app/",
    imagem: "/encurtador.jpg",
    techs: ["React", "Node.js", "MongoDB", "Tailwind", "Vercel"],
  },
  {
    id: "biketracker",
    titulo: "BikeTracker",
    descricao:
      "Aplicação mobile desenvolvida para ciclistas registrarem e monitorarem suas atividades, rotas e desempenho em tempo real.",
    link: "https://github.com/eduardotorres-17/BikeTracker-Aplicativo-TCC.git",
    imagem: "/LogoBikeTracker.jpg",
    imagensApp: [
      "/biketracker-1.jpg",
      "/biketracker-2.jpg",
      "/biketracker-3.jpg",
      "/biketracker-4.jpg",
    ],
    techs: ["React Native", "Firebase", "Mapbox API"],
  },
];

// --- ENDPOINTS ---

app.get("/", (req, res) => {
  res.send("API Eduardo Torres - Online 🚀");
});

app.get("/api/sobre", (req, res) => {
  res.json(dadosPessoais);
});

app.get("/api/formacao", (req, res) => {
  res.json(formacao);
});

app.get("/api/skills", (req, res) => {
  res.json(skills);
});

app.get("/api/projetos", (req, res) => {
  res.json(projetos);
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta http://localhost:${PORT}`);
});
