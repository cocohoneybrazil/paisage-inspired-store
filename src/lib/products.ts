import single from "@/assets/coco-honey-bronze-single.png.asset.json";
import duo from "@/assets/coco-honey-bronze-duo.png.asset.json";
import trio from "@/assets/coco-honey-bronze-pack-3.png.asset.json";
import toteCoco from "@/assets/tote-bag-coco.png.asset.json";
import toteCocoBack from "@/assets/tote-bag-coco-back.png.asset.json";
import toteCocoLifestyle from "@/assets/tote-bag-coco-lifestyle.png.asset.json";
import toteBrazil from "@/assets/tote-bag-brazil.png.asset.json";
import toteBrazilBack from "@/assets/tote-bag-brazil-back.png.asset.json";

export type Pack = {
  slug: string;
  /** Handle do produto na Shopify — chave de ligação com a Storefront API. */
  handle: string;
  /** Variante padrão; é o que vai para o carrinho da Shopify. */
  variantId: string;
  shortName: string;
  name: string;
  /** Frascos de 62 ml que o pack contém. Zero para acessórios. */
  bottles: number;
  quantity: string;
  price: string;
  comparePrice?: string;
  badge?: string;
  image: string;
  hoverImage?: string;
  soldOut?: boolean;
};

// Preço e disponibilidade daqui são apenas o estado conhecido do catálogo: em runtime
// eles são sobrescritos pelos valores reais da Storefront API (ver lib/catalog.ts).
export const packs: Pack[] = [
  { slug: "pack-001", bottles: 1, handle: "coco-honey-bronze-pack-001", variantId: "gid://shopify/ProductVariant/47928069488890", shortName: "001", name: "Pack 001", quantity: "1 óleo · 62 ml", price: "R$ 119,00", image: single.url },
  { slug: "pack-002", bottles: 2, handle: "coco-honey-bronze-pack-002", variantId: "gid://shopify/ProductVariant/47900491809018", shortName: "002", name: "Pack 002", quantity: "2 óleos · 124 ml", price: "R$ 226,00", comparePrice: "R$ 238,00", badge: "5% OFF NO COMBO", image: duo.url },
  { slug: "pack-003", bottles: 3, handle: "coco-honey-bronze-pack-003", variantId: "gid://shopify/ProductVariant/47900491841786", shortName: "003", name: "Pack 003", quantity: "3 óleos · 186 ml + Sun Bag", price: "R$ 321,00", comparePrice: "R$ 357,00", badge: "10% OFF + SUN BAG + FRETE GRÁTIS", image: trio.url },
];

export const addons: Pack[] = [
  { slug: "tote-bag-coco", bottles: 0, handle: "tote-bag-coco", variantId: "gid://shopify/ProductVariant/48258134114554", shortName: "TOTE", name: "Tote Bag Coco", quantity: "Marrom · algodão", price: "R$ 129,00", image: toteCoco.url, hoverImage: toteCocoBack.url },
  { slug: "tote-bag-brazil", bottles: 0, handle: "tote-bag-brazil", variantId: "gid://shopify/ProductVariant/48258081227002", shortName: "TOTE", name: "Tote Bag Brazil", quantity: "Verde e amarela · algodão", price: "R$ 129,00", image: toteBrazil.url, hoverImage: toteBrazilBack.url },
];
