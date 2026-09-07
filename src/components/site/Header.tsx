import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [{ to: "/", label: "HOME" }, { to: "/produto", label: "SHOP" }, { to: "/blog", label: "JOURNAL" }, { to: "/historia", label: "HISTÓRIA" }] as const;

export function Header({ bagCount = 0, onBagOpen }: { bagCount?: number; onBagOpen?: () => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  return <header className="sticky inset-x-0 top-0 z-40 border-b border-foreground/15 bg-background">
    <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
      <Button variant="ghost" size="icon" className="justify-self-start md:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu /></Button>
      <nav className="hidden items-center gap-8 md:flex">{nav.map((item) => <Link key={item.to} to={item.to} className="header-label hover:opacity-55">{item.label}</Link>)}</nav>
      <Link to="/" className="header-brand whitespace-nowrap">COCO HONEY BRAZIL</Link>
      <div className="flex items-center justify-self-end gap-2">
        <Button variant="ghost" size="icon" onClick={() => setSearch((value) => !value)} aria-label="Buscar"><Search /></Button>
        <Button variant="ghost" size="icon" onClick={onBagOpen} aria-label="Abrir sacola" className="relative"><ShoppingBag />{bagCount > 0 ? <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[9px] text-background">{bagCount}</span> : null}</Button>
      </div>
    </div>
    {search ? <div className="border-t border-foreground/15"><input autoFocus aria-label="Buscar produtos" placeholder="BUSCAR" className="mx-auto block w-full max-w-[1600px] bg-transparent px-5 py-4 text-xs outline-none md:px-8" /></div> : null}
    {open ? <div className="fixed inset-0 z-50 bg-background px-5 md:hidden"><div className="flex h-16 items-center justify-between border-b border-foreground/15"><span className="header-brand">COCO HONEY BRAZIL</span><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Fechar menu"><X /></Button></div><nav className="flex flex-col pt-8">{nav.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b border-foreground/15 py-6 text-4xl font-semibold uppercase">{item.label}</Link>)}</nav></div> : null}
  </header>;
}