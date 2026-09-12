import { useCallback, useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Check, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rememberContact, subscribeContact } from "@/lib/shopify";

const KEY = "coco-newsletter";
const DELAY = 15_000;
const COUPON = "HONEYBRONZE";
/** Fração da superfície raspada que basta para revelar o resto sozinho. */
const REVEAL_AT = 0.45;

const digits = (value: string) => value.replace(/\D/g, "");
const validEmail = (value: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
const validPhone = (value: string) => digits(value).length >= 10 && digits(value).length <= 11;

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

/**
 * Superfície raspável. É uma revelação, não um sorteio — o prêmio é o mesmo para todo
 * mundo e o texto nunca diz que a pessoa "ganhou" de alguém. Quem não puder arrastar
 * (teclado, leitor de tela, mão ocupada) revela pelo botão.
 */
function ScratchCard({ onReveal, revealed, children }: { onReveal: () => void; revealed: boolean; children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const checks = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(ratio, ratio);
    const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#e2e5ea");
    gradient.addColorStop(0.5, "#b9bec7");
    gradient.addColorStop(1, "#d5d9df");
    context.fillStyle = gradient;
    context.fillRect(0, 0, rect.width, rect.height);
  }, [revealed]);

  const scratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !drawing.current || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext("2d");
    if (!context) return;
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(event.clientX - rect.left, event.clientY - rect.top, 22, 0, Math.PI * 2);
    context.fill();

    // Medir custa caro: só a cada punhado de movimentos.
    checks.current += 1;
    if (checks.current % 8 !== 0) return;
    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    for (let i = 3; i < data.length; i += 16) if (data[i] === 0) clear += 1;
    if (clear / (data.length / 16) > REVEAL_AT) onReveal();
  };

  return (
    <div className="relative h-32 w-full select-none overflow-hidden rounded-lg border border-foreground/20 bg-secondary">
      <div className="absolute inset-0 grid place-items-center px-4 text-center">{children}</div>
      <canvas
        ref={canvasRef}
        aria-label="Raspe para ver seu presente"
        className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-500 ${revealed ? "pointer-events-none opacity-0" : "cursor-grab"}`}
        onPointerDown={(event) => { drawing.current = true; event.currentTarget.setPointerCapture(event.pointerId); scratch(event); }}
        onPointerMove={scratch}
        onPointerUp={() => { drawing.current = false; }}
        onPointerLeave={() => { drawing.current = false; }}
      />
    </div>
  );
}

export function NewsletterPopup() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fora do checkout: quem já está pagando não pode ser interrompido.
  const allowed = !pathname.startsWith("/checkout");

  useEffect(() => {
    if (!allowed) return;
    // ?popup=1 abre na hora, mesmo para quem já viu. Sem isso não há como conferir o
    // popup duas vezes no mesmo navegador — o registro de "já viu" é justamente o que
    // impede a pessoa de ser importunada de novo.
    const forced = new URLSearchParams(window.location.search).has("popup");
    if (!forced && alreadySeen()) return;
    const timer = window.setTimeout(() => setOpen(true), forced ? 0 : DELAY);
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
    const mail = email.trim();
    const tel = phone.trim();
    const hasEmail = validEmail(mail);
    // O telefone só conta como contato se a pessoa autorizou o WhatsApp. Guardar número
    // sem aceite seria juntar dado que não se pode usar.
    const hasPhone = validPhone(tel) && whatsapp;

    if (!hasEmail && !hasPhone) {
      setError(tel && !whatsapp ? "Marque a caixinha do WhatsApp ou deixe seu e-mail." : "Deixe seu e-mail para receber o cupom.");
      return;
    }
    setError(null);
    setSending(true);

    rememberContact({ ...(hasEmail ? { email: mail } : {}), ...(hasPhone ? { phone: tel } : {}) });
    try {
      await subscribeContact({ ...(hasEmail ? { email: mail } : {}), ...(hasPhone ? { phone: tel } : {}) });
    } catch (cause) {
      console.error("Falha ao cadastrar o contato na Shopify", cause);
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
    <div className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto sm:items-center" role="dialog" aria-modal="true" aria-labelledby="newsletter-title">
      <button className="absolute inset-0 h-full w-full bg-foreground/25" onClick={close} aria-label="Fechar" />
      <div className="relative my-auto w-full max-w-md border border-foreground/20 bg-background px-7 pb-8 pt-10 sm:px-9">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={close} aria-label="Fechar"><X /></Button>

        {done ? (
          <div>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-foreground/25"><Check className="h-5 w-5" /></span>
            <h2 id="newsletter-title" className="mt-7 text-4xl font-semibold uppercase leading-none">Seu presente</h2>
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
            <h2 id="newsletter-title" className="mt-4 text-4xl font-semibold uppercase leading-none">
              {revealed ? "10% na primeira compra" : "Raspe para ver seu presente"}
            </h2>

            <div className="mt-6">
              <ScratchCard revealed={revealed} onReveal={() => setRevealed(true)}>
                <div>
                  <p className="text-4xl font-semibold leading-none">10% OFF</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">no seu primeiro pedido</p>
                </div>
              </ScratchCard>
              {revealed ? null : (
                <button onClick={() => setRevealed(true)} className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground underline underline-offset-4">
                  Revelar sem raspar
                </button>
              )}
            </div>

            {revealed ? (
              <div className="mt-6">
                <p className="text-sm leading-relaxed text-muted-foreground">Diga para onde mandamos o código.</p>
                <input
                  type="email" inputMode="email" autoComplete="email" placeholder="seu@email.com"
                  value={email} maxLength={255}
                  onChange={(event) => setEmail(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && void submit()}
                  className="mt-4 h-12 w-full rounded-lg border border-foreground/25 bg-transparent px-4 text-sm outline-none focus:border-foreground"
                />
                <input
                  type="tel" inputMode="tel" autoComplete="tel" placeholder="WhatsApp (opcional)"
                  value={phone} maxLength={20}
                  onChange={(event) => setPhone(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && void submit()}
                  className="mt-3 h-12 w-full rounded-lg border border-foreground/25 bg-transparent px-4 text-sm outline-none focus:border-foreground"
                />
                <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-[11px] leading-relaxed text-muted-foreground">
                  <input type="checkbox" checked={whatsapp} onChange={(event) => setWhatsapp(event.target.checked)} className="mt-0.5 accent-foreground" />
                  <span>Quero receber novidades da Coco Honey no WhatsApp.</span>
                </label>
                {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
                <Button variant="silver" className="mt-4 h-12 w-full rounded-lg text-xs font-semibold uppercase" onClick={() => void submit()} disabled={sending}>
                  {sending ? "Enviando" : "Quero meu presente"}
                </Button>
                <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                  Ao continuar, você aceita receber novidades por e-mail. Dá para sair quando quiser.
                </p>
              </div>
            ) : (
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Arraste sobre a área acima com o dedo ou o mouse.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
