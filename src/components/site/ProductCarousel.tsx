import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/lib/catalog";
import { hasFreeShipping, installmentText, perBottle } from "@/lib/cart";

export function ProductCarousel() {
  const { packs } = useCatalog();
  const ref = useRef<HTMLDivElement>(null);
  const move = (direction: number) => ref.current?.scrollBy({ left: direction * (ref.current.clientWidth * 0.82), behavior: "smooth" });
  return <div>
    <div ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{packs.map((pack) => <Link key={pack.slug} to="/produto" search={{ pack: pack.slug }} className="group w-[82%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]">
      <div className="overflow-hidden bg-secondary"><img src={pack.image} alt={pack.name} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /></div>
      <div className="mt-4 flex items-start justify-between gap-4"><div><h3 className="text-sm font-semibold uppercase">{pack.name}</h3><p className="mt-1 text-xs text-muted-foreground">{pack.quantity}</p>{pack.badge ? <p className="header-label mt-2">{pack.badge}</p> : null}{hasFreeShipping(pack) ? <p className="header-label mt-1.5 flex items-center gap-1.5"><Truck className="h-3 w-3" />FRETE GRÁTIS</p> : null}</div><div className="text-right"><p className="text-sm font-semibold">{pack.price}</p>{perBottle(pack) ? <p className="mt-0.5 text-xs font-medium">{perBottle(pack)} por frasco</p> : null}<p className="mt-0.5 text-[10px] text-muted-foreground">{installmentText(pack.price)}</p>{pack.comparePrice ? <p className="text-xs text-muted-foreground line-through">{pack.comparePrice}</p> : null}</div></div>
    </Link>)}</div>
    <div className="mt-6 flex gap-2"><Button variant="outline" size="icon" onClick={() => move(-1)} aria-label="Produto anterior"><ChevronLeft /></Button><Button variant="outline" size="icon" onClick={() => move(1)} aria-label="Próximo produto"><ChevronRight /></Button></div>
  </div>;
}