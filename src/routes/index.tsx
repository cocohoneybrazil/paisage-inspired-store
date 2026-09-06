import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ShoppingBag, X } from "lucide-react";
import infusion from "@/assets/coco-infusion.png.asset.json";
import script from "@/assets/secret-ingredient-script.png.asset.json";
import single from "@/assets/coco-honey-bronze-single.png.asset.json";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "COCO Honey Brazil — Tanning Oil" },
    { name: "description", content: "Coco Honey Bronze: óleo acelerador natural e vegano para uma pele dourada e luminosa." },
    { property: "og:title", content: "COCO Honey Brazil — Tanning Oil" },
    { property: "og:description", content: "A magia brasileira em um tanning oil natural, vegano e resistente à água." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Home,
});

function Home() {
  const [bagCount, setBagCount] = useState(0);
  const [bagOpen, setBagOpen] = useState(false);
  const add = () => { setBagCount((count) => count + 1); setBagOpen(true); };
  return <div className="min-h-screen bg-background text-foreground">
    <Header bagCount={bagCount} onBagOpen={() => setBagOpen(true)} />
    {bagOpen ? <div className="fixed inset-0 z-50"><button className="absolute inset-0 w-full bg-foreground/25" onClick={() => setBagOpen(false)} aria-label="Fechar sacola" /><aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background"><div className="flex h-16 items-center justify-between border-b border-foreground/15 px-6"><span className="header-label">SUA SACOLA ({bagCount})</span><Button variant="ghost" size="icon" onClick={() => setBagOpen(false)} aria-label="Fechar sacola"><X /></Button></div><div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center"><ShoppingBag className="h-8 w-8 text-muted-foreground" /><p className="text-sm text-muted-foreground">{bagCount ? `${bagCount} produto reservado na sua sacola.` : "Sua sacola está vazia — por enquanto."}</p></div></aside></div> : null}
    <main>
      <section className="relative flex min-h-[calc(92svh-4rem)] items-end overflow-hidden bg-secondary">
        <img src={infusion.url} alt="Bolsa COCO INFUSION com óleo dourado" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-foreground/5" />
        <h1 className="crystal-wordmark absolute inset-x-0 top-1/2 -translate-y-1/2 px-3 text-center">COCOHONEYBRAZIL</h1>
        <a href="#packs" aria-label="Conhecer os packs" className="absolute bottom-7 left-1/2 -translate-x-1/2 text-foreground"><ArrowDown className="h-6 w-6" /></a>
      </section>
      <section id="packs" className="mx-auto max-w-[1600px] px-5 py-20 md:px-8 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6"><div><p className="header-label text-muted-foreground">BEST SELLERS</p><h2 className="mt-3 text-5xl font-semibold uppercase md:text-7xl">Escolha seu pack</h2></div><Link to="/produto" className="hidden text-xs font-semibold uppercase underline underline-offset-4 sm:block">Ver detalhes</Link></div>
        <ProductCarousel />
      </section>
      <section className="grid border-y border-foreground/15 lg:grid-cols-2">
        <div className="flex items-center px-6 py-20 md:px-12 lg:px-16"><div className="mx-auto max-w-xl"><p className="header-label text-muted-foreground">TANNING OIL · 62 ML</p><h2 className="mt-6 text-5xl font-semibold uppercase leading-none md:text-7xl">Coco Honey Bronze</h2><img src={script.url} alt="The secret ingredient is always love" className="mt-8 h-auto w-full max-w-lg object-contain" /><p className="mt-9 text-lg leading-relaxed text-muted-foreground">Fórmula natural e vegana para um bronzeado duradouro e saudável. Textura leve, aplicação uniforme e sem resíduo oleoso — sempre com protetor solar como parceiro.</p><Button variant="silver" size="lg" className="mt-9 h-12 rounded-lg px-7 text-xs font-semibold uppercase" onClick={add}>Adicionar Pack 003</Button></div></div>
        <img src={single.url} alt="Frasco Coco Honey Bronze" loading="lazy" className="min-h-[65svh] h-full w-full bg-secondary object-cover" />
      </section>
    </main>
    <Footer />
  </div>;
}