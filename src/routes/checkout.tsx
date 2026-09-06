import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ChevronLeft, Minus, Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { brazilianStates, formatPrice, parsePrice, shippingFor, useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Coco Honey Brazil" },
      { name: "description", content: "Finalize seu pedido Coco Honey Bronze: dados, endereço, entrega e forma de pagamento." },
      { property: "og:title", content: "Checkout — Coco Honey Brazil" },
      { property: "og:description", content: "Finalize seu pedido Coco Honey Bronze com entrega para todo o Brasil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const digits = (value: string) => value.replace(/\D/g, "");

const customerSchema = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().refine((value) => digits(value).length >= 10 && digits(value).length <= 11, "Telefone inválido"),
  document: z.string().trim().refine((value) => digits(value).length === 11, "CPF deve ter 11 dígitos"),
});

const addressSchema = z.object({
  zip: z.string().trim().refine((value) => digits(value).length === 8, "CEP deve ter 8 dígitos"),
  street: z.string().trim().min(3, "Informe a rua").max(120),
  number: z.string().trim().min(1, "Informe o número").max(10),
  complement: z.string().trim().max(60).optional(),
  district: z.string().trim().min(2, "Informe o bairro").max(80),
  city: z.string().trim().min(2, "Informe a cidade").max(80),
  state: z.string().trim().length(2, "Selecione o estado"),
});

const payments = [
  { id: "pix", label: "Pix", note: "Aprovação imediata. O código será enviado por e-mail." },
  { id: "card", label: "Cartão de crédito", note: "Em até 6x sem juros. Os dados do cartão são pedidos na etapa de pagamento seguro." },
  { id: "boleto", label: "Boleto bancário", note: "Compensação em até 3 dias úteis." },
] as const;

const field = "mt-1 h-11 w-full rounded-lg border border-foreground/25 bg-transparent px-3 text-sm outline-none focus:border-foreground";
const labelClass = "header-label text-muted-foreground";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}

function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useCart();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", document: "" });
  const [address, setAddress] = useState({ zip: "", street: "", number: "", complement: "", district: "", city: "", state: "SC" });
  const [payment, setPayment] = useState<(typeof payments)[number]["id"]>("pix");
  const [order, setOrder] = useState<string | null>(null);

  const shipping = useMemo(() => shippingFor(address.state, cart.items), [address.state, cart.items]);
  const total = cart.subtotal + (shipping?.price ?? 0);

  const validate = (schema: z.ZodTypeAny, value: unknown) => {
    const result = schema.safeParse(value);
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: Record<string, string> = {};
    for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
    setErrors(next);
    return false;
  };

  const submit = () => {
    if (!validate(customerSchema, customer) || !validate(addressSchema, address)) return;
    setOrder(`CHB-${Date.now().toString().slice(-6)}`);
    cart.clear();
  };

  if (order) {
    return (
      <div className="min-h-screen">
        <Header bagCount={0} />
        <main className="mx-auto max-w-2xl px-6 py-24 text-center md:px-8">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-foreground/25"><Check className="h-5 w-5" /></span>
          <p className="header-label mt-8 text-muted-foreground">PEDIDO {order}</p>
          <h1 className="mt-4 text-5xl font-semibold uppercase leading-none md:text-6xl">Recebemos seu pedido</h1>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Enviamos um resumo para {customer.email}. Em seguida você recebe as instruções de pagamento por {payments.find((item) => item.id === payment)?.label.toLowerCase()} e o código de rastreio quando o pacote sair de Santa Catarina.
          </p>
          <Button variant="silver" className="mt-10 h-12 rounded-lg px-8 text-xs font-semibold uppercase" onClick={() => navigate({ to: "/" })}>Voltar à loja</Button>
        </main>
        <Footer />
      </div>
    );
  }

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

  const steps = ["DADOS", "ENTREGA", "PAGAMENTO"];

  return (
    <div className="min-h-screen">
      <Header bagCount={cart.count} />
      <main className="mx-auto grid max-w-[1500px] gap-12 px-6 py-14 md:px-8 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <h1 className="text-5xl font-semibold uppercase leading-none md:text-6xl">Checkout</h1>
          <ol className="mt-8 flex gap-6 border-b border-foreground/15 pb-4">
            {steps.map((item, index) => (
              <li key={item} className={`header-label ${index === step ? "" : "text-muted-foreground"}`}>0{index + 1} {item}</li>
            ))}
          </ol>

          {step === 0 ? (
            <section className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><Field label="NOME COMPLETO" error={errors["name"]}><input className={field} value={customer.name} maxLength={100} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} /></Field></div>
              <Field label="E-MAIL" error={errors["email"]}><input className={field} type="email" value={customer.email} maxLength={255} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} /></Field>
              <Field label="TELEFONE" error={errors["phone"]}><input className={field} inputMode="tel" value={customer.phone} maxLength={20} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} /></Field>
              <Field label="CPF" error={errors["document"]}><input className={field} inputMode="numeric" value={customer.document} maxLength={14} onChange={(event) => setCustomer({ ...customer, document: event.target.value })} /></Field>
              <div className="sm:col-span-2 mt-2">
                <Button variant="silver" className="h-12 w-full rounded-lg text-xs font-semibold uppercase" onClick={() => validate(customerSchema, customer) && setStep(1)}>Continuar para entrega</Button>
              </div>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="mt-10 grid gap-5 sm:grid-cols-6">
              <div className="sm:col-span-2"><Field label="CEP" error={errors["zip"]}><input className={field} inputMode="numeric" value={address.zip} maxLength={9} onChange={(event) => setAddress({ ...address, zip: event.target.value })} /></Field></div>
              <div className="sm:col-span-4"><Field label="RUA" error={errors["street"]}><input className={field} value={address.street} maxLength={120} onChange={(event) => setAddress({ ...address, street: event.target.value })} /></Field></div>
              <div className="sm:col-span-2"><Field label="NÚMERO" error={errors["number"]}><input className={field} value={address.number} maxLength={10} onChange={(event) => setAddress({ ...address, number: event.target.value })} /></Field></div>
              <div className="sm:col-span-4"><Field label="COMPLEMENTO (OPCIONAL)"><input className={field} value={address.complement} maxLength={60} onChange={(event) => setAddress({ ...address, complement: event.target.value })} /></Field></div>
              <div className="sm:col-span-3"><Field label="BAIRRO" error={errors["district"]}><input className={field} value={address.district} maxLength={80} onChange={(event) => setAddress({ ...address, district: event.target.value })} /></Field></div>
              <div className="sm:col-span-2"><Field label="CIDADE" error={errors["city"]}><input className={field} value={address.city} maxLength={80} onChange={(event) => setAddress({ ...address, city: event.target.value })} /></Field></div>
              <div className="sm:col-span-1">
                <Field label="UF" error={errors["state"]}>
                  <select className={field} value={address.state} onChange={(event) => setAddress({ ...address, state: event.target.value })}>
                    {brazilianStates.map((state) => <option key={state} value={state}>{state}</option>)}
                  </select>
                </Field>
              </div>
              <div className="sm:col-span-6 border-t border-foreground/15 pt-6">
                <p className={labelClass}>ENVIO</p>
                <div className="mt-3 flex items-center justify-between rounded-lg border border-foreground/25 px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold uppercase">{shipping?.label ?? "Selecione o estado"}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{shipping?.days}</p>
                  </div>
                  <p className="text-sm font-semibold">{shipping ? (shipping.price === 0 ? "GRÁTIS" : formatPrice(shipping.price)) : "—"}</p>
                </div>
              </div>
              <div className="sm:col-span-6 flex gap-3">
                <Button variant="outline" className="h-12 rounded-lg px-5 text-xs font-semibold uppercase" onClick={() => setStep(0)}><ChevronLeft />Voltar</Button>
                <Button variant="silver" className="h-12 flex-1 rounded-lg text-xs font-semibold uppercase" onClick={() => validate(addressSchema, address) && setStep(2)}>Continuar para pagamento</Button>
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="mt-10">
              <div className="divide-y divide-foreground/15 border-y border-foreground/15">
                {payments.map((item) => (
                  <label key={item.id} className="flex cursor-pointer items-start gap-4 py-5">
                    <input type="radio" name="payment" className="mt-1 accent-foreground" checked={payment === item.id} onChange={() => setPayment(item.id)} />
                    <span>
                      <span className="block text-sm font-semibold uppercase">{item.label}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">{item.note}</span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-8 rounded-lg border border-foreground/20 p-5 text-sm text-muted-foreground">
                <p className="header-label text-foreground">ENTREGA</p>
                <p className="mt-2">{customer.name} · {customer.email}</p>
                <p>{address.street}, {address.number}{address.complement ? ` — ${address.complement}` : ""} · {address.district}</p>
                <p>{address.city}/{address.state} · CEP {address.zip}</p>
              </div>
              <div className="mt-8 flex gap-3">
                <Button variant="outline" className="h-12 rounded-lg px-5 text-xs font-semibold uppercase" onClick={() => setStep(1)}><ChevronLeft />Voltar</Button>
                <Button variant="silver" className="h-12 flex-1 rounded-lg text-xs font-semibold uppercase" onClick={submit}>Finalizar pedido · {formatPrice(total)}</Button>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="h-fit border-t border-foreground/20 pt-6 lg:sticky lg:top-24">
          <p className={labelClass}>SEU PEDIDO</p>
          <ul className="mt-5 divide-y divide-foreground/15 border-y border-foreground/15">
            {cart.items.map((item) => (
              <li key={item.pack.slug} className="flex gap-4 py-5">
                <img src={item.pack.image} alt={item.pack.name} className="h-20 w-20 rounded-lg bg-secondary object-cover" />
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
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(cart.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Frete{shipping?.freeShipping ? " (grátis)" : ""}</dt><dd>{shipping ? (shipping.price === 0 ? "GRÁTIS" : formatPrice(shipping.price)) : "—"}</dd></div>
            <div className="flex justify-between border-t border-foreground/20 pt-3 text-lg font-semibold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
