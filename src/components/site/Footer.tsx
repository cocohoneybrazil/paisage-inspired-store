export function Footer() {
  return <footer className="border-t border-foreground/15 bg-background">
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-8 text-[10px] font-semibold uppercase md:flex-row md:items-end md:justify-between md:px-8">
      <div>
        <p>Santa Catarina · Brasil</p>
        <p className="mt-2 text-muted-foreground">CNPJ 53.172.892/0001-74</p>
        <p className="mt-1 text-muted-foreground">© 2026 COCO HONEY BRAZIL®</p>
      </div>
      <div className="flex flex-wrap gap-x-7 gap-y-3"><a href="https://www.cocohoneybrazil.com.br/policies/privacy-policy" target="_blank" rel="noreferrer">Política de privacidade</a><a href="https://www.cocohoneybrazil.com.br/policies/refund-policy" target="_blank" rel="noreferrer">Política de reembolso</a><a href="https://wa.me/5547992031609" target="_blank" rel="noreferrer">Contato</a><a href="https://www.instagram.com/cocohoneybrazil/" target="_blank" rel="noreferrer">Instagram</a></div>
    </div>
  </footer>;
}