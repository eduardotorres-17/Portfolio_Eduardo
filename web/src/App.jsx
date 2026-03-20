import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Send,
  Smartphone,
  Code,
  GraduationCap,
} from "lucide-react";

// --- COMPONENTE: Carrossel Automático para Projetos ---
const ProjectCarousel = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Passa as imagens automaticamente a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full group/carousel overflow-hidden bg-zinc-950/80 flex items-center justify-center">
      <img
        src={images[currentIndex]}
        alt={`Tela ${currentIndex + 1}`}
        onClick={() => onImageClick({ images, index: currentIndex })}
        className="w-full h-full object-contain p-2 transition-opacity duration-500 cursor-pointer hover:scale-105 transition-transform"
        title="Clique para expandir"
      />

      {/* Setas de navegação (aparecem no hover) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-orange-500 text-white p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all border border-zinc-700 z-10"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-orange-500 text-white p-1.5 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all border border-zinc-700 z-10"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicadores (Bolinhas) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 pointer-events-none">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-orange-500 w-4" : "bg-zinc-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estados da API
  const [dados, setDados] = useState(null);
  const [formacao, setFormacao] = useState([]);
  const [skills, setSkills] = useState({ hardSkills: [], softSkills: [] });
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado Inteligente para o Modal de Imagem
  const [modalData, setModalData] = useState(null);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = "https://portfolio-eduardo.onrender.com"; 
        // const baseUrl = "http://localhost:3000";

        const [resSobre, resFormacao, resSkills, resProjetos] =
          await Promise.all([
            fetch(`${baseUrl}/api/sobre`),
            fetch(`${baseUrl}/api/formacao`),
            fetch(`${baseUrl}/api/skills`),
            fetch(`${baseUrl}/api/projetos`),
          ]);

        const dadosSobre = await resSobre.json();
        const dadosFormacao = await resFormacao.json();
        const dadosSkills = await resSkills.json();
        const dadosProjetos = await resProjetos.json();

        // O Front-end agora apenas recebe e seta os dados. Limpo e direto!
        setDados(dadosSobre);
        setFormacao(dadosFormacao);
        setSkills(dadosSkills);
        setProjetos(dadosProjetos);
      } catch (error) {
        console.error("Erro ao conectar com a API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    }).then((response) => {
      if (response.ok) {
        setFormStatus("Mensagem enviada com sucesso! 🚀");
        form.reset();
      } else {
        setFormStatus("Ocorreu um erro. Tente novamente.");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-orange-500">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!dados)
    return (
      <div className="text-white text-center mt-20">
        Erro ao carregar dados da API.
      </div>
    );

  const menuItems = [
    "Sobre",
    "Formação",
    "Habilidades",
    "Projetos",
    "Experiência",
    "Contato",
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-white relative">
      
      {modalData && (
        <div 
          className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setModalData(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 bg-zinc-900/80 hover:bg-orange-500 text-white rounded-full transition-colors border border-zinc-700 hover:border-orange-500 z-50 shadow-lg"
            onClick={() => setModalData(null)}
          >
            <X size={28} />
          </button>

          {modalData.images.length > 1 && (
            <button
              className="absolute left-4 md:left-10 p-3 bg-zinc-900/80 hover:bg-orange-500 text-white rounded-full transition-colors border border-zinc-700 hover:border-orange-500 z-50 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setModalData(prev => ({
                  ...prev,
                  index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1
                }));
              }}
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <img 
            src={modalData.images[modalData.index]} 
            alt="Imagem Expandida do Projeto" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-zinc-800"
            onClick={(e) => e.stopPropagation()} 
          />

          {modalData.images.length > 1 && (
            <button
              className="absolute right-4 md:right-10 p-3 bg-zinc-900/80 hover:bg-orange-500 text-white rounded-full transition-colors border border-zinc-700 hover:border-orange-500 z-50 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setModalData(prev => ({
                  ...prev,
                  index: prev.index === prev.images.length - 1 ? 0 : prev.index + 1
                }));
              }}
            >
              <ChevronRight size={32} />
            </button>
          )}
        </div>
      )}

      <nav className="fixed w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 shadow-lg shadow-orange-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-bold text-2xl text-orange-500 tracking-tighter cursor-pointer hover:text-white transition-colors">
              &lt;Eduardo /&gt;
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {menuItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-orange-500 transition-colors px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-900/50"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-zinc-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-zinc-800 hover:text-orange-500"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section
        id="sobre"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-zinc-950 to-zinc-950"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 text-sm font-semibold mb-6 animate-pulse">
              Bem-vindo ao meu portfólio
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Eu sou <span className="text-orange-500">{dados.nome}</span>
              <br />
              <span className="text-2xl md:text-4xl text-zinc-400 font-normal">
                {dados.cargo}
              </span>
            </h1>
            <p className="text-lg text-zinc-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              {dados.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#projetos"
                className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(234,88,12,0.3)] flex items-center justify-center gap-2"
              >
                Ver Projetos <ChevronDown size={20} />
              </a>
              <a
                href="#contato"
                className="px-8 py-3 border border-zinc-700 hover:border-orange-500 hover:text-orange-500 rounded-full font-bold transition-all bg-zinc-900/50 backdrop-blur-sm"
              >
                Entrar em Contato
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <img
                src="/perfil.jpg"
                alt="Foto de Perfil"
                className="relative w-full h-full object-cover rounded-full border-4 border-zinc-900 shadow-2xl ring-2 ring-orange-500/50"
                onError={(e) => {
                  e.target.src = "https://github.com/eduardobtorres.png";
                }}
              />
              <div
                className="absolute -bottom-4 -left-4 bg-zinc-900/90 backdrop-blur border border-zinc-800 p-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Smartphone className="text-green-500" size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Foco atual</p>
                  <p className="text-sm font-bold text-white">
                    Busco oportunidades
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="formação"
        className="py-20 bg-zinc-900/30 border-t border-zinc-800"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 border-l-4 border-orange-500 pl-4">
            Formação Acadêmica
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {formacao.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900 rounded-xl group-hover:bg-orange-600 transition-colors">
                    <GraduationCap
                      className="text-orange-500 group-hover:text-white"
                      size={32}
                    />
                  </div>
                  <div>
                    <span className="text-orange-500 text-sm font-bold tracking-wider uppercase mb-1 block">
                      {item.nivel}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.curso}
                    </h3>
                    <h4 className="text-zinc-400 font-medium mb-4">
                      {item.instituicao}
                    </h4>
                    <p className="text-zinc-500 text-sm leading-relaxed border-t border-zinc-900 pt-4">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="habilidades"
        className="py-20 bg-zinc-950 border-t border-zinc-900/50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 border-l-4 border-orange-500 pl-4">
            Arsenal Tecnológico
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-zinc-300 flex items-center gap-2">
                <Code className="text-orange-500" /> Hard Skills
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {skills.hardSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group bg-zinc-900 p-4 rounded-xl border border-zinc-800 hover:border-orange-500/50 transition-all hover:-translate-y-1 flex flex-col items-center justify-center gap-3"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-10 h-10 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm font-medium text-zinc-400 group-hover:text-white">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-zinc-300 flex items-center gap-2">
                <CheckCircle2 className="text-orange-500" /> Soft Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.softSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-3 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50 hover:bg-zinc-900 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                    <span className="text-zinc-300 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJETOS --- */}
      <section id="projetos" className="py-20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 border-l-4 border-orange-500 pl-4">
            Projetos Recentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetos.map((projeto) => (
              <div
                key={projeto.id}
                className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all group flex flex-col shadow-lg hover:shadow-orange-500/10"
              >
                {/* ÁREA DA IMAGEM / CARROSSEL */}
                <div className="h-60 bg-zinc-800 relative overflow-hidden group/img flex items-center justify-center">
                  {projeto.imagensApp ? (
                    <ProjectCarousel 
                      images={projeto.imagensApp} 
                      onImageClick={setModalData} 
                    />
                  ) : projeto.imagem ? (
                    <>
                      <img
                        src={projeto.imagem}
                        alt={projeto.titulo}
                        onClick={() => setModalData({ images: [projeto.imagem], index: 0 })}
                        title="Clique para expandir"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 cursor-pointer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Code
                        size={48}
                        className="text-zinc-600 group-hover:text-orange-500 transition-colors"
                      />
                    </div>
                  )}
                </div>

                {/* INFO DO PROJETO */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                    {projeto.titulo}
                  </h3>
                  {projeto.techs && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {projeto.techs.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-zinc-800 text-orange-400 rounded border border-zinc-700 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Descrição Justificada */}
                  <p className="text-zinc-400 text-sm mb-6 flex-1 text-justify">
                    {projeto.descricao}
                  </p>
                  <a
                    href={projeto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-white bg-orange-600 hover:bg-orange-700 py-2.5 px-4 rounded-lg font-bold text-sm transition-colors w-full mt-auto"
                  >
                    Acessar Projeto <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIÊNCIA --- */}
      <section id="experiência" className="py-20 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 border-l-4 border-orange-500 pl-4">
            Jornada Profissional
          </h2>
          <div className="space-y-12">
            {dados.experiencia.map((exp, index) => (
              <div key={index} className="relative pl-8 md:pl-0">
                <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2"></div>
                <div
                  className={`md:flex items-center justify-between ${index % 2 === 0 ? "flex-row-reverse" : ""} gap-12`}
                >
                  <div className="hidden md:block w-1/2 relative">
                    <div
                      className={`absolute top-6 w-4 h-4 bg-orange-500 rounded-full border-4 border-zinc-950 shadow-[0_0_15px_rgba(249,115,22,0.8)] z-10 ${index % 2 === 0 ? "-left-[26px]" : "-right-[26px]"}`}
                    ></div>
                    <div
                      className={`text-orange-500 font-mono font-bold ${index % 2 === 0 ? "text-left" : "text-right"}`}
                    >
                      {exp.ano}
                    </div>
                  </div>
                  <div className="md:hidden absolute left-0 top-2 w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                  <div className="md:hidden text-orange-500 font-mono text-sm mb-1">
                    {exp.ano}
                  </div>
                  <div className="md:w-1/2 bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-orange-500/30 transition-all hover:-translate-y-1 shadow-lg">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {exp.cargo}
                    </h3>
                    <h4 className="text-zinc-400 text-sm mb-3 font-medium uppercase tracking-wider">
                      {exp.empresa}
                    </h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTATO --- */}
      <section
        id="contato"
        className="py-20 bg-gradient-to-t from-orange-900/10 to-zinc-950"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Vamos Conversar?</h2>
            <p className="text-xl text-zinc-400">
              Tem uma ideia de projeto ou quer bater um papo sobre tecnologia?
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Conecte-se comigo
              </h3>
              <div className="flex gap-4">
                {dados.telefone && (
                  <a
                    href={`https://wa.me/${dados.telefone}?text=Olá Eduardo, vi seu portfólio e gostaria de conversar!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-zinc-900 rounded-xl text-zinc-300 hover:text-white hover:bg-green-600 transition-all border border-zinc-800 hover:scale-110"
                    title="WhatsApp"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                )}
                <a
                  href="https://github.com/eduardotorres-17"
                  target="_blank"
                  className="p-4 bg-zinc-900 rounded-xl text-zinc-300 hover:text-white hover:bg-orange-600 transition-all border border-zinc-800 hover:scale-110"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/eduardo-bertinetti-torres-a90a73275/"
                  target="_blank"
                  className="p-4 bg-zinc-900 rounded-xl text-zinc-300 hover:text-white hover:bg-orange-600 transition-all border border-zinc-800 hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:eduardobtorres17@gmail.com"
                  className="p-4 bg-zinc-900 rounded-xl text-zinc-300 hover:text-white hover:bg-orange-600 transition-all border border-zinc-800 hover:scale-110"
                >
                  <Mail size={24} />
                </a>
              </div>
              <p className="text-zinc-500 mt-8 text-sm leading-relaxed">
                Estou disponível para trabalhos freelancer e oportunidades CLT.
              </p>
            </div>
            <form
              action="https://formspree.io/f/xbdgldvr"
              method="POST"
              onSubmit={handleSubmit}
              className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-400 mb-1"
                  >
                    Seu E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="exemplo@email.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-400 mb-1"
                  >
                    Sua Mensagem
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    required
                    placeholder="Olá Eduardo..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                  ></textarea>
                </div>
                <input
                  type="hidden"
                  name="_subject"
                  value="Novo contato do Portfólio!"
                />
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/20"
                >
                  Enviar Mensagem <Send size={18} />
                </button>
                {formStatus && (
                  <p className="text-center text-sm text-green-400 mt-2 animate-pulse">
                    {formStatus}
                  </p>
                )}
              </div>
            </form>
          </div>
          <footer className="mt-20 pt-8 border-t border-zinc-800 text-center text-zinc-600 text-sm">
            <p>
              &copy; 2026 Eduardo Bertinetti Torres. Desenvolvido com{" "}
              <span className="text-orange-500">React & Express</span>.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default App;