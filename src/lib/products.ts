import single from "@/assets/coco-honey-bronze-single.png.asset.json";
import duo from "@/assets/coco-honey-bronze-duo.png.asset.json";
import trio from "@/assets/coco-honey-bronze-pack-3.png.asset.json";

export type Pack = {
  slug: string;
  shortName: string;
  name: string;
  quantity: string;
  price: string;
  comparePrice?: string;
  badge?: string;
  image: string;
};

export const packs: Pack[] = [
  { slug: "pack-001", shortName: "001", name: "Pack 001", quantity: "1 óleo · 62 ml", price: "R$ 119,00", image: single.url },
  { slug: "pack-002", shortName: "002", name: "Pack 002", quantity: "2 óleos · 124 ml", price: "R$ 226,10", comparePrice: "R$ 238,00", badge: "5% OFF", image: duo.url },
  { slug: "pack-003", shortName: "003", name: "Pack 003", quantity: "3 óleos · 186 ml + Sun Bag", price: "R$ 321,30", comparePrice: "R$ 357,00", badge: "10% OFF", image: trio.url },
];