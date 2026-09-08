# shopify CHB

querido, vamos fazer um ecommerce pra coco, outro modelo agora, com base nesse site aqui: https://paisage.co/ - use as mesmas fontes, tipografias, me entregue um esboço que te entrego as fotos e infos

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5e616b0f-c52a-4d81-9437-fc504af80910).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Integração com a Shopify (headless)

O site é o front-end da loja `cocohoneybrazil.com.br`: preço, preço comparativo e
disponibilidade vêm da Storefront API, e o pagamento é finalizado no checkout hospedado
da Shopify.

1. Copie `.env.example` para `.env.local` e preencha `VITE_SHOPIFY_STOREFRONT_TOKEN` com
   o token público do canal Headless (o `.env.local` não é versionado).
2. `npm run dev`.

Como funciona:

- `src/lib/shopify.ts` — cliente da Storefront API e criação do carrinho (`cartCreate`).
- `src/lib/catalog.ts` — busca os produtos e sobrescreve o catálogo estático de
  `src/lib/products.ts`, ligado pelo `handle` de cada produto.
- `src/routes/__root.tsx` — carrega o catálogo uma vez por navegação e o distribui via
  contexto. Se a Storefront API falhar, o site continua no ar com os valores estáticos.
- `src/routes/checkout.tsx` — a sacola. O botão de pagamento cria um Cart real na Shopify
  e redireciona para o checkout dela, onde entram endereço, frete definitivo e pagamento.

O frete mostrado antes do checkout (`shippingTable` em `src/lib/cart.ts`) é uma
estimativa por região; o valor cobrado é o calculado pela Shopify.
