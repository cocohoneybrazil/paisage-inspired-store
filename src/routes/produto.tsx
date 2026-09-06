import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { packs } from "@/lib/products";
import script from "@/assets/secret-ingredient-script-transparent.png.asset.json";

export const Route = createFileRoute("/produto")({
  validateSearch: (search: Record<string, unknown>) => ({ pack: typeof search["pack"] === "string" ? search["pack"] : "pack-003" }),
  head: () => ({ meta: [
    { title: "Coco Honey Bronze — Packs e detalhes" },
    { name: "description", content: "Escolha seu pack de Coco Honey Bronze e conheça fórmula, ingredientes e ritual de uso." },
    { property: "og:title", content: "Coco Honey Bronze — Packs e detalhes" },
    { property: "og:description", content: "Óleo acelerador natural, vegano e resistente à água." },
    { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ProductPage,
});

const ingredients = [["Óleo de buriti", "Rico em betacaroteno e vitaminas A, C e E."], ["Óleo de urucum", "Carotenoides que intensificam e prolongam o bronzeado."], ["Óleo de cenoura", "Ação regeneradora, antioxidante e uniformizadora."], ["Óleo de coco", "Nutrição profunda e rápida absorção."], ["Óleo de amêndoas doce", "Ajuda a manter maciez e elasticidade."], ["Óleo de aloe vera", "Hidratação e cuidado calmante pós-sol."]];
const ritual = ["Esfolie e hidrate a pele antes do sol.", "Espalhe o óleo de maneira uniforme.", "Espere a absorção completa e aplique protetor solar.", "Evite horários de radiação intensa e reaplique quando necessário."];

function ProductPage() {
  const search = Route.useSearch();
  const initial = packs.some((pack) => pack.slug === search.pack) ? search.pack : "pack-003";
  const [selected, setSelected] = useState(initial);
  const [bagCount, setBagCount] = useState(0);
  const active = useMemo(() => packs.find((pack) => pack.slug === selected) ?? packs[0], [selected]);
  if (!active) return null;
  const add = () => setBagCount((count) => count + 1);
  return <div className="min-h-screen pb-24 md:pb-0"><Header bagCount={bagCount} />
    <main>
      <section className="grid border-b border-foreground/15 lg:grid-cols-[1.08fr_.92fr]">
        <div className="bg-secondary"><img src={active.image} alt={active.name} className="aspect-square h-full w-full object-cover" /></div>
        <div className="flex px-6 py-12 md:px-12 lg:sticky lg:top-16 lg:min-h-[calc(100vh-4rem)] lg:items-center lg:px-16"><div className="w-full"><p className="header-label text-muted-foreground">COCO HONEY BRONZE · 62 ML</p><h1 className="mt-5 text-5xl font-semibold uppercase leading-none md:text-7xl">{active.name}</h1><img src={script.url} alt="The secret ingredient is always love" className="mt-6 h-auto w-full max-w-md" /><p className="mt-7 max-w-xl leading-relaxed text-muted-foreground">Óleo acelerador de bronzeado natural e vegano. Textura leve, aplicação uniforme, resistente à água e ao suor.</p>
          <div className="mt-8 grid grid-cols-3 gap-2">{packs.map((pack) => <Button key={pack.slug} variant={pack.slug === selected ? "silver" : "outline"} className="h-auto rounded-lg px-2 py-3" onClick={() => setSelected(pack.slug)}><span><span className="block text-xs font-semibold">PACK {pack.shortName}</span><span className="mt-1 block text-[10px] font-normal">{pack.price}</span></span></Button>)}</div>
          <div className="mt-8 flex items-end justify-between"><div>{active.comparePrice ? <p className="text-sm text-muted-foreground line-through">{active.comparePrice}</p> : null}<p className="text-3xl font-semibold">{active.price}</p></div>{active.badge ? <span className="header-label">{active.badge}</span> : null}</div>
          <Button variant="silver" className="mt-6 h-14 w-full rounded-lg text-xs font-semibold uppercase" onClick={add}><ShoppingBag />Adicionar à sacola</Button>
          <div className="mt-8 grid grid-cols-2 gap-3 text-xs">{["Natural", "Vegano", "Cruelty free", "Sem conservantes"].map((item) => <span key={item} className="flex items-center gap-2 border-t border-foreground/15 pt-3"><Check className="h-3 w-3" />{item}</span>)}</div>
        </div></div>
      </section>
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-8"><p className="header-label text-muted-foreground">A FÓRMULA</p><h2 className="mt-4 text-5xl font-semibold uppercase md:text-7xl">Ingredientes</h2><div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{ingredients.map(([name, text]) => <div key={name} className="border-t border-foreground/20 pt-5"><h3 className="font-semibold uppercase">{name}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div></section>
      <section className="border-y border-foreground/15 bg-foreground text-background"><div className="mx-auto max-w-[1500px] px-6 py-20 md:px-8"><p className="header-label opacity-60">RITUAL COCO</p><h2 className="mt-4 text-5xl font-semibold uppercase md:text-7xl">Sol com cuidado</h2><ol className="mt-12 grid gap-8 md:grid-cols-2">{ritual.map((step, index) => <li key={step} className="flex gap-5 border-t border-background/30 pt-5"><span className="font-serif text-3xl italic">0{index + 1}</span><p className="text-sm opacity-75">{step}</p></li>)}</ol></div></section>
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-8"><p className="header-label text-muted-foreground">PERGUNTAS FREQUENTES</p><div className="mt-8 divide-y divide-foreground/15 border-y border-foreground/15">{[["Possui fator de proteção solar?", "Não. Use sempre com um protetor solar adequado."], ["É resistente à água e ao suor?", "Sim, mas recomendamos reaplicar após períodos prolongados na água."], ["É autobronzeador?", "Não. É um acelerador que atua durante a exposição solar."]].map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none font-semibold uppercase">{question}</summary><p className="mt-3 max-w-2xl text-sm text-muted-foreground">{answer}</p></details>)}</div></section>
    </main>
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/20 bg-background/95 px-3 pb-[max(.6rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden"><div className="flex items-center gap-2"><div className="flex gap-1">{packs.map((pack) => <Button key={pack.slug} variant={pack.slug === selected ? "silver" : "outline"} size="sm" className="rounded-lg px-2" onClick={() => setSelected(pack.slug)}>{pack.shortName}</Button>)}</div><p className="ml-auto whitespace-nowrap text-xs font-semibold">{active.price}</p><Button variant="silver" className="h-10 rounded-lg px-3 text-[10px] uppercase" onClick={add}><ShoppingBag />Comprar</Button></div></div>
    <Footer />
  </div>;
}