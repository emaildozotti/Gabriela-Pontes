import React, { useState } from 'react';
import { Play, Check, ChevronDown, ChevronUp, MessageCircle, Clock, Heart } from 'lucide-react';
import { COPY } from './constants';
import { FadeIn } from './components/FadeIn';
import { Button } from './components/Button';

// ----------------------------------------------------------------------------
// Sub-components (Internal to App to keep file count low per instructions, 
// but clean due to separation of concerns)
// ----------------------------------------------------------------------------

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden ${className}`}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-300 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
      >
        <span className="text-lg md:text-xl font-serif text-stone-800 group-hover:text-stone-600 transition-colors">
          {question}
        </span>
        <span className="text-stone-500 ml-4">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-stone-600 font-light leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------------

const App: React.FC = () => {

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "554896740170";
    const text = "Olá Gabriela, vi seu site e gostaria de saber mais sobre seu processo de psicoterapia.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const formatText = (text: string) => {
    const parts = text.split(/(==.*?==)/g);
    return parts.map((part, i) => {
      if (part.startsWith('==') && part.endsWith('==')) {
        return <span key={i} className="premium-highlight">{part.slice(2, -2)}</span>;
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 selection:bg-stone-200 selection:text-stone-900">

      {/* 1. HERO HEADER */}
      <header id="hero" className="relative min-h-[90vh] flex items-center bg-stone-50 overflow-hidden py-12 md:py-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Column: Text Content */}
            <div className="space-y-8 md:space-y-10 text-left">
              <FadeIn delay={0.2} direction="right">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-stone-900">
                  {formatText(COPY.header.headline)}
                </h1>
              </FadeIn>

              <FadeIn delay={0.4} direction="right">
                <p className="text-lg md:text-xl font-light text-stone-700 max-w-xl leading-relaxed">
                  {formatText(COPY.header.subheadline)}
                </p>
              </FadeIn>

              <FadeIn delay={0.6} direction="right">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => scrollToSection('pain-points')} className="shadow-lg shadow-stone-200">
                    {COPY.header.cta}
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Key Image */}
            <div className="flex justify-center">
              <FadeIn delay={0.4} direction="left" className="relative w-full max-w-lg">
                {/* Decorative element */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-stone-200/50 rounded-full -z-10 blur-2xl"></div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-stone-100/80 rounded-full -z-10 blur-xl"></div>

                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 bg-white p-2 md:p-3">
                  <img
                    src="https://i.imgur.com/2KtKCFa.jpeg"
                    alt="Gabriela Salum Pontes"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>

                {/* Authority Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white px-6 py-4 rounded-lg shadow-xl border border-stone-100 hidden lg:block">
                  <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">Psicóloga Clínica</p>
                  <p className="text-stone-900 font-serif text-sm">Gabriela Salum Pontes</p>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </header>

      {/* 2. PAIN POINTS */}
      <Section id="pain-points" className="bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-8">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-snug">
                {formatText(COPY.painPoints.title)}
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="text-lg md:text-xl text-stone-600 font-light">
                {formatText(COPY.painPoints.intro)}
              </p>

              <div className="max-w-xl mx-auto text-left mt-10 mb-12">
                <ul className="space-y-6">
                  {COPY.painPoints.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="p-1.5 rounded-full bg-stone-100 text-stone-500 mt-1 shrink-0">
                        <Check size={16} />
                      </span>
                      <span className="text-stone-700 text-lg font-light leading-relaxed">{formatText(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="max-w-2xl mx-auto">
                <p className="text-stone-800 text-xl font-medium italic border-t border-stone-100 pt-8">
                  {formatText(COPY.painPoints.conclusion)}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* 3. VIDEO SECTION */}
      <Section id="video" className="bg-stone-900 py-24 text-center">
        <div className="max-w-xl mx-auto space-y-12">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-12 leading-tight">
              Se existe algo em você que já não cabe mais no silêncio, <span className="italic">assista agora.</span>
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="shadow-2xl rounded-lg overflow-hidden border border-stone-800">
              <div dangerouslySetInnerHTML={{
                __html: `
                <wistia-player media-id="b40zvo7loh" aspect="0.5660377358490566">
                  <div class="wistia_preload_transcript_outer_wrapper" style="width: 100%; height: 100%; display:flex; justify-content:center; align-items: center; margin-top:-176.67%;">
                    <div class="wistia_preload_transcript_inner_wrapper" style=" overflow: auto;">
                      <p class="wistia_preload_transcript_text" aria-hidden="true" tabindex="-1" style="text-align: justify; font-size: 5px !important;">
                        Olá, se você chegou até aqui é porque existe algo que não cabe mais no silêncio. Eu sou Gabriela Salon Pontes, psicóloga clínica, e eu sei que muitas vezes o passo mais difícil não é o de caminhar, é o de reconhecer que você não precisa mais seguir sozinho. Ao longo da minha vida, eu compreendi profundamente o que significa o medo de se expor. Entendo o peso de tentar ser forte, enquanto por dentro a insegurança e o cansaço gritam. Minha trajetória me ensinou que o silêncio dói, mas ele também pode ser o início de uma grande mudança. No meu consultório, você não encontrará promessas mágicas ou soluções rápidas. A psicologia que eu pratico é fundamentada na ciência, na ética e acima de tudo na presença real. Aqui o seu tempo é respeitado. Suas fragilidades não são julgadas, são acolhidas. Trabalharemos juntos para que você possa se escutar de verdade, para que você aprenda a construir seus próprios limites e recupere a confiança em quem você é. A terapia é processo de coragem, é a escolha diária de olhar para si com mais gentileza e verdade. Se você sente que chegou o momento de cuidar da sua história com a profundidade que ela merece, eu estou aqui para sustentar esse caminho com você, no seu ritmo, com ética e cuidado. Toque no botão abaixo quando estiver pronto para conversarmos. Será privilégio receber a sua confiança.
                      </p>
                    </div>
                  </div>
                </wistia-player>
              ` }} />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 4. METHODOLOGY */}
      <Section id="methodology" className="bg-stone-100">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">
              {formatText(COPY.methodology.title)}
            </h2>
            <p className="text-stone-600 font-light text-lg">
              {formatText(COPY.methodology.text)}
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {COPY.methodology.pillars.map((pillar, idx) => (
            <FadeIn key={idx} delay={idx * 0.2} direction="up" className="bg-white p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow duration-300 border-t-2 border-transparent hover:border-stone-800">
              <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-stone-800">
                {idx === 0 && <MessageCircle size={24} strokeWidth={1.5} />}
                {idx === 1 && <Clock size={24} strokeWidth={1.5} />}
                {idx === 2 && <Heart size={24} strokeWidth={1.5} />}
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-stone-900">{formatText(pillar.title)}</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                {formatText(pillar.description)}
              </p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 5. ABOUT */}
      <Section id="about" className="bg-white">
        <div className="grid md:grid-cols-12 gap-12 items-center">

          <div className="md:col-span-7 order-2 md:order-1 space-y-6">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-8">
                {formatText(COPY.about.title)}
              </h2>
              <div className="space-y-6">
                {COPY.about.paragraphs.map((para, i) => (
                  <p key={i} className="text-stone-600 text-lg font-light leading-relaxed">
                    {formatText(para)}
                  </p>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-5 order-1 md:order-2">
            <FadeIn direction="left">
              <div className="relative p-4 border border-stone-200">
                <div className="absolute top-0 right-0 w-full h-full bg-stone-50 transform translate-x-4 -translate-y-4 -z-10"></div>
                <img
                  src="https://i.imgur.com/638lEWk.jpeg"
                  alt="Gabriela Salum Pontes"
                  className="w-full h-auto object-cover shadow-xl"
                />
              </div>
            </FadeIn>
          </div>

        </div>
      </Section>

      {/* 6. HOW IT WORKS */}
      <Section id="how-it-works" className="bg-stone-900 text-stone-200">
        <FadeIn className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white text-center">
            {formatText(COPY.howItWorks.title)}
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-stone-700 -z-10 transform -translate-y-1/2"></div>

          {COPY.howItWorks.steps.map((step, idx) => (
            <FadeIn key={idx} delay={idx * 0.2} direction="up" className="relative bg-stone-900 p-4">
              <div className="w-12 h-12 bg-stone-800 border border-stone-600 text-white rounded-full flex items-center justify-center text-xl font-serif mb-6 mx-auto relative z-10">
                {idx + 1}
              </div>
              <h3 className="text-xl font-serif text-white text-center mb-4">{formatText(step.title)}</h3>
              <p className="text-stone-400 font-light text-center leading-relaxed text-sm">
                {formatText(step.desc)}
              </p>
            </FadeIn>
          ))}
        </div>

      </Section>

      {/* 7. FAQ */}
      <Section id="faq" className="bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              {formatText(COPY.faq.title)}
            </h2>
          </FadeIn>

          <div className="space-y-2">
            {COPY.faq.items.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} direction="up">
                <AccordionItem question={formatText(item.question) as any} answer={formatText(item.answer) as any} />
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* 8. CTA */}
      <Section id="final-cta" className="bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight">
              {formatText(COPY.finalCta.title)}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <p className="text-lg md:text-xl font-light text-stone-600">
              {formatText(COPY.finalCta.text)}
            </p>
          </FadeIn>
          <FadeIn delay={0.4} direction="up">
            <Button onClick={handleWhatsAppClick} className="shadow-2xl shadow-stone-300 scale-105">
              {COPY.finalCta.button}
            </Button>
          </FadeIn>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-stone-100 py-12 border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-stone-500 text-sm font-light">
          <p>© {new Date().getFullYear()} Gabriela Salum Pontes. Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0 flex gap-6">
            <a href="#" className="hover:text-stone-800 transition-colors">Instagram</a>
            <a href="#" className="hover:text-stone-800 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
