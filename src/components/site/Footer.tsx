import { Link } from "@tanstack/react-router";
import wordmark from "@/assets/coco-wordmark-banner.png.asset.json";

export function Footer() {
  return <footer className="border-t border-foreground/15 bg-background">
    <Link to="/produto" search={{ pack: "pack-003" }} className="block overflow-hidden border-b border-foreground/15 bg-background"><img src={wordmark.url} alt="COCO Honey Brazil" loading="lazy" className="h-[36vw] min-h-64 max-h-[580px] w-full object-cover grayscale" /></Link>
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-8 text-[10px] font-semibold uppercase md:flex-row md:items-end md:justify-between md:px-8">
      <div><p>Santa Catarina · Brasil</p><p className="mt-2 text-muted-foreground">© 2026 COCO HONEY BRAZIL®</p></div>
      <div className="flex flex-wrap gap-x-7 gap-y-3"><a href="https://www.cocohoneybrazil.com.br/policies/privacy-policy" target="_blank" rel="noreferrer">Política de privacidade</a><a href="https://www.cocohoneybrazil.com.br/policies/refund-policy" target="_blank" rel="noreferrer">Política de reembolso</a><a href="https://www.instagram.com/cocohoneybrazil/" target="_blank" rel="noreferrer">Instagram</a></div>
    </div>
  </footer>;
}