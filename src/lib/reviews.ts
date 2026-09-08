export type Review = {
  name: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  pack?: string;
};

// Depoimentos de clientes. Substituir/completar com avaliações reais recebidas.
export const reviews: Review[] = [
  { name: "Marina R.", city: "Florianópolis · SC", rating: 5, date: "Janeiro 2026", title: "Bronze uniforme de verdade", text: "Usei em três dias de praia seguidos e o bronze ficou uniforme, sem manchar. A pele não ressecou nem descascou depois.", pack: "Pack 003" },
  { name: "Julia P.", city: "Balneário Camboriú · SC", rating: 5, date: "Janeiro 2026", title: "Cheiro e textura maravilhosos", text: "Textura leve, absorve rápido e não deixa aquela sensação pegajosa. O cheiro de coco é sutil e delicioso.", pack: "Pack 002" },
  { name: "Camila S.", city: "Rio de Janeiro · RJ", rating: 5, date: "Dezembro 2025", title: "Rendeu o verão inteiro", text: "Comprei o pack com a Sun Bag e ainda sobrou óleo. Vale muito o custo-benefício.", pack: "Pack 003" },
  { name: "Bruna L.", city: "São Paulo · SP", rating: 4, date: "Dezembro 2025", title: "Pele hidratada depois do sol", text: "Minha pele é sensível e não tive nenhuma irritação. Só queria um frasco maior!", pack: "Pack 001" },
  { name: "Ana Clara M.", city: "Itajaí · SC", rating: 5, date: "Dezembro 2025", title: "Resistente à água mesmo", text: "Entrei e saí do mar várias vezes e o efeito continuou. Reapliquei só uma vez no dia todo.", pack: "Pack 002" },
  { name: "Letícia F.", city: "Curitiba · PR", rating: 5, date: "Novembro 2025", title: "Chegou rápido e bem embalado", text: "Pedido entregue em três dias, embalagem linda. Já é meu queridinho do verão.", pack: "Pack 001" },
];

export type ReviewVideo = { id: string; author: string; caption: string; src?: string; poster?: string };

// Espaços prontos para os vídeos reais de clientes usando o produto.
export const reviewVideos: ReviewVideo[] = [
  { id: "v1", author: "@marinar", caption: "Rotina de praia com Coco Honey" },
  { id: "v2", author: "@juliapp", caption: "Antes e depois de 3 dias" },
  { id: "v3", author: "@camilasl", caption: "Aplicação e textura do óleo" },
  { id: "v4", author: "@brunalz", caption: "Unboxing do Pack 003" },
];

export const reviewStats = {
  average: Number((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)),
  total: reviews.length,
  breakdown: [5, 4, 3, 2, 1].map((star) => ({ star, count: reviews.filter((review) => review.rating === star).length })),
};
