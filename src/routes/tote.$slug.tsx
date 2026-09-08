import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { addons } from "@/lib/products";
import { useCatalog } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/tote/$slug")({
  head: ({ params }) => {
    const bag = addons.find((item) => item.slug === params.slug);
    return {
      meta: [
        { title: bag ? `${bag.name} — COCO HONEY BRAZIL` : "Tote Bag — COCO HONEY BRAZIL" },
        { name: "description", content: "Tote Bag COCO HONEY BRAZIL · 100% algodão · 54cm x 63cm · bolso interno." },
        { property: "og:title", content: bag ? `${bag.name} — COCO HONEY BRAZIL` : "Tote Bag — COCO HONEY BRAZIL" },
        { property: "og:description", content: "Tote Bag COCO HONEY BRAZIL · 100% algodão · 54cm x 63cm · bolso interno." },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TotePage,
});

function TotePage() {
  const { slug } = Route.useParams();
  const catalog = useCatalog();
  const bag = catalog.addons.find((item) => item.slug === slug);
  const cart = useCart();
  if (!bag) throw notFound();

  return (
    <div className="min-h-screen">
      <Header bagCount={cart.count} onBagOpen={() => {}} />
      <main className="mx-auto max-w-[1500px] px-5 py-8 md:px-8 md:py-12">
        <Link to="/produto" search={{ pack: "pack-003" }} className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />Voltar para o shop
        </Link>
        <section className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-[1.1fr_.9fr]">
          <div className="group relative aspect-square overflow-hidden bg-secondary">
            <img src={bag.image} alt={bag.name} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
            {bag.hoverImage ? <img src={bag.hoverImage} alt={`${bag.name} — lifestyle`} className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" /> : null}
          </div>
          <div className="flex flex-col justify-center md:py-8">
            <p className="header-label text-muted-foreground">COCO HONEY BRAZIL · ACESSÓRIO</p>
            <h1 className="mt-4 text-4xl font-semibold uppercase leading-none md:text-6xl">{bag.name}</h1>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              Tote bag em 100% algodão, com bolso interno e alças resistentes. Perfeita para levar o óleo, o beachwear e tudo que o verão pede.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>100% algodão</li>
              <li>54cm x 63cm</li>
              <li>Bolso interno</li>
            </ul>
            <p className="mt-8 text-3xl font-semibold">{bag.price}</p>
            <Button variant="silver" className="mt-6 h-14 w-full rounded-lg text-xs font-semibold uppercase" onClick={() => cart.add(bag.slug)} disabled={bag.soldOut}>
              <ShoppingBag />{bag.soldOut ? "Esgotado" : "Adicionar à sacola"}
            </Button>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              {["100% algodão", "Bolso interno", "Alças resistentes", "Edição limitada"].map((item) => (
                <span key={item} className="flex items-center gap-2 border-t border-foreground/15 pt-3">{item}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
