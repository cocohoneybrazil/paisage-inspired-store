import { Check, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/lib/catalog";
import { FREE_SHIPPING_THRESHOLD, cheaperCombination, formatPrice, parsePrice, useCart } from "@/lib/cart";

/**
 * Barra de progresso até o frete grátis. O valor que falta aparece em reais em vez de
 * porcentagem: "faltam R$ 80,00" é uma instrução, "73%" é só um número.
 */
export function FreeShippingBar({ className = "" }: { className?: string }) {
  const cart = useCart();
  if (cart.items.length === 0) return null;

  const missing = FREE_SHIPPING_THRESHOLD - cart.subtotal;
  const unlocked = missing <= 0;
  const progress = Math.min(cart.subtotal / FREE_SHIPPING_THRESHOLD, 1);

  return (
    <div className={className}>
      <p className="header-label flex items-center gap-2">
        {unlocked ? (
          <><Check className="h-3.5 w-3.5" />FRETE GRÁTIS DESBLOQUEADO</>
        ) : (
          <><Truck className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-muted-foreground">FALTAM</span> {formatPrice(missing)} <span className="text-muted-foreground">PARA O FRETE GRÁTIS</span></>
        )}
      </p>
      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-foreground/12">
        <div className="h-full rounded-full bg-foreground transition-[width] duration-500 ease-out" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

/**
 * Avisa quando os mesmos frascos sairiam mais barato em outra combinação de packs —
 * dois Pack 001 custam R$ 238, e os mesmos dois frascos saem por R$ 226 no Pack 002.
 * Deixar o cliente pagar a mais sem avisar é o tipo de coisa que ele descobre depois.
 */
export function SavingsNudge({ className = "" }: { className?: string }) {
  const cart = useCart();
  const { packs } = useCatalog();

  const better = cheaperCombination(cart.items, packs);
  if (!better) return null;

  const description = better.lines
    .map((line) => (line.qty > 1 ? `${line.qty}× ${line.pack.name}` : line.pack.name))
    .join(" + ");

  const swap = () => {
    for (const pack of packs) cart.setQty(pack.slug, 0);
    for (const line of better.lines) cart.add(line.pack.slug, line.qty);
  };

  return (
    <div className={`flex items-center gap-4 border border-foreground bg-secondary/60 p-3 ${className}`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-foreground/25"><Sparkles className="h-4 w-4" /></span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold uppercase">Os mesmos {better.bottles} frascos por menos</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Trocando para {description}, você economiza {formatPrice(better.saving)}</p>
      </div>
      <Button variant="brand" size="sm" className="h-9 shrink-0 rounded-lg px-4 text-[10px] font-semibold uppercase" onClick={swap}>Trocar</Button>
    </div>
  );
}

/**
 * Empurra quem está com o Pack 001 para o Pack 002 — a troca que fecha a régua sozinha.
 * Só aparece quando ela de fato resolve: com o Pack 001 na sacola e o frete ainda pago.
 */
export function UpgradeNudge({ className = "" }: { className?: string }) {
  const cart = useCart();
  const { packs } = useCatalog();

  // Economizar vem antes de gastar mais: se a sacola já tem uma combinação melhor
  // disponível, quem fala é a SavingsNudge.
  if (cheaperCombination(cart.items, packs)) return null;

  const single = cart.items.find((item) => item.pack.slug === "pack-001");
  const duo = packs.find((pack) => pack.slug === "pack-002");
  if (!single || !duo || duo.soldOut) return null;
  if (cart.subtotal >= FREE_SHIPPING_THRESHOLD) return null;

  const upgraded = cart.subtotal - parsePrice(single.pack.price) + parsePrice(duo.price);
  if (upgraded < FREE_SHIPPING_THRESHOLD) return null;

  const difference = parsePrice(duo.price) - parsePrice(single.pack.price);
  const swap = () => {
    cart.setQty(single.pack.slug, single.qty - 1);
    cart.add(duo.slug);
  };

  return (
    <div className={`flex items-center gap-4 border border-foreground p-3 ${className}`}>
      <img src={duo.image} alt={duo.name} className="h-16 w-16 shrink-0 rounded-md bg-secondary object-cover" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold uppercase">Leve o {duo.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{duo.quantity} · por mais {formatPrice(difference)}</p>
        <p className="mt-1 text-xs font-semibold">e o frete sai de graça</p>
      </div>
      <Button variant="brand" size="sm" className="h-9 shrink-0 rounded-lg px-4 text-[10px] font-semibold uppercase" onClick={swap}>Trocar</Button>
    </div>
  );
}

/**
 * A régua de recompensa de quem está no Pack 002. O frete grátis não entra como
 * prêmio a conquistar — nesse valor ele já está garantido, e dizer o contrário é
 * mentira que o cliente confere no próprio resumo. Ele aparece marcado como passo
 * vencido, e o alvo seguinte vira a Sun Bag do Pack 003.
 *
 * O empurrão é honesto: o terceiro frasco custa a diferença entre os dois packs,
 * menos do que o frasco avulso, e a bolsa vai junto.
 */
export function SunBagLadder({ className = "" }: { className?: string }) {
  const cart = useCart();
  const { packs } = useCatalog();

  // Economizar vem antes de gastar mais, como na UpgradeNudge.
  if (cheaperCombination(cart.items, packs)) return null;

  const duo = cart.items.find((item) => item.pack.slug === "pack-002");
  const trio = packs.find((pack) => pack.slug === "pack-003");
  const single = packs.find((pack) => pack.slug === "pack-001");
  if (!duo || !trio || trio.soldOut) return null;
  // Quem já tem um Pack 003 na sacola já tem a Sun Bag: não há nível a desbloquear.
  if (cart.items.some((item) => item.pack.slug === "pack-003")) return null;

  const difference = parsePrice(trio.price) - parsePrice(duo.pack.price);
  if (difference <= 0) return null;

  const bottle = single ? parsePrice(single.price) : 0;
  const unlocked = cart.subtotal >= FREE_SHIPPING_THRESHOLD;
  const missing = FREE_SHIPPING_THRESHOLD - cart.subtotal;

  const swap = () => {
    cart.setQty(duo.pack.slug, duo.qty - 1);
    cart.add(trio.slug);
  };

  return (
    <div className={`border border-foreground ${className}`}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 p-3">
        <img src={trio.image} alt={trio.name} className="h-16 w-16 shrink-0 rounded-md bg-secondary object-cover" />
        <div className="min-w-0 flex-1">
          <p className="header-label text-muted-foreground">PRÓXIMO NÍVEL</p>
          <p className="mt-1 text-sm font-semibold uppercase">Leve a Sun Bag</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {bottle > difference
              ? <>Trocando para o {trio.name}: o terceiro frasco por {formatPrice(difference)} em vez de {formatPrice(bottle)}</>
              : <>Trocando para o {trio.name}, por mais {formatPrice(difference)}</>}
          </p>
        </div>
        <Button variant="brand" size="sm" className="h-9 w-full shrink-0 rounded-lg px-4 text-[10px] font-semibold uppercase sm:w-auto" onClick={swap}>Trocar</Button>
      </div>
      <ul className="divide-y divide-foreground/15 border-t border-foreground/15">
        <li className="flex items-center gap-2.5 px-3 py-2 text-xs">
          <Check className="h-3.5 w-3.5 shrink-0" />
          {unlocked
            ? <><span className="font-semibold uppercase">Frete grátis</span><span className="text-muted-foreground">já garantido nesta sacola</span></>
            : <><span className="font-semibold uppercase">Frete grátis</span><span className="text-muted-foreground">faltam {formatPrice(missing)} — a troca resolve</span></>}
        </li>
        <li className="flex items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground">
          <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-foreground/35" />
          <span className="font-semibold uppercase text-foreground">Sun Bag CHB</span>
          <span>só no Pack 003</span>
        </li>
      </ul>
    </div>
  );
}
