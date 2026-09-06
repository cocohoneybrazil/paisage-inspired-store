import { useCallback, useEffect, useState } from "react";
import { packs, type Pack } from "@/lib/products";

export type CartLine = { slug: string; qty: number };
export type CartItem = { pack: Pack; qty: number };

const KEY = "coco-cart";
const EVENT = "coco-cart-change";

export function parsePrice(value: string): number {
  return Math.round(Number(value.replace(/[^\d,]/g, "").replace(",", ".")) * 100);
}

export function formatPrice(cents: number): string {
  return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
}

function read(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((line): line is CartLine =>
        typeof line === "object" && line !== null &&
        typeof (line as CartLine).slug === "string" && typeof (line as CartLine).qty === "number")
      .filter((line) => packs.some((pack) => pack.slug === line.slug) && line.qty > 0)
      .map((line) => ({ slug: line.slug, qty: Math.min(Math.round(line.qty), 20) }));
  } catch {
    return [];
  }
}

function write(lines: CartLine[]) {
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(EVENT));
}

export type Region = "sudeste-sul" | "centro-oeste" | "norte-nordeste";

export const shippingTable: { id: Region; label: string; states: string[]; price: number; days: string }[] = [
  { id: "sudeste-sul", label: "Sul e Sudeste", states: ["SC", "RS", "PR", "SP", "RJ", "MG", "ES"], price: 1990, days: "2 a 5 dias úteis" },
  { id: "centro-oeste", label: "Centro-Oeste", states: ["GO", "DF", "MT", "MS"], price: 2490, days: "4 a 8 dias úteis" },
  { id: "norte-nordeste", label: "Norte e Nordeste", states: ["BA", "SE", "AL", "PE", "PB", "RN", "CE", "PI", "MA", "TO", "PA", "AP", "AM", "RR", "AC", "RO"], price: 2990, days: "6 a 12 dias úteis" },
];

export const brazilianStates = shippingTable.flatMap((zone) => zone.states).sort();

export function zoneForState(state: string) {
  return shippingTable.find((zone) => zone.states.includes(state.toUpperCase()));
}

export function shippingFor(state: string, items: CartItem[]) {
  const zone = zoneForState(state);
  if (!zone) return null;
  const freeShipping = items.some((item) => item.pack.slug === "pack-003") || subtotalOf(items) >= 30000;
  return { ...zone, price: freeShipping ? 0 : zone.price, freeShipping };
}

export function subtotalOf(items: CartItem[]) {
  return items.reduce((total, item) => total + parsePrice(item.pack.price) * item.qty, 0);
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const sync = () => setLines(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((slug: string, qty = 1) => {
    const current = read();
    const existing = current.find((line) => line.slug === slug);
    if (existing) existing.qty = Math.min(existing.qty + qty, 20);
    else current.push({ slug, qty });
    write(current);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    write(read().map((line) => (line.slug === slug ? { ...line, qty } : line)).filter((line) => line.qty > 0));
  }, []);

  const remove = useCallback((slug: string) => write(read().filter((line) => line.slug !== slug)), []);
  const clear = useCallback(() => write([]), []);

  const items: CartItem[] = lines.flatMap((line) => {
    const pack = packs.find((item) => item.slug === line.slug);
    return pack ? [{ pack, qty: line.qty }] : [];
  });

  return { items, count: items.reduce((total, item) => total + item.qty, 0), subtotal: subtotalOf(items), add, setQty, remove, clear };
}
