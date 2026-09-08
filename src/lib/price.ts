export function parsePrice(value: string): number {
  return Math.round(Number(value.replace(/[^\d,]/g, "").replace(",", ".")) * 100);
}

export function formatPrice(cents: number): string {
  return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
}

/** Converte o decimal da Storefront API ("119.00") para o formato exibido na loja. */
export function formatAmount(amount: string): string {
  return formatPrice(Math.round(Number(amount) * 100));
}

export function installmentText(price: string, times = 3): string {
  return `ou ${times}x de ${formatPrice(Math.round(parsePrice(price) / times))} sem juros`;
}

export function installmentShort(price: string, times = 3): string {
  return `${times}x ${formatPrice(Math.round(parsePrice(price) / times))}`;
}
