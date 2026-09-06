import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, Menu, Search, ShoppingBag, X } from "lucide-react";

import heroImg from "@/assets/coco-human-hero.jpg";
import packImg from "@/assets/coco-honey-bronze-pack-3.png.asset.json";
import duoImg from "@/assets/coco-honey-bronze-duo.png.asset.json";
import singleImg from "@/assets/coco-honey-bronze-single.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COCO Honey Brazil — Tanning Oil" },
      {
        name: "description",
        content:
          "Conheça Coco Honey Bronze, o tanning oil natural e vegano para um bronzeado luminoso e duradouro.",
      },
      { property: "og:title", content: "COCO Honey Brazil — Tanning Oil" },
      {
        property: "og:description",
        content: "A magia brasileira em um tanning oil natural, vegano e resistente à água.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Shop", href: "#best-seller" },
  { label: "Our story", href: "#manifesto" },
  { label: "Journal", href: "#gallery" },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [bagCount, setBagCount] = useState(0);

  const addPack = () => {
    setBagCount((count) => count + 1);
    setBagOpen(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-foreground/15 bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid h-14 max-w-[1600px] grid-cols-3 items-center px-5 md:px-8">
          <button className="justify-self-start md:hidden" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </button>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a key={item.label} href={item.href} className="editorial-label text-foreground/70 hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#top" className="justify-self-center text-sm font-semibold uppercase">COCO</a>
          <div className="flex items-center justify-self-end gap-5">
            <button onClick={() => setSearchOpen((open) => !open)} aria-label="Buscar" className="transition-opacity hover:opacity-55">
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button onClick={() => setBagOpen(true)} aria-label="Abrir sacola" className="relative transition-opacity hover:opacity-55">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {bagCount > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-accent px-1 text-[9px] text-accent-foreground">{bagCount}</span>}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="border-t border-foreground/15 bg-background">
            <input autoFocus aria-label="Buscar produtos" placeholder="O que você procura?" className="mx-auto block w-full max-w-[1600px] bg-transparent px-5 py-4 text-sm outline-none placeholder:text-foreground/40 md:px-8" />
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background px-5">
          <div className="flex h-14 items-center justify-between border-b border-foreground/15">
            <span className="text-sm font-semibold">COCO</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X className="h-5 w-5" /></button>
          </div>
          <nav className="flex flex-col gap-5 pt-12">
            {NAV.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="font-serif text-5xl italic">{item.label}</a>)}
          </nav>
        </div>
      )}

      {bagOpen && (
        <div className="fixed inset-0 z-50">
          <button className="absolute inset-0 w-full bg-foreground/25" onClick={() => setBagOpen(false)} aria-label="Fechar sacola" />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background">
            <div className="flex h-16 items-center justify-between border-b border-foreground/15 px-6">
              <span className="editorial-label">Sua sacola ({bagCount})</span>
              <button onClick={() => setBagOpen(false)} aria-label="Fechar sacola"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
              <ShoppingBag className="h-8 w-8 text-foreground/30" />
              <p className="text-sm text-foreground/60">{bagCount ? `${bagCount} Pack 003 reservado na sua sacola.` : "Sua sacola está vazia — por enquanto."}</p>
            </div>
          </aside>
        </div>
      )}

      <main>
        <section id="top" className="relative min-h-[92svh] overflow-hidden pt-14">
          <img src={heroImg} alt="Retrato em preto e branco para COCO Honey Brazil" width={1600} height={1200} className="absolute inset-0 h-full w-full object-cover object-[58%_center] md:object-center" />
          <div className="absolute inset-0 bg-foreground/5" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-3 text-center">
            <h1 className="crystal-wordmark" aria-label="COCO HONEY BRAZIL">COCOHONEYBRAZIL</h1>
          </div>
          <a href="#best-seller" aria-label="Conhecer o best seller" className="absolute bottom-7 left-1/2 -translate-x-1/2 text-background transition-transform hover:translate-y-1">
            <ArrowDown className="h-6 w-6" />
          </a>
        </section>

        <section id="best-seller" className="grid min-h-screen border-b border-foreground/15 lg:grid-cols-2">
          <div className="min-h-[58svh] overflow-hidden bg-secondary lg:min-h-screen">
            <img src={packImg.url} alt="Pack com três frascos de Coco Honey Bronze" width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
          <div className="flex items-center px-6 py-16 md:px-12 lg:px-16">
            <div className="mx-auto w-full max-w-xl">
              <p className="editorial-label text-accent">Best seller · melhor custo-benefício</p>
              <h2 className="mt-7 text-5xl font-semibold uppercase leading-[0.92] md:text-7xl">Bronze pro<br />verão inteiro</h2>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
                Coco Honey Bronze · óleo acelerador · 3 un · 186ml · 10% OFF + Sun Bag CHB. Três vidros de 62ml para segurar o bronze da primeira praia até o último feriado.
              </p>
              <ul className="mt-8 border-t border-foreground/20 text-sm md:text-base">
                <li className="border-b border-foreground/20 py-4">10% OFF no combo + Sun Bag CHB</li>
                <li className="border-b border-foreground/20 py-4">186ml — cerca de 3 meses de uso</li>
                <li className="border-b border-foreground/20 py-4">Fórmula natural e vegana, sem oxibenzona</li>
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <div><span className="mr-3 text-sm text-muted-foreground line-through">R$ 357,00</span><strong className="text-3xl">R$ 321,30</strong></div>
                <button onClick={addPack} className="ml-auto min-w-56 bg-primary px-7 py-4 text-xs font-semibold uppercase text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Quero o Pack 003</button>
              </div>
            </div>
          </div>
        </section>

        <section id="manifesto" className="grid bg-brand-soft lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex items-center px-6 py-20 md:px-12 lg:px-16 lg:py-28">
            <div className="mx-auto max-w-xl">
              <p className="editorial-label text-accent">Tanning oil · 62 ml</p>
              <h2 className="mt-6 text-5xl font-semibold uppercase leading-none md:text-7xl">Coco Honey Bronze</h2>
              <p className="script-line mt-6">The secret ingredients always love</p>
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                <p>O nosso tanning oil é um óleo acelerador de bronzeado que combina a mágica brasileira, entregando uma composição natural e vegana para um bronzeado duradouro e saudável. A Magic potion leva como essência a sua sensualidade no aroma, se tornando um óleo expressivo e leal, despertando desejo e poder.</p>
                <p>Textura leve, aplicação uniforme, sem resíduo oleoso. Fórmula resistente à água e ao suor. Em apenas 20 minutos ao sol você já encontra resultados incríveis — sempre com protetor solar como parceiro.</p>
              </div>
              <div className="mt-9 flex flex-wrap gap-2">
                {["Natural", "Vegano", "Cruelty free", "Sem conservantes"].map((item) => <span key={item} className="rounded-full border border-foreground/25 px-5 py-2 text-xs font-semibold uppercase">{item}</span>)}
              </div>
            </div>
          </div>
          <div className="min-h-[65svh] bg-secondary">
            <img src={singleImg.url} alt="Frasco individual Coco Honey Bronze" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
        </section>

        <section id="gallery" className="grid md:grid-cols-2">
          <img src={duoImg.url} alt="Dois frascos Coco Honey Bronze" loading="lazy" width={1024} height={1024} className="aspect-square h-full w-full object-cover" />
          <div className="flex aspect-square items-center justify-center bg-primary p-10 text-center text-primary-foreground">
            <p className="max-w-lg font-serif text-5xl italic leading-tight md:text-7xl">Golden skin,<br />Brazilian soul.</p>
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center justify-between gap-5 border-t border-foreground/15 px-6 py-10 md:flex-row md:px-8">
        <strong className="text-sm uppercase">COCOHONEYBRAZIL</strong>
        <p className="editorial-label text-foreground/45">© 2026 · Rio de Janeiro, Brasil</p>
      </footer>
    </div>
  );
}