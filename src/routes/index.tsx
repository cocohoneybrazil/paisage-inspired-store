import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ShoppingBag, X } from "lucide-react";
import infusion from "@/assets/coco-infusion.png.asset.json";
import script from "@/assets/secret-ingredient-script-transparent.png.asset.json";
import single from "@/assets/coco-honey-bronze-single.png.asset.json";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { Button } from "@/components/ui/button";
import { packs } from "@/lib/products";

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
  const featured = packs[2];
  if (!featured) return null;
  return <div className="min-h-screen bg-background text-foreground">
    <Header bagCount={bagCount} onBagOpen={() => setBagOpen(true)} />
    {bagOpen ? <div className="fixed inset-0 z-50"><button className="absolute inset-0 w-full bg-foreground/25" onClick={() => setBagOpen(false)} aria-label="Fechar sacola" /><aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background"><div className="flex h-16 items-center justify-between border-b border-foreground/15 px-6"><span className="header-label">SUA SACOLA ({bagCount})</span><Button variant="ghost" size="icon" onClick={() => setBagOpen(false)} aria-label="Fechar sacola"><X /></Button></div><div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center"><ShoppingBag className="h-8 w-8 text-muted-foreground" /><p className="text-sm text-muted-foreground">{bagCount ? `${bagCount} produto reservado na sua sacola.` : "Sua sacola está vazia — por enquanto."}</p></div></aside></div> : null}
    <main>
      <section className="relative flex min-h-[calc(92svh-4rem)] items-end overflow-hidden bg-photo-backdrop">
        <img src={infusion.url} alt="Bolsa COCO INFUSION com óleo dourado" className="absolute inset-0 h-full w-full object-contain object-center" />
        <h1 className="sr-only">COCO Honey Brazil</h1>
        <a href="#packs" aria-label="Conhecer os packs" className="absolute bottom-7 left-1/2 -translate-x-1/2 text-foreground"><ArrowDown className="h-6 w-6" /></a>
      </section>
      <section id="packs" className="border-b border-foreground/15 bg-background">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
          <Link to="/produto" search={{ pack: featured.slug }} className="block overflow-hidden bg-secondary"><img src={featured.image} alt="Pack 003 Coco Honey Bronze com três óleos" className="aspect-square h-full w-full object-cover" /></Link>
          <div className="flex items-center px-6 py-16 md:px-12 lg:px-16"><div className="max-w-xl"><p className="header-label text-muted-foreground">BEST SELLER · PACK 003</p><h2 className="mt-5 text-5xl font-semibold uppercase leading-none md:text-7xl">Coco Honey Bronze</h2><p className="mt-8 text-lg leading-relaxed text-muted-foreground">Nosso tanning oil combina a magia brasileira em uma fórmula natural e vegana para um bronzeado duradouro. A textura leve desliza sobre a pele, tem rápida absorção e deixa um brilho uniforme sem resíduos oleosos.</p><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Três óleos de 60 ml e uma Sun Bag. Use sempre em conjunto com um protetor solar adequado.</p><div className="mt-8 flex flex-wrap items-center gap-5"><Button variant="silver" size="lg" className="h-12 rounded-lg px-7 text-xs font-semibold uppercase" onClick={add}><ShoppingBag />Adicionar à sacola</Button><Link to="/produto" search={{ pack: featured.slug }} className="text-xs font-semibold uppercase underline underline-offset-4">Ver detalhes</Link><span className="text-lg font-semibold">{featured.price}</span></div></div></div>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-8 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6"><div><p className="header-label text-muted-foreground">TODOS OS PACKS</p><h2 className="mt-3 text-5xl font-semibold uppercase md:text-7xl">Escolha o seu</h2></div><Link to="/produto" search={{ pack: "pack-001" }} className="hidden text-xs font-semibold uppercase underline underline-offset-4 sm:block">Ver detalhes</Link></div>
        <ProductCarousel />
      </section>
      <section className="grid border-y border-foreground/15 lg:grid-cols-2">
        <div className="flex items-center px-6 py-20 md:px-12 lg:px-16"><div className="mx-auto max-w-xl"><p className="header-label text-muted-foreground">PACK 001 · TANNING OIL · 60 ML</p><h2 className="mt-6 text-5xl font-semibold uppercase leading-none md:text-7xl">Coco Honey Bronze</h2><img src={script.url} alt="The secret ingredient is always love" className="mt-8 h-auto w-full max-w-lg object-contain" /><div className="mt-9 space-y-5 text-base leading-relaxed text-muted-foreground"><p>Nosso óleo acelerador combina a magia brasileira em uma composição natural e vegana para um bronzeado duradouro. Seu aroma expressivo e sua textura suave transformam o cuidado com a pele em um ritual de autoestima.</p><p>A fórmula desliza facilmente, proporciona aplicação uniforme, tem rápida absorção e resiste à água e ao suor sem deixar resíduos oleosos. O protetor solar continua indispensável e deve ser usado de acordo com suas orientações.</p><p className="text-sm">Óleo de urucum, buriti, coco, cenoura, aloe vera e amêndoas doce, com mica e vitamina E.</p></div><div className="mt-9 flex flex-wrap items-center gap-5"><Button variant="silver" size="lg" className="h-12 rounded-lg px-7 text-xs font-semibold uppercase" onClick={add}><ShoppingBag />Adicionar Pack 001</Button><Link to="/produto" search={{ pack: "pack-001" }} className="text-xs font-semibold uppercase underline underline-offset-4">Comprar agora</Link><span className="text-lg font-semibold">{packs[0]?.price}</span></div></div></div>
        <img src={single.url} alt="Frasco Coco Honey Bronze" loading="lazy" className="min-h-[65svh] h-full w-full bg-secondary object-cover" />
      </section>
    </main>
    <Footer />
  </div>;
}