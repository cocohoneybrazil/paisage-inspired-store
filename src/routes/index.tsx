import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, Check, ShoppingBag, X } from "lucide-react";
import heroMobile from "@/assets/coco-head-mobile.jpg.asset.json";
import script from "@/assets/secret-ingredient-script-transparent.png.asset.json";
import single from "@/assets/coco-honey-bronze-single.png.asset.json";
import heroDesktop from "@/assets/coco-head.jpg.asset.json";
import sol from "@/assets/sol-white.png.asset.json";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { ReviewsSection } from "@/components/site/Reviews";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/lib/catalog";
import { formatPrice, installmentShort, installmentText, parsePrice, useCart } from "@/lib/cart";

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
  const navigate = useNavigate();
  const { packs } = useCatalog();
  const cart = useCart();
  const [bagOpen, setBagOpen] = useState(false);
  const [selected, setSelected] = useState("pack-003");
  const add = (slug: string = selected) => { cart.add(slug); setBagOpen(true); };
  const buyNow = (slug: string = selected) => { cart.add(slug); navigate({ to: "/checkout" }); };
  const featured = packs[2];
  const active = packs.find((pack) => pack.slug === selected) ?? featured;
  if (!featured || !active) return null;
  return <div className="min-h-screen bg-background pb-20 text-foreground md:pb-0">
    <div className="overflow-hidden bg-black py-2.5 text-white">
      <div className="marquee-track flex whitespace-nowrap">
        {[0, 1, 2].map((i) => <div key={i} className="flex items-center gap-8 px-6 text-[11px] font-semibold uppercase tracking-[0.22em]">
          <span>WELCOME SUMMER</span>
          <img src={sol.url} alt="" className="h-3.5 w-3.5" />
          <span>FRETE GRÁTIS NO PACK003</span>
          <img src={sol.url} alt="" className="h-3.5 w-3.5" />
          <span>10%OFF NA PRIMEIRA COMPRA</span>
          <img src={sol.url} alt="" className="h-3.5 w-3.5" />
        </div>)}
      </div>
    </div>
    <Header bagCount={cart.count} onBagOpen={() => setBagOpen(true)} />
    {bagOpen ? <div className="fixed inset-0 z-50"><button className="absolute inset-0 w-full bg-foreground/25" onClick={() => setBagOpen(false)} aria-label="Fechar sacola" /><aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background"><div className="flex h-16 items-center justify-between border-b border-foreground/15 px-6"><span className="header-label">SUA SACOLA ({cart.count})</span><Button variant="ghost" size="icon" onClick={() => setBagOpen(false)} aria-label="Fechar sacola"><X /></Button></div>{cart.items.length ? <><ul className="flex-1 divide-y divide-foreground/15 overflow-y-auto px-6">{cart.items.map((item) => <li key={item.pack.slug} className="flex gap-4 py-5"><img src={item.pack.image} alt={item.pack.name} className="h-20 w-20 rounded-lg bg-secondary object-cover" /><div className="flex-1"><p className="text-sm font-semibold uppercase">{item.pack.name}</p><p className="mt-1 text-xs text-muted-foreground">{item.pack.quantity} · {item.qty}x</p><button className="mt-2 text-[10px] uppercase underline underline-offset-4 text-muted-foreground" onClick={() => cart.remove(item.pack.slug)}>Remover</button></div><p className="text-sm font-semibold">{formatPrice(parsePrice(item.pack.price) * item.qty)}</p></li>)}</ul><div className="border-t border-foreground/15 px-6 py-5"><div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{formatPrice(cart.subtotal)}</span></div><Button variant="silver" className="mt-4 h-12 w-full rounded-lg text-xs font-semibold uppercase" onClick={() => { setBagOpen(false); navigate({ to: "/checkout" }); }}>Finalizar compra</Button></div></> : <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center"><ShoppingBag className="h-8 w-8 text-muted-foreground" /><p className="text-sm text-muted-foreground">Sua sacola está vazia — por enquanto.</p></div>}</aside></div> : null}
    <main>
      <section className="relative flex min-h-[calc(92svh-4rem)] items-end overflow-hidden bg-photo-backdrop">
        <img src={heroMobile.url} alt="COCO INFUSION — Vitamin Complex Nº 01" className="absolute inset-0 h-full w-full object-cover object-center sm:hidden" />
        <div className="absolute inset-0 hidden sm:block" style={{ backgroundColor: "#DFE3EC" }}><img src={heroDesktop.url} alt="COCO HONEY — ingredientes naturais, vegano, cruelty-free" className="h-full w-full object-contain object-center" /></div>
        <h1 className="sr-only">COCO Honey Brazil</h1>
        <a href="#packs" aria-label="Conhecer os packs" className="absolute bottom-7 left-1/2 -translate-x-1/2 text-foreground"><ArrowDown className="h-6 w-6" /></a>
      </section>
      <section id="packs" className="border-b border-foreground/15 bg-background">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
          <div className="flex items-center px-6 py-16 md:px-12 lg:px-16"><div className="max-w-xl"><p className="header-label text-muted-foreground">BEST SELLER · MELHOR CUSTO-BENEFÍCIO</p><h2 className="mt-6 text-5xl font-semibold uppercase leading-none md:text-7xl">Bronze pro verão inteiro</h2><p className="mt-8 text-lg leading-relaxed text-muted-foreground">Coco Honey Bronze · óleo acelerador · 3 un · 186 ml · 10% OFF + Sun Bag. Três vidros de 62 ml para segurar o bronze da primeira praia até o último feriado — e a Sun Bag CHB de brinde.</p><ul className="mt-8 divide-y divide-foreground/15 border-y border-foreground/15">{["10% OFF no combo + Sun Bag CHB", "Frete grátis", "186 ml — cerca de 3 meses de uso", "Fórmula natural e vegana, sem oxibenzona"].map((benefit) => <li key={benefit} className="py-4 text-sm font-medium">{benefit}</li>)}</ul><div className="mt-8 flex flex-wrap items-center gap-5"><span className="text-sm text-muted-foreground line-through">{featured.comparePrice}</span><span className="text-2xl font-semibold">{featured.price}</span><span className="text-sm text-muted-foreground">{installmentText(featured.price)}</span></div><div className="mt-5 flex flex-wrap items-center gap-5"><Button variant="silver" size="lg" className="h-12 rounded-lg px-7 text-xs font-semibold uppercase" onClick={() => add()}><ShoppingBag />Quero o Pack 003</Button><Link to="/produto" search={{ pack: featured.slug }} className="text-xs font-semibold uppercase underline underline-offset-4">Ver detalhes</Link></div></div></div>
          <Link to="/produto" search={{ pack: featured.slug }} className="block overflow-hidden bg-secondary"><img src={featured.image} alt="Pack 003 Coco Honey Bronze com três óleos" className="aspect-square h-full w-full object-cover" /></Link>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-8 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6"><div><p className="header-label text-muted-foreground">TODOS OS PACKS</p><h2 className="mt-3 text-5xl font-semibold uppercase md:text-7xl">Escolha o seu</h2></div><Link to="/produto" search={{ pack: "pack-001" }} className="hidden text-xs font-semibold uppercase underline underline-offset-4 sm:block">Ver detalhes</Link></div>
        <ProductCarousel />
      </section>
      <section className="grid border-y border-foreground/15 lg:grid-cols-2">
         <div className="flex items-center px-6 py-20 md:px-12 lg:px-16"><div className="mx-auto max-w-xl"><p className="header-label text-muted-foreground"> · TANNING OIL · </p><h2 className="mt-6 text-5xl font-semibold uppercase leading-none md:text-7xl">Coco Honey Bronze</h2><img src={script.url} alt="The secret ingredient is always love" className="mt-8 h-auto w-full max-w-lg object-contain" /><div className="mt-9 space-y-5 text-base leading-relaxed text-muted-foreground"><p>Nosso óleo acelerador combina a magia brasileira em uma composição natural e vegana para um bronzeado duradouro e saudável. A MAGIC POTION leva como essência a sua sensualidade no aroma, se tornando um óleo expressivo e leal, despertando desejo e poder. Transformando cuidado com a pele em um ritual de autoestima.Tem quem diga que é afrodisíaco.</p><p>A fórmula desliza facilmente, proporciona aplicação uniforme, tem rápida absorção e resiste à água e ao suor sem deixar resíduos oleosos.</p><p className="text-sm">Óleo de urucum, buriti, coco, cenoura, aloe vera e amêndoas doce, e vitamina E.</p></div><div className="mt-9 flex flex-wrap items-center gap-5"><Button variant="silver" size="lg" className="h-12 rounded-lg px-7 text-xs font-semibold uppercase" onClick={() => add("pack-001")}><ShoppingBag />Adicionar Pack 001</Button><Link to="/produto" search={{ pack: "pack-001" }} className="text-xs font-semibold uppercase underline underline-offset-4">Comprar agora</Link><span className="text-lg font-semibold">{packs[0]?.price}</span>{packs[0] ? <span className="text-xs text-muted-foreground">{installmentText(packs[0].price)}</span> : null}</div></div></div>
        <img src={single.url} alt="Frasco Coco Honey Bronze" loading="lazy" className="min-h-[65svh] h-full w-full bg-secondary object-cover" />
      </section>
    </main>
    <section className="border-t border-foreground/15 bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        <p className="header-label text-muted-foreground">O QUE A COCO HONEY DESPERTA</p>
        <h2 className="mt-6 max-w-4xl font-serif text-5xl italic leading-[0.95] md:text-8xl">Desejo e poder, com saúde e proteção</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {[["AUTOESTIMA", "Aumente sua autoestima com um bronze que valoriza sua pele e sua presença desde a primeira aplicação."], ["20 MINUTOS", "Bronzeado saudável em 20 minutos de sol. Ativadores naturais aceleram a melanina sem agredir a pele."], ["NATURAL", "Fórmula natural, vegana e sem parabenos. Cuidado real para quem ama pele, sol e ingredientes transparentes."]].map(([title, text]) => <div key={title} className="border-t border-foreground/15 pt-6"><h3 className="text-2xl font-semibold uppercase md:text-3xl">{title}</h3><p className="mt-4 text-base leading-relaxed text-muted-foreground">{text}</p></div>)}
        </div>
      </div>
    </section>
    <section className="border-t border-foreground/15 bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        <p className="header-label text-muted-foreground">POR QUE COCO HONEY BRONZE</p>
        <h2 className="mt-6 max-w-4xl text-5xl font-semibold uppercase leading-none md:text-7xl">A escolha consciente</h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">Estudos dermatológicos apontam que filtros químicos como oxibenzona e derivados de petróleo podem irritar e ressecar a pele. Comparativo com a composição comum de bronzeadores tradicionais — sem citar marcas.</p>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-foreground/15 bg-foreground/15 md:grid-cols-2">
          <div className="bg-background p-6 md:p-10">
            <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background"><Check className="h-4 w-4" /></span><h3 className="header-brand">COCO HONEY BRAZIL</h3></div>
            <ul className="mt-8 divide-y divide-foreground/15">
              {[["BASE", "Óleos vegetais naturais"], ["FILTROS", "Sem oxibenzona nem octinoxato"], ["CONSERVANTES", "Sem parabenos"], ["ORIGEM", "Natural e vegano"], ["HIDRATAÇÃO", "Vitamina E + Aloe Vera + Amêndoas doce"], ["BRONZE", "Uniforme e duradouro"], ["TESTES", "Dermatologicamente testado"]].map(([label, text]) => <li key={label} className="py-5"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p><p className="mt-1.5 text-lg font-semibold">{text}</p></li>)}
            </ul>
          </div>
          <div className="bg-secondary/60 p-6 md:p-10">
            <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full border border-foreground/25 text-muted-foreground"><X className="h-4 w-4" /></span><h3 className="header-brand text-muted-foreground">OUTROS BRONZEADORES</h3></div>
            <ul className="mt-8 divide-y divide-foreground/10">
              {[["BASE", "Óleo mineral e compostos de petróleo"], ["FILTROS", "Oxibenzona e derivados"], ["CONSERVANTES", "Parabenos e conservantes sintéticos"], ["ORIGEM", "Ingredientes de origem animal"], ["HIDRATAÇÃO", "Resseca a pele depois do sol"], ["BRONZE", "Irregular, marca manchas"], ["TESTES", "Testado em animais"]].map(([label, text]) => <li key={label} className="py-5"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p><p className="mt-1.5 text-lg text-muted-foreground line-through decoration-foreground/40">{text}</p></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
    <ReviewsSection />
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/20 bg-background/95 px-3 pb-[max(.6rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden"><div className="flex items-center gap-2"><div className="flex gap-1">{packs.map((pack) => <Button key={pack.slug} variant={pack.slug === selected ? "silver" : "outline"} size="sm" className="rounded-lg px-2" onClick={() => setSelected(pack.slug)}>{pack.shortName}</Button>)}</div><p className="ml-auto flex flex-col items-end whitespace-nowrap text-xs font-semibold"><span className="flex items-baseline gap-1.5">{active.comparePrice ? <span className="text-[10px] font-normal text-muted-foreground line-through">{active.comparePrice}</span> : null}{active.price}</span><span className="text-[9px] font-normal text-muted-foreground">{installmentShort(active.price)} sem juros</span></p><Button variant="silver" className="h-10 rounded-lg px-3 text-[10px] uppercase" onClick={() => buyNow()}><ShoppingBag />Comprar</Button></div></div>
    <Footer />
  </div>;
}