import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Loader2, Lock, Minus, Plus, Trash2, Truck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/lib/catalog";
import { FreeShippingBar, SavingsNudge, UpgradeNudge } from "@/components/site/FreeShipping";
import { createCheckoutUrl, rememberedEmail } from "@/lib/shopify";
import { formatPrice, installmentShort, parsePrice, shippingFor, stateForZip, useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Sua sacola — Coco Honey Brazil" },
      { name: "description", content: "Revise sua sacola Coco Honey Bronze e finalize o pedido no checkout seguro." },
      { property: "og:title", content: "Sua sacola — Coco Honey Brazil" },
      { property: "og:description", content: "Revise sua sacola Coco Honey Bronze e finalize o pedido com entrega para todo o Brasil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const field = "mt-1 h-11 w-full rounded-lg border border-foreground/25 bg-transparent px-3 text-sm outline-none focus:border-foreground";
const labelClass = "header-label text-muted-foreground";

function CheckoutPage() {
  const { addons } = useCatalog();
  const cart = useCart();
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const state = stateForZip(zip);
  const shipping = useMemo(() => (state ? shippingFor(state, cart.items) : null), [state, cart.items]);
  const total = cart.subtotal + (shipping?.price ?? 0);

  const goToPayment = async () => {
    setError(null);
    setLoading(true);
    try {
      window.location.href = await createCheckoutUrl(cart.items.map((item) => ({ variantId: item.pack.variantId, qty: item.qty })), rememberedEmail());
    } catch (cause) {
      console.error("Falha ao criar o checkout na Shopify", cause);
      setError("Não conseguimos abrir o pagamento agora. Tente de novo em instantes.");
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header bagCount={0} />
        <main className="mx-auto max-w-2xl px-6 py-24 text-center md:px-8">
          <h1 className="text-5xl font-semibold uppercase leading-none md:text-6xl">Sua sacola está vazia</h1>
          <p className="mt-6 text-muted-foreground">Escolha um pack para começar seu bronze.</p>
          <Link to="/produto" search={{ pack: "pack-003" }} className="mt-10 inline-block text-xs font-semibold uppercase underline underline-offset-4">Ver os packs</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header bagCount={cart.count} />
      <main className="mx-auto grid max-w-[1500px] gap-12 px-6 py-14 md:px-8 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <h1 className="text-5xl font-semibold uppercase leading-none md:text-6xl">Sua sacola</h1>

          <FreeShippingBar className="mt-8" />
          <SavingsNudge className="mt-5" />
          <UpgradeNudge className="mt-5" />

          <ul className="mt-8 divide-y divide-foreground/15 border-y border-foreground/15">
            {cart.items.map((item) => (
              <li key={item.pack.slug} className="flex gap-4 py-5">
                <img src={item.pack.image} alt={item.pack.name} className="h-24 w-24 rounded-lg bg-secondary object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase">{item.pack.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.pack.quantity}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-7 w-7 rounded-lg" aria-label="Diminuir" onClick={() => cart.setQty(item.pack.slug, item.qty - 1)}><Minus className="h-3 w-3" /></Button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <Button variant="outline" size="icon" className="h-7 w-7 rounded-lg" aria-label="Aumentar" onClick={() => cart.setQty(item.pack.slug, item.qty + 1)}><Plus className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="ml-auto h-7 w-7" aria-label="Remover" onClick={() => cart.remove(item.pack.slug)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
                <p className="text-sm font-semibold">{formatPrice(parsePrice(item.pack.price) * item.qty)}</p>
              </li>
            ))}
          </ul>

          <section className="mt-10">
            <p className={labelClass}>COMPLETE O SEU PEDIDO</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {addons.map((addon) => {
                const inCart = cart.items.some((item) => item.pack.slug === addon.slug);
                return (
                  <div key={addon.slug} className={`rounded-lg border p-3 transition-colors ${inCart ? "border-foreground" : "border-foreground/25"}`}>
                    <img src={addon.image} alt={addon.name} className="aspect-square w-full rounded-md bg-secondary object-cover" />
                    <p className="mt-3 text-sm font-semibold uppercase">{addon.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{addon.quantity} · {addon.price} · {installmentShort(addon.price)} sem juros</p>
                    <Button variant={inCart ? "outline" : "silver"} className="mt-3 h-10 w-full rounded-lg text-[10px] font-semibold uppercase" disabled={!inCart && addon.soldOut} onClick={() => (inCart ? cart.remove(addon.slug) : cart.add(addon.slug))}>
                      {inCart ? "Remover" : addon.soldOut ? "Esgotado" : "Adicionar"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-10 border-t border-foreground/15 pt-6">
            <p className={`${labelClass} flex items-center gap-2`}><Truck className="h-3.5 w-3.5" />ESTIMATIVA DE FRETE</p>
            <input inputMode="numeric" maxLength={9} placeholder="Seu CEP" value={zip} onChange={(event) => setZip(event.target.value)} className={`${field} max-w-40`} />
            {zip.replace(/\D/g, "").length === 8 && !shipping ? <p className="mt-3 text-xs text-destructive">CEP inválido. Confira os 8 dígitos.</p> : null}
            {shipping ? (
              <div className="mt-3 flex items-center justify-between rounded-lg border border-foreground/25 px-4 py-3 text-sm">
                <span>{shipping.label} · <span className="text-muted-foreground">{shipping.days}</span></span>
                <span className="font-semibold">{shipping.price === 0 ? "GRÁTIS" : formatPrice(shipping.price)}</span>
              </div>
            ) : null}
            <p className="mt-3 text-xs text-muted-foreground">O valor definitivo do frete é calculado no checkout, a partir do endereço completo.</p>
          </section>
        </div>

        <aside className="h-fit border-t border-foreground/20 pt-6 lg:sticky lg:top-24">
          <p className={labelClass}>RESUMO</p>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(cart.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Frete{shipping?.freeShipping ? " (grátis)" : " estimado"}</dt><dd>{shipping ? (shipping.price === 0 ? "GRÁTIS" : formatPrice(shipping.price)) : "—"}</dd></div>
            <div className="flex justify-between border-t border-foreground/20 pt-3 text-lg font-semibold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
          <Button variant="silver" className="mt-8 h-14 w-full rounded-lg text-xs font-semibold uppercase" onClick={goToPayment} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Lock />}
            {loading ? "Abrindo pagamento" : "Ir para o pagamento"}
          </Button>
          {error ? <p className="mt-3 text-xs text-destructive">{error}</p> : null}
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            O pagamento acontece no ambiente seguro da Shopify: Pix com aprovação imediata ou cartão de crédito em até 3x sem juros. Endereço e dados de entrega são preenchidos lá — sem precisar criar conta.
          </p>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
