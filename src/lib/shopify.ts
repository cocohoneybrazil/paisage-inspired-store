const env = import.meta.env as Record<string, string | undefined>;

const domain = env["VITE_SHOPIFY_STOREFRONT_DOMAIN"];
const token = env["VITE_SHOPIFY_STOREFRONT_TOKEN"];
const apiVersion = env["VITE_SHOPIFY_STOREFRONT_API_VERSION"] ?? "2026-01";

export const shopifyConfigured = Boolean(domain && token);

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] };

export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  if (!domain || !token)
    throw new Error(
      "Storefront API não configurada: defina VITE_SHOPIFY_STOREFRONT_DOMAIN e VITE_SHOPIFY_STOREFRONT_TOKEN.",
    );

  const response = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) throw new Error(`Storefront API respondeu ${response.status}`);

  const body = (await response.json()) as GraphQLResponse<T>;
  if (body.errors?.length) throw new Error(body.errors.map((error) => error.message).join("; "));
  if (!body.data) throw new Error("Storefront API não retornou dados");
  return body.data;
}

const CART_CREATE = `
  mutation CocoCartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines, buyerIdentity: { countryCode: BR } }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

type CartCreateResult = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  } | null;
};

/** Cria um Cart real na Shopify e devolve a URL do checkout hospedado. */
export async function createCheckoutUrl(
  lines: { variantId: string; qty: number }[],
): Promise<string> {
  const data = await storefront<CartCreateResult>(CART_CREATE, {
    lines: lines.map((line) => ({ merchandiseId: line.variantId, quantity: line.qty })),
  });

  const result = data.cartCreate;
  const userError = result?.userErrors[0];
  if (userError) throw new Error(userError.message);
  if (!result?.cart) throw new Error("Não foi possível criar o carrinho na Shopify");
  return result.cart.checkoutUrl;
}

/**
 * Cadastra o e-mail como contato de marketing na Shopify, pelo mesmo endereço que o
 * formulário de newsletter da loja usa. A resposta vem opaca (o navegador bloqueia a
 * leitura entre domínios diferentes), então não há como confirmar daqui se o contato
 * entrou — quem chama isto não deve prometer nada ao cliente com base no retorno.
 */
export async function subscribeEmail(email: string): Promise<void> {
  if (!domain) throw new Error("Storefront API não configurada");

  const body = new URLSearchParams({
    form_type: "customer",
    utf8: "✓",
    "contact[email]": email,
    "contact[tags]": "newsletter,popup-site",
    "contact[accepts_marketing]": "true",
  });

  await fetch(`https://${domain}/contact`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}
