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

const ingredients: { name: string; tagline: string; benefits: string[] }[] = [
  { name: "Óleo de buriti", tagline: "Elixir amazônico", benefits: ["Potente antioxidante rico em betacaroteno, que estimula a melanina e aprofunda o bronze.", "Quantidade extraordinária de vitaminas A, C e E, combatendo o envelhecimento precoce.", "Ácido oleico (ômega 9) com ação cicatrizante, hidratante e energizante para pele e cabelos."] },
  { name: "Óleo de urucum", tagline: "Cor mais intensa", benefits: ["Rico em carotenoides antioxidantes que combatem os danos dos radicais livres.", "Estimula a produção de melanina, resultando em bronzeado mais intenso e duradouro.", "Emoliente e hidratante: mantém a pele macia, flexível e nutrida."] },
  { name: "Óleo de cenoura", tagline: "Dono do bronze", benefits: ["Ação regeneradora que ajuda a reduzir a aparência de manchas e cicatrizes.", "Anti-idade, antioxidante, anti-inflamatório, cicatrizante e revitalizante.", "Fator de bronzeamento natural que traz uma cor linda à pele exposta ao sol."] },
  { name: "Óleo de coco", tagline: "Nutrição profunda", benefits: ["Mantém a pele hidratada durante o sol, sem alterar sua textura natural.", "Absorção rápida que estimula a melanina na superfície da pele, acelerando o bronze.", "Forma uma película que reflete parte dos raios UV, reforçando (sem substituir) o cuidado solar.", "Ácido láurico com propriedades antimicrobianas."] },
  { name: "Óleo de amêndoas doce", tagline: "Pele lisa e elástica", benefits: ["Propriedades calmantes que ajudam a reduzir irritações e inflamações cutâneas.", "Auxilia na aparência de cicatrizes e estrias, aumentando a elasticidade.", "Vitaminas e ácidos graxos essenciais que nutrem e regeneram a pele."] },
  { name: "Óleo de aloe vera", tagline: "Hidratação que segura o bronze", benefits: ["Retém umidade na pele para uma hidratação profunda e duradoura.", "Ação calmante e anti-inflamatória: acalma a pele e reduz vermelhidão após o sol.", "Estimula a renovação celular, deixando a pele mais receptiva ao bronzeado."] },
  { name: "Vitamina E", tagline: "Antioxidante final", benefits: ["Protege a fórmula e a pele da ação dos radicais livres.", "Complementa a nutrição, prolongando maciez e luminosidade."] },
];
const ritual = ["Esfolie e hidrate a pele previamente para uma aplicação mais uniforme.", "Agite o frasco antes de usar para manter o brilho uniforme.", "Faça uma concha com a mão, borrife o óleo nela e espalhe uniformemente para evitar respingos no beachwear.", "Reaplique o óleo após períodos prolongados na água ou de suor intenso."];
const tips = ["Consuma alimentos ricos em betacaroteno, como cenoura, couve e acerola, dentro de uma alimentação equilibrada.", "Evite os horários de radiação mais intensa e reduza o tempo de exposição direta.", "Após o uso, mantenha o frasco em local fresco e escuro, longe da luz solar direta.", "Se o óleo cair diretamente sobre uma peça, enxágue com água e sabão."];

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
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-8"><p className="header-label text-muted-foreground">A FÓRMULA</p><h2 className="mt-4 text-5xl font-semibold uppercase md:text-7xl">Ingredientes</h2><div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{ingredients.map((item) => <div key={item.name} className="border-t border-foreground/20 pt-5"><h3 className="font-semibold uppercase">{item.name}</h3><p className="header-label mt-2 text-muted-foreground">{item.tagline}</p><ul className="mt-4 space-y-3">{item.benefits.map((benefit) => <li key={benefit} className="text-sm leading-relaxed text-muted-foreground">{benefit}</li>)}</ul></div>)}</div></section>
      <section className="border-y border-foreground/15 bg-foreground text-background"><div className="mx-auto max-w-[1500px] px-6 py-20 md:px-8"><p className="header-label opacity-60">RITUAL COCO</p><h2 className="mt-4 text-5xl font-semibold uppercase md:text-7xl">Sol com cuidado</h2><ol className="mt-12 grid gap-8 md:grid-cols-2">{ritual.map((step, index) => <li key={step} className="flex gap-5 border-t border-background/30 pt-5"><span className="font-serif text-3xl italic">0{index + 1}</span><p className="text-sm opacity-75">{step}</p></li>)}</ol></div></section>
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-8"><p className="header-label text-muted-foreground">DICAS COCO</p><h2 className="mt-4 text-5xl font-semibold uppercase md:text-7xl">Antes e depois do sol</h2><div className="mt-12 grid gap-8 md:grid-cols-2">{tips.map((tip, index) => <div key={tip} className="border-t border-foreground/20 pt-5"><span className="header-label text-muted-foreground">0{index + 1}</span><p className="mt-4 text-sm leading-relaxed">{tip}</p></div>)}</div></section>
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-8"><p className="header-label text-muted-foreground">PERGUNTAS FREQUENTES</p><div className="mt-8 divide-y divide-foreground/15 border-y border-foreground/15">{[["Possui fator de proteção solar?", "Não. É um acelerador de bronzeado sem FPS."], ["É resistente à água e ao suor?", "Sim, mas recomendamos reaplicar após períodos prolongados na água."], ["É autobronzeador?", "Não. É um acelerador que atua durante a exposição solar."]].map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none font-semibold uppercase">{question}</summary><p className="mt-3 max-w-2xl text-sm text-muted-foreground">{answer}</p></details>)}</div></section>
    </main>
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/20 bg-background/95 px-3 pb-[max(.6rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden"><div className="flex items-center gap-2"><div className="flex gap-1">{packs.map((pack) => <Button key={pack.slug} variant={pack.slug === selected ? "silver" : "outline"} size="sm" className="rounded-lg px-2" onClick={() => setSelected(pack.slug)}>{pack.shortName}</Button>)}</div><p className="ml-auto flex items-baseline gap-1.5 whitespace-nowrap text-xs font-semibold">{active.comparePrice ? <span className="text-[10px] font-normal text-muted-foreground line-through">{active.comparePrice}</span> : null}{active.price}</p><Button variant="silver" className="h-10 rounded-lg px-3 text-[10px] uppercase" onClick={add}><ShoppingBag />Comprar</Button></div></div>
    <Footer />
  </div>;
}