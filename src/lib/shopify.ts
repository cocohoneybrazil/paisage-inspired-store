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
  mutation CocoCartCreate($lines: [CartLineInput!]!, $email: String, $phone: String) {
    cartCreate(input: { lines: $lines, buyerIdentity: { countryCode: BR, email: $email, phone: $phone } }) {
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

/**
 * Cria um Cart real na Shopify e devolve a URL do checkout hospedado.
 *
 * Quando o cliente já deixou o e-mail no popup, ele vai junto: o checkout abre
 * identificado e, se a pessoa desistir no meio, a Shopify registra um checkout
 * abandonado com contato — que é o que torna a recuperação possível. Sem isso, quem
 * desiste antes de digitar o e-mail some sem deixar rastro.
 */
export async function createCheckoutUrl(
  lines: { variantId: string; qty: number }[],
  contact: Contact = {},
): Promise<string> {
  const data = await storefront<CartCreateResult>(CART_CREATE, {
    lines: lines.map((line) => ({ merchandiseId: line.variantId, quantity: line.qty })),
    email: contact.email ?? null,
    phone: contact.phone ?? null,
  });

  const result = data.cartCreate;
  const userError = result?.userErrors[0];
  if (userError) throw new Error(userError.message);
  if (!result?.cart) throw new Error("Não foi possível criar o carrinho na Shopify");
  return result.cart.checkoutUrl;
}

export type Contact = { email?: string; phone?: string };

/**
 * Cadastra o contato na Shopify pelo mesmo endereço que o formulário de newsletter da
 * loja usa. A resposta vem opaca (o navegador bloqueia a leitura entre domínios
 * diferentes), então não há como confirmar daqui se entrou — quem chama isto não deve
 * prometer nada ao cliente com base no retorno.
 *
 * A etiqueta de WhatsApp só vai quando existe telefone, e telefone só chega aqui quando
 * a pessoa marcou o aceite no popup. É essa etiqueta que vai permitir separar, no dia em
 * que o canal existir, quem autorizou de quem nunca autorizou.
 */
export async function subscribeContact({ email, phone }: Contact): Promise<void> {
  if (!domain) throw new Error("Storefront API não configurada");
  if (!email && !phone) return;

  const tags = ["newsletter", "popup-site", ...(phone ? ["whatsapp-optin"] : [])];
  const body = new URLSearchParams({
    form_type: "customer",
    utf8: "✓",
    "contact[tags]": tags.join(","),
    "contact[accepts_marketing]": "true",
  });
  if (email) body.set("contact[email]", email);
  if (phone) body.set("contact[phone]", phone);

  await fetch(`https://${domain}/contact`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}

const CONTACT_KEY = "coco-contact";

/**
 * Guarda o contato deixado no popup para o checkout já abrir identificado — e, se a
 * pessoa desistir no meio, virar um checkout abandonado com contato em vez de sumir.
 */
export function rememberContact(contact: Contact) {
  try {
    const merged = { ...rememberedContact(), ...contact };
    window.localStorage.setItem(CONTACT_KEY, JSON.stringify(merged));
  } catch {
    // Navegação privada: seguimos sem lembrar, o checkout pede os dados do mesmo jeito.
  }
}

export function rememberedContact(): Contact {
  try {
    const raw = window.localStorage.getItem(CONTACT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (typeof parsed !== "object" || parsed === null) return {};
    const { email, phone } = parsed as Contact;
    return {
      ...(typeof email === "string" ? { email } : {}),
      ...(typeof phone === "string" ? { phone } : {}),
    };
  } catch {
    return {};
  }
}
