import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";

import heroImg from "@/assets/coco-hero.jpg";
import productOil from "@/assets/coco-product-oil.jpg";
import productMist from "@/assets/coco-product-mist.jpg";
import productBalm from "@/assets/coco-product-balm.jpg";
import productBag from "@/assets/coco-product-bag.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COCO — Beleza tropical essencial" },
      {
        name: "description",
        content:
          "COCO é uma marca de beleza tropical: óleos, brumas e bálsamos de coco com estética editorial. Esboço da loja oficial.",
      },
      { property: "og:title", content: "COCO — Beleza tropical essencial" },
      {
        property: "og:description",
        content:
          "Óleos, brumas e bálsamos de coco com estética editorial. Esboço da loja oficial COCO.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PRODUCTS = [
  { name: "Óleo de Coco Puro", price: "R$ 89", tag: "Corpo & Cabelo", img: productOil },
  { name: "Bruma Tropical", price: "R$ 69", tag: "Rosto", img: productMist },
  { name: "Bálsamo de Coco", price: "R$ 59", tag: "Lábios & Pele", img: productBalm },
  { name: "Tote COCO", price: "R$ 129", tag: "Acessório", img: productBag },
];

const NAV = ["Loja", "Sobre", "Journal", "Contato"];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href="#loja"
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl italic tracking-tight"
          >
            coco
          </a>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Buscar"
              className="transition-opacity hover:opacity-60"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              onClick={() => setBagOpen(true)}
              aria-label="Abrir sacola"
              className="transition-opacity hover:opacity-60"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-foreground/10">
            <div className="mx-auto max-w-7xl px-5 py-3">
              <input
                autoFocus
                placeholder="Buscar produtos…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex h-14 items-center justify-between px-5">
            <span className="font-serif text-2xl italic">coco</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 px-5 pt-10">
            {NAV.map((item) => (
              <a
                key={item}
                href="#loja"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-4xl italic"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Bag drawer */}
      {bagOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setBagOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-background shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-foreground/10 px-5">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
                Sacola (0)
              </span>
              <button onClick={() => setBagOpen(false)} aria-label="Fechar sacola">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
              <ShoppingBag className="h-8 w-8 text-foreground/30" />
              <p className="text-sm text-foreground/60">
                Sua sacola está vazia — por enquanto.
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* Hero */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="COCO — beleza tropical"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-serif text-[26vw] italic leading-none text-white drop-shadow-sm md:text-[18vw]">
            coco
          </h1>
          <a
            href="#loja"
            className="mt-6 inline-flex items-center gap-2 border border-white/70 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-white hover:text-foreground"
          >
            Entrar na loja <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Products */}
      <section id="loja" className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-4xl italic md:text-5xl">A coleção</h2>
          <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/50">
            {PRODUCTS.length} produtos
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {PRODUCTS.map((p) => (
            <article key={p.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute inset-x-0 bottom-0 translate-y-full bg-foreground py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-background transition-transform duration-300 group-hover:translate-y-0">
                  Adicionar à sacola
                </button>
              </div>
              <div className="mt-4 flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium">{p.name}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-foreground/50">
                    {p.tag}
                  </p>
                </div>
                <span className="text-sm">{p.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Editorial band */}
      <section className="border-y border-foreground/10 bg-secondary/40">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center md:py-32">
          <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50">
            Sobre a marca
          </p>
          <p className="mt-6 font-serif text-3xl italic leading-snug md:text-5xl">
            Beleza que nasce do coco — pura, tropical e sem pressa.
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-foreground/60">
            Texto editorial provisório. A história oficial da COCO entra aqui
            quando você enviar as informações.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <span className="font-serif text-2xl italic">coco</span>
          <nav className="flex gap-6">
            {NAV.map((item) => (
              <a
                key={item}
                href="#loja"
                className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <span className="text-[11px] text-foreground/40">
            © 2026 COCO — esboço demonstrativo
          </span>
        </div>
      </footer>
    </div>
  );
}
