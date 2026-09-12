import { createContext, useContext, useMemo } from "react";
import { addons as fallbackAddons, packs as fallbackPacks, type Pack } from "@/lib/products";
import { formatAmount } from "@/lib/price";
import { storefront } from "@/lib/shopify";

export type LiveProduct = {
  handle: string;
  variantId: string;
  price: string;
  compareAtPrice: string | null;
  availableForSale: boolean;
};

export type Catalog = { packs: Pack[]; addons: Pack[]; items: Pack[] };

const CATALOG_QUERY = `
  query CocoCatalog {
    products(first: 50) {
      nodes {
        handle
        variants(first: 1) {
          nodes {
            id
            availableForSale
            price { amount }
            compareAtPrice { amount }
          }
        }
      }
    }
  }
`;

type CatalogResult = {
  products: {
    nodes: {
      handle: string;
      variants: {
        nodes: {
          id: string;
          availableForSale: boolean;
          price: { amount: string };
          compareAtPrice: { amount: string } | null;
        }[];
      };
    }[];
  };
};

export async function fetchLiveProducts(): Promise<LiveProduct[]> {
  const data = await storefront<CatalogResult>(CATALOG_QUERY);
  return data.products.nodes.flatMap((product) => {
    const variant = product.variants.nodes[0];
    if (!variant) return [];
    return [
      {
        handle: product.handle,
        variantId: variant.id,
        price: variant.price.amount,
        compareAtPrice: variant.compareAtPrice?.amount ?? null,
        availableForSale: variant.availableForSale,
      },
    ];
  });
}

function withLiveData(pack: Pack, live: LiveProduct | undefined): Pack {
  if (!live) return pack;
  const merged: Pack = {
    ...pack,
    variantId: live.variantId,
    price: formatAmount(live.price),
    soldOut: !live.availableForSale,
  };
  const compareAt = live.compareAtPrice;
  if (compareAt && Number(compareAt) > Number(live.price))
    merged.comparePrice = formatAmount(compareAt);
  else delete merged.comparePrice;
  return merged;
}

export function buildCatalog(live: LiveProduct[] | null): Catalog {
  const byHandle = new Map((live ?? []).map((product) => [product.handle, product]));
  const packs = fallbackPacks.map((pack) => withLiveData(pack, byHandle.get(pack.handle)));
  const addons = fallbackAddons.map((pack) => withLiveData(pack, byHandle.get(pack.handle)));
  return { packs, addons, items: [...packs, ...addons] };
}

export const fallbackCatalog = buildCatalog(null);

export const CatalogContext = createContext<Catalog>(fallbackCatalog);

export function useCatalog(): Catalog {
  return useContext(CatalogContext);
}

export function usePack(slug: string): Pack | undefined {
  const { items } = useCatalog();
  return useMemo(() => items.find((item) => item.slug === slug), [items, slug]);
}
