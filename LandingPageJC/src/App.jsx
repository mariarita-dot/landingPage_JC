import { useState, useEffect, useRef } from "react";
import "./App.css";
import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import img4 from './assets/img4.png';
import img5 from './assets/img5.png';
import img6 from './assets/img6.png';
import img7 from './assets/img7.png';

// ── HOOK: scroll reveal ──────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── NAV ──────────────────────────────────────────────────────────────────────
// ── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = [
    { label: "Início",       id: "inicio"    },
    { label: "Serviços",     id: "sobre-nos"  },
    { label: "Sobre nós",    id: "sobrenos" },
    { label: "Contato",      id: "contato"   },
  ];

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="nav__brand">
        <span className="nav__logo">JC</span>
        <div className="nav__brand-text">
          <span className="nav__title">Raspagem de Tacos e Assoalhos</span>
        </div>
      </div>

      <ul className={`nav__links${open ? " nav__links--open" : ""}`}>
        {navItems.map(({ label, id }) => (
          <li key={id}>
            <button onClick={() => scroll(id)}>{label}</button>
          </li>
        ))}
      </ul>

      <div className="nav__end">
        <button className="nav__cta btn" onClick={() => scroll("contato")}>
          Entre em contato
        </button>
        <button className="nav__burger" onClick={() => setOpen(!open)} aria-label="menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="inicio">
      <img className="hero__bg" src={img1} alt="piso de madeira" />
      <div className="hero__content">
        <h1 className="hero__title">
          O poder da beleza<br />
          <em>está sob os seus pés.</em>
        </h1>
      </div>
    </section>
  );
}

// ── WHY US ────────────────────────────────────────────────────────────────────
const reasons = [
  {
    n: "01",
    title: "Devolvemos a vida ao seu piso de madeira",
    desc: "Com produtos de sua escolha, desde produtos nacionais até produtos importados de alta qualidade.",
  },
  {
    n: "02",
    title: "Tradição e inovação para um piso impecável.",
    desc: "Trabalhando na área a mais de 30 anos, valorizando resultados duradouros e acabamento de excelência.",
  },
  {
    n: "03",
    title: "Atendimento personalizado e pontual.",
    desc: "Cada piso é único. Adaptamos nosso trabalho ao seu espaço, prazo e orçamento.",
  },
];

function WhyUs() {
  const [ref, visible] = useReveal();
  return (
    <section className="why" id="sobre-nos" ref={ref}>
      <div className={`why__inner${visible ? " why__inner--visible" : ""}`}>
        <div className="why__left">
          <p className="section-tag">Por que restaurar</p>
          <h2 className="section-title">
            seu piso <span className="accent">Conosco?</span>
          </h2>
          <div className="why__reasons">
            {reasons.map((r) => (
              <div className="why__reason" key={r.n}>
                <span className="why__num">{r.n}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="why__gallery">
          <img className="why__photo why__photo--1" src={img2} alt="piso de madeira" />
          <img className="why__photo why__photo--2" src={img3} alt="piso de madeira2" />
          <div className="why__badge">
            <strong>+30</strong>
            <span>anos de<br />experiência</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutUs() {
  const [ref, visible] = useReveal();
  return (
    <section className="about" ref={ref} id="sobrenos">
      <div className={`about__inner${visible ? " about__inner--visible" : ""}`}>
        {/* Lado esquerdo — texto escuro */}
        <div className="about__left">
          <h2 className="about__title">SOBRE NÓS</h2>
          <div className="about__line" />
          <p className="about__text">
            Com mais de 30 anos de experiência, restauramos pisos de madeira com excelência e produtos de alta qualidade.
          </p>
          <p className="about__text">
            Nosso compromisso é devolver a beleza e o valor do seu piso, oferecendo serviços sob medida para cada cliente. Tradição, inovação e paixão em cada projeto.
          </p>
        </div>

        {/* Lado direito — imagem */}
        <div className="about__img-wrapper">
          <img src={img7} alt="nosso trabalho" />
        </div>
      </div>

      {/* Cards de serviços */}
      <div className="about__cards">
        {[
          { title: "Pisos de Madeira", desc: "Restauração e colocação de pisos" },
          { title: "Assoalhos", desc: "Utilizando produtos internacionais e nacionais, com base na sua escolha" },
          { title: "Decks de Piscina", desc: "Trabalhando com base em suas escolhas que cabem no bolso" },
          { title: "Atuação na Baixada Santista e Região", desc: "Trabalhamos em toda a baixada santista e Regiões de São Paulo" },
        ].map((c) => (
          <div className="about__card" key={c.title}>
            <span className="about__card-dot" />
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Frase final */}
      <div className="about__quote">
        <p>Cada piso, um projeto único.<br />Cada restauração, um novo começo.</p>
        <div className="about__stars">★★★★★</div>
      </div>
    </section>
  );
}

function Services() {
  const [ref, visible] = useReveal();
  return (
    <section className="services" id="servicos" ref={ref}>
      <div className={`services__inner${visible ? " services__inner--visible" : ""}`}>
        <p className="section-tag">Nosso Trabalho</p>
        <h2 className="section-title">A Melhor <span className="accent">Escolha</span></h2>
        <p className="services__subtitle">Feito com os melhores produtos que cabem no seu bolso</p>
        <div className="services__photos">
          <img src={img4} alt="trabalho 1" />
          <img src={img5} alt="trabalho 2" />
          <img src={img6} alt="trabalho 3" />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const [ref, visible] = useReveal();
  const stats = [
    { n: "30+", label: "Anos de experiência" },
    { n: "500+", label: "Serviços concluídos" },
    { n: "100%", label: "Satisfação garantida" },
    { n: "24h", label: "Resposta ao orçamento" },
  ];
  return (
    <section className="stats" ref={ref}>
      <div className={`stats__grid${visible ? " stats__grid--visible" : ""}`}>
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <strong>{s.n}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [ref, visible] = useReveal();
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    mensagem: "Olá, vim pelo site e gostaria de marcar um orçamento.",
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Meu nome é ${form.nome}.\nTelefone: ${form.telefone}\n\n${form.mensagem}`
    );
    window.open(`https://wa.me/5513996915992?text=${msg}`, "_blank");
    setSent(true);
  };
  return (
    <section className="contact" id="contato" ref={ref}>
      <div className={`contact__inner${visible ? " contact__inner--visible" : ""}`}>
        <div className="contact__info">
          <p className="section-tag">Fale conosco</p>
          <h2 className="section-title">
            Solicite seu<br /><span className="accent">Orçamento</span>
          </h2>
          <p className="contact__desc">
            Atendemos toda a região. Entre em contato e receba uma avaliação gratuita do seu piso.
          </p>
          <div className="contact__details">
            <a href="tel:+5513996915992">📞 (13) 99691-5992</a>
            <a href="mailto:jc@raspagem.com.br">✉️ jhonnyraspador@gmail.com</a>
            <span>📍 Santos e região, SP</span>
          </div>
        </div>
        <form className="contact__form" onSubmit={submit}>
          {sent ? (
            <div className="contact__success">
              <span>✅</span>
              <p>Redirecionando para o WhatsApp…</p>
              <button className="btn btn--primary" onClick={() => setSent(false)}>
                Novo contato
              </button>
            </div>
          ) : (
            <>
              <label>
                Nome completo
                <input name="nome" value={form.nome} onChange={handle} required placeholder="Seu nome" />
              </label>
              <label>
                Telefone / WhatsApp
                <input name="telefone" value={form.telefone} onChange={handle} required placeholder="(13) 9 0000-0000" />
              </label>
              <label>
                Mensagem
                <textarea name="mensagem" value={form.mensagem} onChange={handle} rows={4}
                  placeholder="Descreva o seu piso e o serviço desejado…" />
              </label>
              <button className="btn btn--primary" type="submit">
                Enviar pelo WhatsApp →
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="nav__logo">JC</span>
          <p>Raspagem de Tacos e Assoalhos<br />Santos, SP</p>
        </div>
        <nav className="footer__links">
          {["Início", "Serviços", "Sobre nós", "Contato"].map((l) => (
            <button key={l}
              onClick={() => document.getElementById(
                l.toLowerCase().replace(" ", "-").replace("ó","o").replace("í","i")
              )?.scrollIntoView({ behavior: "smooth" })}>
              {l}
            </button>
          ))}
        </nav>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} JC Raspagem de Tacos e Assoalhos. Todos os direitos reservados.</p>
    </footer>
  );
}

// ── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <AboutUs />  
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}