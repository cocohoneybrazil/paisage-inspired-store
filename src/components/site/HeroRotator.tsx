import { useEffect, useState } from "react";
import banner from "@/assets/coco-head.jpg";
import lettering from "@/assets/coco-lettering-desk.jpg";

/**
 * Cada arte tem um fundo diferente, e a faixa usa object-contain: em tela larga
 * sobra barra dos dois lados. A cor aqui é a do próprio arquivo, lida pixel a
 * pixel na borda — sem isso aparece uma emenda no lugar onde a arte acaba.
 */
const slides = [
  {
    src: banner,
    bg: "#24A8E5",
    alt: "Coco Honey Bronze em dose tripla — Pack 003 com 10% OFF, frete grátis e Sun Bag CHB",
    label: "Pack 003 em dose tripla",
  },
  {
    src: lettering,
    bg: "#DEE5ED",
    alt: "COCO HONEY — ingredientes naturais, vegano, cruelty-free, dermatologicamente testado",
    label: "A marca",
  },
] as const;

const INTERVAL = 3000;

/**
 * Herói rotativo do desktop. No celular quem manda é o vídeo, então este bloco
 * só existe a partir de sm.
 *
 * Duas regras de educação que a troca automática exige: ela para enquanto o
 * mouse está em cima, para ninguém perder a leitura no meio, e não roda para
 * quem pediu menos movimento no sistema — aí fica o primeiro quadro parado, e
 * os botões continuam trocando a arte a pedido.
 */
export function HeroRotator() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (calm.matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="absolute inset-0 hidden sm:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none"
          style={{ backgroundColor: slide.bg, opacity: i === index ? 1 : 0 }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            loading="eager"
            fetchPriority={i === 0 ? "high" : "low"}
            className="h-full w-full object-contain object-center"
          />
        </div>
      ))}

      <div className="absolute bottom-8 left-6 flex items-center gap-2.5 md:left-12">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ver ${slide.label}`}
            aria-current={i === index}
            className="h-1.5 rounded-full bg-foreground transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            style={{ width: i === index ? "1.75rem" : "0.375rem", opacity: i === index ? 0.9 : 0.35 }}
          />
        ))}
      </div>
    </div>
  );
}
