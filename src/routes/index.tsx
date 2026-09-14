import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, Check, ShoppingBag, X } from "lucide-react";
import heroMobile from "@/assets/coco-head-mobile.jpg";
import script from "@/assets/secret-ingredient-script-transparent.png.asset.json";
import single from "@/assets/coco-honey-bronze-single.png";
import heroDesktop from "@/assets/coco-head.jpg";
import sol from "@/assets/sol-white.png.asset.json";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { ReviewsSection } from "@/components/site/Reviews";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/lib/catalog";
import { FreeShippingBar, SavingsNudge, UpgradeNudge } from "@/components/site/FreeShipping";
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
          <span>FRETE GRÁTIS ACIMA DE R$ 199</span>
          <img src={sol.url} alt="" className="h-3.5 w-3.5" />
          <span>10% OFF NA PRIMEIRA COMPRA</span>
          <img src={sol.url} alt="" className="h-3.5 w-3.5" />
        </div>)}
      </div>
    </div>
    <Header bagCount={cart.count} onBagOpen={() => setBagOpen(true)} />
    {bagOpen ? <div className="fixed inset-0 z-50"><button className="absolute inset-0 w-full bg-foreground/25" onClick={() => setBagOpen(false)} aria-label="Fechar sacola" /><aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background"><div className="flex h-16 items-center justify-between border-b border-foreground/15 px-6"><span className="header-label">SUA SACOLA ({cart.count})</span><Button variant="ghost" size="icon" onClick={() => setBagOpen(false)} aria-label="Fechar sacola"><X /></Button></div>{cart.items.length ? <><ul className="flex-1 divide-y divide-foreground/15 overflow-y-auto px-6">{cart.items.map((item) => <li key={item.pack.slug} className="flex gap-4 py-5"><img src={item.pack.image} alt={item.pack.name} className="h-20 w-20 rounded-lg bg-secondary object-cover" /><div className="flex-1"><p className="text-sm font-semibold uppercase">{item.pack.name}</p><p className="mt-1 text-xs text-muted-foreground">{item.pack.quantity} · {item.qty}x</p><button className="mt-2 text-[10px] uppercase underline underline-offset-4 text-muted-foreground" onClick={() => cart.remove(item.pack.slug)}>Remover</button></div><p className="text-sm font-semibold">{formatPrice(parsePrice(item.pack.price) * item.qty)}</p></li>)}</ul><div className="border-t border-foreground/15 px-6 py-5"><FreeShippingBar className="mb-5" /><SavingsNudge className="mb-5" /><UpgradeNudge className="mb-5" /><div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{formatPrice(cart.subtotal)}</span></div><Button variant="brand" className="mt-4 h-12 w-full rounded-lg text-xs font-semibold uppercase" onClick={() => { setBagOpen(false); navigate({ to: "/checkout" }); }}>Finalizar compra</Button></div></> : <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center"><ShoppingBag className="h-8 w-8 text-muted-foreground" /><p className="text-sm text-muted-foreground">Sua sacola está vazia — por enquanto.</p></div>}</aside></div> : null}
    <main>
      <section className="screen-section relative flex items-end overflow-hidden bg-photo-backdrop">
        <img src={heroMobile} alt="COCO INFUSION — Vitamin Complex Nº 01" className="absolute inset-0 h-full w-full object-cover object-center sm:hidden" />
        <div className="absolute inset-0 hidden sm:block" style={{ backgroundColor: "#DFE3EC" }}><img src={heroDesktop} alt="COCO HONEY — ingredientes naturais, vegano, cruelty-free" className="h-full w-full object-contain object-center" /></div>
        <h1 className="sr-only">COCO Honey Brazil</h1>
        <a href="#packs" aria-label="Conhecer os packs" className="absolute bottom-7 left-1/2 -translate-x-1/2 text-foreground"><ArrowDown className="h-6 w-6" /></a>
      </section>
      <section id="packs" className="screen-section border-b border-foreground/15 bg-background">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-2">
          <div className="section-pad flex items-center px-6 md:px-12 lg:px-16"><div className="max-w-xl"><p className="header-label text-muted-foreground">MAIS VENDIDO · MELHOR CUSTO-BENEFÍCIO</p><h2 className="mt-4 display-1 font-semibold uppercase leading-none">Bronze pro verão inteiro</h2><p className="mt-5 text-[clamp(0.95rem,1.1vw,1.125rem)] leading-relaxed text-muted-foreground">Coco Honey Bronze · óleo acelerador · 3 un · 186 ml · 10% de desconto + Sun Bag. Três vidros de 62 ml para segurar o bronze da primeira praia até o último feriado — e a Sun Bag CHB de brinde.</p><ul className="mt-5 divide-y divide-foreground/15 border-y border-foreground/15">{["10% de desconto no combo + Sun Bag CHB", "Frete grátis", "186 ml — cerca de 3 meses de uso", "Fórmula natural e vegana, sem oxibenzona"].map((benefit) => <li key={benefit} className="py-2.5 text-sm font-medium">{benefit}</li>)}</ul><div className="mt-5 flex flex-wrap items-center gap-5"><span className="text-sm text-muted-foreground line-through">{featured.comparePrice}</span><span className="text-2xl font-semibold">{featured.price}</span><span className="text-sm text-muted-foreground">{installmentText(featured.price)}</span></div><div className="mt-4 flex flex-wrap items-center gap-5"><Button variant="brand" size="lg" className="h-12 rounded-lg px-7 text-xs font-semibold uppercase" onClick={() => add()}><ShoppingBag />Quero o Pack 003</Button><Link to="/produto" search={{ pack: featured.slug }} className="text-xs font-semibold uppercase underline underline-offset-4">Ver detalhes</Link></div></div></div>
          <Link to="/produto" search={{ pack: featured.slug }} className="block overflow-hidden bg-secondary"><img src={featured.image} alt="Pack 003 Coco Honey Bronze com três óleos" className="h-[36svh] w-full object-cover lg:h-screen-section" /></Link>
        </div>
      </section>
      <section className="screen-section section-pad mx-auto flex max-w-[1600px] flex-col justify-center px-5 md:px-8">
        <div className="mb-6 flex items-end justify-between gap-6"><div><p className="header-label text-muted-foreground">TODOS OS PACKS</p><h2 className="mt-3 display-1 font-semibold uppercase">Escolha o seu</h2></div><Link to="/produto" search={{ pack: "pack-001" }} className="hidden text-xs font-semibold uppercase underline underline-offset-4 sm:block">Ver detalhes</Link></div>
        <ProductCarousel />
      </section>
      <section className="screen-section grid border-y border-foreground/15 lg:grid-cols-2">
         <div className="section-pad flex items-center px-6 md:px-12 lg:px-16"><div className="mx-auto max-w-xl"><p className="header-label text-muted-foreground">PACK 001 · ÓLEO ACELERADOR · 62 ML</p><h2 className="mt-4 display-1 font-semibold uppercase leading-none">Coco Honey Bronze</h2><img src={script.url} alt="The secret ingredient is always love" className="mt-8 h-auto w-full max-w-lg object-contain" /><div className="mt-5 space-y-3 text-[clamp(0.9rem,1vw,1rem)] leading-relaxed text-muted-foreground"><p>Nosso óleo acelerador combina a magia brasileira em uma composição natural e vegana para um bronzeado duradouro e saudável. A MAGIC POTION leva como essência a sua sensualidade no aroma, se tornando um óleo expressivo e leal, despertando desejo e poder. Transformando cuidado com a pele em um ritual de autoestima. Tem quem diga que é afrodisíaco.</p><p>A fórmula desliza facilmente, proporciona aplicação uniforme, tem rápida absorção e resiste à água e ao suor sem deixar resíduos oleosos.</p><p className="text-sm">Óleo de urucum, buriti, coco, cenoura, aloe vera e amêndoas doce, e vitamina E.</p></div><div className="mt-5 flex flex-wrap items-center gap-5"><Button variant="brand" size="lg" className="h-12 rounded-lg px-7 text-xs font-semibold uppercase" onClick={() => add("pack-001")}><ShoppingBag />Adicionar Pack 001</Button><Link to="/produto" search={{ pack: "pack-001" }} className="text-xs font-semibold uppercase underline underline-offset-4">Comprar agora</Link><span className="text-lg font-semibold">{packs[0]?.price}</span>{packs[0] ? <span className="text-xs text-muted-foreground">{installmentText(packs[0].price)}</span> : null}</div></div></div>
        <img src={single} alt="Frasco Coco Honey Bronze" loading="lazy" className="h-[38svh] w-full bg-secondary object-cover lg:h-screen-section" />
      </section>
    </main>
    <section className="screen-section border-t border-foreground/15 bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] section-pad px-6 md:px-12">
        <p className="header-label text-muted-foreground">O QUE A COCO HONEY DESPERTA</p>
        <h2 className="mt-6 max-w-4xl font-serif display-serif italic leading-[0.95]">Desejo e poder, com saúde e proteção</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {[["AUTOESTIMA", "Aumente sua autoestima com um bronze que valoriza sua pele e sua presença desde a primeira aplicação."], ["20 MINUTOS", "Bronzeado saudável em 20 minutos de sol. Ativadores naturais aceleram a melanina sem agredir a pele."], ["NATURAL", "Fórmula natural, vegana e sem parabenos. Cuidado real para quem ama pele, sol e ingredientes transparentes."]].map(([title, text]) => <div key={title} className="border-t border-foreground/15 pt-6"><h3 className="text-2xl font-semibold uppercase md:text-3xl">{title}</h3><p className="mt-4 text-base leading-relaxed text-muted-foreground">{text}</p></div>)}
        </div>
      </div>
    </section>
    <section className="screen-section border-t border-foreground/15 bg-background">
      <div className="mx-auto max-w-[1600px] section-pad px-6 md:px-12">
        <p className="header-label text-muted-foreground">POR QUE COCO HONEY BRONZE</p>
        <h2 className="mt-6 max-w-4xl display-1 font-semibold uppercase leading-none">A escolha consciente</h2>
        <p className="mt-5 hidden max-w-2xl text-base leading-relaxed text-muted-foreground sm:block">Estudos dermatológicos apontam que filtros químicos como oxibenzona e derivados de petróleo podem irritar e ressecar a pele. Comparativo com a composição comum de bronzeadores tradicionais — sem citar marcas.</p>
        {/* Tabela comparativa de verdade: uma linha por atributo, os dois lados lado a lado.
            Antes eram duas colunas de sete itens que, no celular, viravam catorze blocos
            empilhados -- e comparar exigia rolar de um lado ao outro de memoria. */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-foreground/15">
          <div className="grid grid-cols-2 divide-x divide-foreground/15 border-b border-foreground/15">
            <div className="flex items-center gap-2 bg-background px-3 py-2.5 md:px-6"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-foreground text-background"><Check className="h-3 w-3" /></span><h3 className="header-brand text-[10px] md:text-xs">COCO HONEY</h3></div>
            <div className="flex items-center gap-2 bg-secondary/60 px-3 py-2.5 md:px-6"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-foreground/25 text-muted-foreground"><X className="h-3 w-3" /></span><h3 className="header-brand text-[10px] text-muted-foreground md:text-xs">OUTROS</h3></div>
          </div>
          {([["BASE", "Óleos vegetais naturais", "Óleo mineral e derivados de petróleo"],
             ["FILTROS", "Sem oxibenzona nem octinoxato", "Oxibenzona e derivados"],
             ["CONSERVANTES", "Sem parabenos", "Parabenos e sintéticos"],
             ["ORIGEM", "Natural e vegano", "Ingredientes de origem animal"],
             ["HIDRATAÇÃO", "Vitamina E, aloe vera e amêndoas", "Resseca a pele depois do sol"],
             ["BRONZE", "Uniforme e duradouro", "Irregular, marca manchas"],
             ["TESTES", "Dermatologicamente testado", "Testado em animais"]] as const).map(([label, nosso, outros]) => (
            <div key={label} className="border-t border-foreground/15 first:border-t-0">
              <p className="px-3 pt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:px-6 md:pt-3 md:text-[10px]">{label}</p>
              <div className="grid grid-cols-2 divide-x divide-foreground/15">
                <p className="px-3 pb-2 pt-0.5 text-[13px] font-semibold leading-snug md:px-6 md:pb-3 md:text-base">{nosso}</p>
                <p className="px-3 pb-2 pt-0.5 text-[13px] leading-snug text-muted-foreground line-through decoration-foreground/40 md:px-6 md:pb-3 md:text-base">{outros}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <ReviewsSection />
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/20 bg-background/95 px-3 pb-[max(.6rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden"><div className="flex items-center gap-2"><div className="flex gap-1">{packs.map((pack) => <Button key={pack.slug} variant={pack.slug === selected ? "brand" : "outline"} size="sm" className="rounded-lg px-2" onClick={() => setSelected(pack.slug)}>{pack.shortName}</Button>)}</div><p className="ml-auto flex flex-col items-end whitespace-nowrap text-xs font-semibold"><span className="flex items-baseline gap-1.5">{active.comparePrice ? <span className="text-[10px] font-normal text-muted-foreground line-through">{active.comparePrice}</span> : null}{active.price}</span><span className="text-[9px] font-normal text-muted-foreground">{installmentShort(active.price)} sem juros</span></p><Button variant="brand" className="h-10 rounded-lg px-3 text-[10px] uppercase" onClick={() => buyNow()}><ShoppingBag />Comprar</Button></div></div>
    <Footer />
  </div>;
}