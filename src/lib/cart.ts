import { useCallback, useEffect, useState } from "react";
import { useCatalog } from "@/lib/catalog";
import { parsePrice } from "@/lib/price";
import type { Pack } from "@/lib/products";

export { formatAmount, formatPrice, installmentShort, installmentText, parsePrice } from "@/lib/price";

export type CartLine = { slug: string; qty: number };
export type CartItem = { pack: Pack; qty: number };

const KEY = "coco-cart";
const EVENT = "coco-cart-change";

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
      .filter((line) => line.qty > 0)
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

// Faixas de CEP por UF (prefixo de 2 dígitos; 66–69 usam o 3º dígito)
export function stateForZip(zip: string): string | null {
  const digitsOnly = zip.replace(/\D/g, "");
  if (digitsOnly.length !== 8) return null;
  const p2 = Number(digitsOnly.slice(0, 2));
  const p3 = Number(digitsOnly.slice(0, 3));
  if (p2 >= 1 && p2 <= 19) return "SP";
  if (p2 >= 20 && p2 <= 28) return "RJ";
  if (p2 === 29) return "ES";
  if (p2 >= 30 && p2 <= 39) return "MG";
  if (p2 >= 40 && p2 <= 48) return "BA";
  if (p2 === 49) return "SE";
  if (p2 >= 50 && p2 <= 56) return "PE";
  if (p2 === 57) return "AL";
  if (p2 === 58) return "PB";
  if (p2 === 59) return "RN";
  if (p2 >= 60 && p2 <= 63) return "CE";
  if (p2 === 64) return "PI";
  if (p2 === 65) return "MA";
  if (p2 >= 66 && p2 <= 68) return "PA";
  if (p3 === 689) return "AP";
  if (p3 === 693) return "RR";
  if (p3 === 699) return "AC";
  if (p2 === 69) return "AM";
  if (p2 === 70 || p2 === 71 || p2 === 72 || p2 === 73) return "DF";
  if (p2 >= 74 && p2 <= 76) return "GO";
  if (p2 === 77) return "TO";
  if (p2 === 78) return "MT";
  if (p2 === 79) return "MS";
  if (p3 === 768) return "RO";
  if (p2 >= 80 && p2 <= 87) return "PR";
  if (p2 >= 88 && p2 <= 89) return "SC";
  if (p2 >= 90 && p2 <= 99) return "RS";
  return null;
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
  const { items: catalog } = useCatalog();
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
    const pack = catalog.find((item) => item.slug === line.slug);
    return pack ? [{ pack, qty: line.qty }] : [];
  });

  return { items, count: items.reduce((total, item) => total + item.qty, 0), subtotal: subtotalOf(items), add, setQty, remove, clear };
}
