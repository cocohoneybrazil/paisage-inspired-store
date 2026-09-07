import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/trocas")({
  head: () => ({
    meta: [
      { title: "Trocas e Devoluções — COCO Honey Brazil" },
      { name: "description", content: "Política de trocas, devoluções e reembolso da COCO HONEY BRAZIL, conforme o Código de Defesa do Consumidor." },
      { property: "og:title", content: "Trocas e Devoluções — COCO Honey Brazil" },
      { property: "og:description", content: "Política de trocas, devoluções e reembolso da COCO HONEY BRAZIL, conforme o Código de Defesa do Consumidor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Trocas,
});

const sections: { title: string; body: (string | { lead: string; text: string })[] }[] = [
  {
    title: "Direito de Arrependimento",
    body: [
      "Conforme o art. 49 do Código de Defesa do Consumidor, o cliente que realizar uma compra fora do estabelecimento comercial (como compras pela internet) tem o direito de desistir da compra no prazo de até 7 (sete) dias corridos, contados a partir do recebimento do produto.",
      "Para exercer esse direito, o consumidor deverá entrar em contato com nossa equipe dentro do prazo legal, informando o número do pedido e o motivo da devolução.",
    ],
  },
  {
    title: "Condições para Devolução",
    body: [
      "Para que a devolução seja aceita, o produto deverá atender às seguintes condições:",
      { lead: "Perfeitas condições —", text: "sem sinais de uso indevido." },
      { lead: "Embalagem original —", text: "quando aplicável." },
      { lead: "Completo —", text: "acompanhar todos os acessórios, brindes e itens enviados." },
      { lead: "Sem violação —", text: "não apresentar avaria ou dano causado por mau uso." },
      "Produtos que não atendam a essas condições poderão ser devolvidos ao cliente sem reembolso.",
    ],
  },
  {
    title: "Produtos com Defeito ou Avaria",
    body: [
      "Em caso de produto com defeito de fabricação ou avaria, o cliente deverá comunicar a loja em até 30 (trinta) dias, conforme o art. 26 do CDC, enviando fotos ou vídeos que comprovem o problema.",
      "Após análise, o consumidor poderá optar por:",
      { lead: "Troca —", text: "do produto." },
      { lead: "Reembolso —", text: "do valor pago." },
      { lead: "Abatimento proporcional —", text: "do preço, conforme previsto em lei." },
    ],
  },
  {
    title: "Reembolso",
    body: [
      "Após o recebimento e análise do produto devolvido, o reembolso será processado conforme a forma de pagamento utilizada na compra:",
      { lead: "Cartão de crédito —", text: "o estorno será solicitado à administradora do cartão e poderá ocorrer em até 2 (duas) faturas subsequentes, conforme regras da operadora." },
      { lead: "Pix ou boleto bancário —", text: "o reembolso será realizado via transferência bancária para a conta do titular da compra, em até 10 (dez) dias úteis." },
      "O valor do frete será reembolsado integralmente nos casos de arrependimento dentro do prazo legal ou defeito comprovado.",
    ],
  },
];

function Trocas() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="header-label text-muted-foreground">COCO HONEY BRAZIL</p>
        <h1 className="mt-4 text-4xl font-semibold uppercase leading-tight md:text-6xl">Trocas e Devoluções</h1>

        <div className="mt-10 border-t border-foreground/15 pt-10 text-sm leading-relaxed text-muted-foreground">
          <p>
            A COCO HONEY respeita os direitos do consumidor e atua em conformidade com o Código de Defesa do Consumidor (Lei nº 8.078/90). Por isso, estabelecemos abaixo nossa Política de Devolução e Reembolso, garantindo transparência e segurança em suas compras.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {sections.map((section, i) => (
            <section key={section.title} className="border-t border-foreground/15 pt-8">
              <p className="header-label text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-xl font-semibold uppercase leading-tight md:text-2xl">{section.title}</h2>
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {section.body.map((item, j) =>
                  typeof item === "string" ? (
                    <p key={j}>{item}</p>
                  ) : (
                    <p key={j} className="flex gap-2">
                      <span className="text-foreground">·</span>
                      <span><strong className="font-semibold text-foreground">{item.lead}</strong> {item.text}</span>
                    </p>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-foreground/15 pt-8 text-sm leading-relaxed text-muted-foreground">
          <p>
            Para solicitar troca, devolução ou reembolso, fale conosco pelo WhatsApp{" "}
            <a href="https://wa.me/5547992031609" target="_blank" rel="noreferrer" className="font-semibold text-foreground underline underline-offset-4">
              +55 47 99203-1609
            </a>{" "}
            informando o número do seu pedido.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
