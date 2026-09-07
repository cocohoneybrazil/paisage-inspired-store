import { Link } from "@tanstack/react-router";
import { ShieldCheck, Package, CreditCard, RefreshCw, Lock, Instagram } from "lucide-react";

const shopLinks = [
  { to: "/produto", label: "Bronze" },
  { to: "/produto", label: "JOURNAL" },
];

const aboutLinks = [
  { to: "/blog", label: "Our Story" },
  { href: "https://wa.me/5547992031609", label: "CONTATO" },
];

type FooterLink = { to?: string; href?: string; label: string };

const helpLinks: FooterLink[] = [
  { to: "/blog/protetor-solar-ciencia-e-controversias", label: "FAQ" },
  { to: "/blog/helioterapia-poder-curativo-do-sol", label: "RASTREAR MEU PEDIDO" },
  { to: "/trocas", label: "TROCAS E DEVOLUÇÕES" },
];

function PixIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="6" fill="#32BCAD" />
      <path d="M33.07 14.53l-3.6-3.6a2.3 2.3 0 00-3.26 0L24 17.14l-2.21-2.21a2.3 2.3 0 00-3.26 0l-3.6 3.6a2.3 2.3 0 000 3.26l2.21 2.21-5.4 5.4a2.3 2.3 0 000 3.26l3.6 3.6a2.3 2.3 0 003.26 0L24 33.86l2.21 2.21a2.3 2.3 0 003.26 0l3.6-3.6a2.3 2.3 0 000-3.26l-2.21-2.21 5.4-5.4a2.3 2.3 0 000-3.26v-.01z" fill="#fff" />
    </svg>
  );
}

function CardFlag({ brand }: { brand: string }) {
  const colors: Record<string, string> = {
    Visa: "#1A1F71",
    Mastercard: "#EB001B",
    Amex: "#016FD0",
    Elo: "#FFCB05",
    Hiper: "#B8262C",
  };
  return (
    <div className="flex h-8 items-center justify-center rounded-md border border-foreground/10 bg-white px-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: colors[brand] || "#000" }}>
      {brand}
    </div>
  );
}

function AnvisaSeal() {
  return (
    <div className="flex items-center gap-2 rounded-md border border-foreground/10 bg-white px-3 py-1.5">
      <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-foreground/80 text-[8px] font-bold leading-none">ANV</div>
      <span className="text-[9px] font-semibold uppercase leading-tight">Registrado<br />ANVISA</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-foreground/15 bg-background">
      <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-8 md:py-20">
        {/* Brand + tagline */}
        <div className="text-center">
          <p className="text-3xl font-semibold uppercase tracking-[0.04em] md:text-5xl">COCO HONEY BRAZIL</p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground md:text-xs">THE MAGIC POTION OF SUMMER</p>
        </div>

        {/* Navigation columns */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Shop</p>
            <ul className="mt-5 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm font-semibold uppercase hover:opacity-55">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">About</p>
            <ul className="mt-5 space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a href={link.href} target="_blank" rel="noreferrer" className="text-sm font-semibold uppercase hover:opacity-55">{link.label}</a>
                  ) : (
                    <Link to={link.to!} className="text-sm font-semibold uppercase hover:opacity-55">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Help</p>
            <ul className="mt-5 space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a href={link.href} target="_blank" rel="noreferrer" className="text-sm font-semibold uppercase hover:opacity-55">{link.label}</a>
                  ) : (
                    <Link to={link.to!} className="text-sm font-semibold uppercase hover:opacity-55">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Social</p>
            <a href="https://www.instagram.com/cocohoneybrazil/" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase hover:opacity-55">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-14 border-y border-foreground/10 py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: ShieldCheck, label: "COMPRA SEGURA" },
               { icon: Package, label: "ENVIO PARA TODO BRASIL" },
              { icon: CreditCard, label: "PAGAMENTO SEGURO" },
              { icon: RefreshCw, label: "TROCAS E DEVOLUÇÕES" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em]">
                <Icon className="h-4 w-4" /> {label}
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods + security seals */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Visa", "Mastercard", "Amex", "Elo", "Hiper"].map((brand) => (
              <CardFlag key={brand} brand={brand} />
            ))}
            <PixIcon />
            <div className="flex h-8 items-center gap-1.5 rounded-md border border-foreground/10 bg-white px-3 text-[10px] font-semibold uppercase">
              <Lock className="h-3.5 w-3.5" /> SSL
            </div>
          </div>
          <AnvisaSeal />
        </div>

        {/* Legal info */}
        <div className="mt-12 text-center text-[10px] font-medium uppercase leading-relaxed text-muted-foreground md:text-xs">
          <p>CNPJ 53.172.892/0001-74</p>
          <p className="mt-1">Coco Honey Brazil • Blumenau, SC • Brasil</p>
        </div>

        {/* Bottom links + copyright */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-foreground/10 pt-8 md:flex-row md:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-semibold uppercase">
            <Link to="/privacidade" className="hover:opacity-55">Privacidade</Link>
            <a href="https://www.cocohoneybrazil.com.br/policies/terms-of-service" target="_blank" rel="noreferrer" className="hover:opacity-55">Termos</a>
            <Link to="/trocas" className="hover:opacity-55">Trocas</Link>
            <a href="https://www.cocohoneybrazil.com.br/policies/shipping-policy" target="_blank" rel="noreferrer" className="hover:opacity-55">Entregas</a>
             <button type="button" className="hover:opacity-55">COOKIES</button>
          </div>
          <p className="text-[10px] font-semibold uppercase text-muted-foreground">© 2026 COCO HONEY BRAZIL</p>
        </div>
      </div>
    </footer>
  );
}
