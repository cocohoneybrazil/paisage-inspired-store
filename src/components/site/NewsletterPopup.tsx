import { useCallback, useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Check, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rememberEmail, subscribeEmail } from "@/lib/shopify";

const KEY = "coco-newsletter";
const DELAY = 30_000;
const COUPON = "HONEYBRONZE";

function alreadySeen(): boolean {
  try {
    return Boolean(window.localStorage.getItem(KEY));
  } catch {
    return true;
  }
}

function remember(value: "subscribed" | "dismissed") {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // Navegação privada ou cookies bloqueados: o popup só reaparece na próxima visita.
  }
}

export function NewsletterPopup() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fora do checkout: quem já está pagando não pode ser interrompido.
  const allowed = !pathname.startsWith("/checkout");

  useEffect(() => {
    if (!allowed || alreadySeen()) return;
    const timer = window.setTimeout(() => setOpen(true), DELAY);
    return () => window.clearTimeout(timer);
  }, [allowed]);

  const close = useCallback(() => {
    setOpen(false);
    remember(done ? "subscribed" : "dismissed");
  }, [done]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const submit = async () => {
    const trimmed = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setError("Confira seu e-mail.");
      return;
    }
    setError(null);
    setSending(true);
    rememberEmail(trimmed);
    try {
      await subscribeEmail(trimmed);
    } catch (cause) {
      console.error("Falha ao cadastrar o e-mail na Shopify", cause);
    }
    // O cupom aparece de qualquer forma: ele não depende do cadastro ter entrado.
    setSending(false);
    setDone(true);
    remember("subscribed");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="newsletter-title">
      <button className="absolute inset-0 h-full w-full bg-foreground/25" onClick={close} aria-label="Fechar" />
      <div className="relative w-full max-w-md border border-foreground/20 bg-background px-7 pb-8 pt-10 sm:px-9">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={close} aria-label="Fechar"><X /></Button>

        {done ? (
          <div>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-foreground/25"><Check className="h-5 w-5" /></span>
            <h2 id="newsletter-title" className="mt-7 text-4xl font-semibold uppercase leading-none">Seu desconto</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Use este código no pagamento para tirar 10% do seu primeiro pedido.</p>
            <button onClick={copy} className="mt-6 flex w-full items-center justify-between rounded-lg border border-foreground/25 px-4 py-4 text-left transition-colors hover:border-foreground">
              <span className="text-lg font-semibold tracking-[0.18em]">{COUPON}</span>
              <span className="flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground">
                {copied ? <><Check className="h-3.5 w-3.5" />Copiado</> : <><Copy className="h-3.5 w-3.5" />Copiar</>}
              </span>
            </button>
            <Button variant="silver" className="mt-4 h-12 w-full rounded-lg text-xs font-semibold uppercase" onClick={close}>Continuar comprando</Button>
          </div>
        ) : (
          <div>
            <p className="header-label text-muted-foreground">COCO HONEY BRAZIL</p>
            <h2 id="newsletter-title" className="mt-5 text-5xl font-semibold uppercase leading-none">10% na primeira compra</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Deixe seu e-mail e o código aparece aqui na hora — vale no seu primeiro pedido.</p>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="seu@email.com"
              value={email}
              maxLength={255}
              onChange={(event) => setEmail(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && void submit()}
              className="mt-6 h-12 w-full rounded-lg border border-foreground/25 bg-transparent px-4 text-sm outline-none focus:border-foreground"
            />
            {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
            <Button variant="silver" className="mt-3 h-12 w-full rounded-lg text-xs font-semibold uppercase" onClick={() => void submit()} disabled={sending}>
              {sending ? "Enviando" : "Quero meu desconto"}
            </Button>
            <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
              Ao continuar, você aceita receber novidades da Coco Honey Brazil. Dá para sair quando quiser.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
