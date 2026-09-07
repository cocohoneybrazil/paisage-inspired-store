import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — COCO Honey Brazil" },
      { name: "description", content: "Como a COCO HONEY BRAZIL coleta, usa e protege suas informações pessoais." },
      { property: "og:title", content: "Política de Privacidade — COCO Honey Brazil" },
      { property: "og:description", content: "Como a COCO HONEY BRAZIL coleta, usa e protege suas informações pessoais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacidade,
});

const sections: { title: string; body: (string | { lead: string; text: string })[] }[] = [
  {
    title: "Informações pessoais que coletamos ou processamos",
    body: [
      'Quando usamos o termo "informações pessoais", estamos nos referindo a informações que identificam ou podem estar associadas a você ou outra pessoa. Informações pessoais não incluem dados coletados de forma anônima ou que tenham sido desvinculados da identidade do titular. Podemos coletar ou processar as seguintes categorias de informações pessoais, dependendo de como você interage com os Serviços, do local onde você reside e conforme permitido ou exigido pela legislação aplicável:',
      { lead: "Informações de contato —", text: "nome, endereço, endereço de faturamento, endereço de entrega, telefone e e-mail." },
      { lead: "Informações financeiras —", text: "números de cartão de crédito, débito e contas financeiras, dados de contas bancárias, informações de transações, forma de pagamento e comprovantes." },
      { lead: "Informações da conta —", text: "nome de usuário, senha, perguntas de segurança, preferências e configurações." },
      { lead: "Informações de transações —", text: "itens que você visualiza, adiciona ao carrinho ou à lista de desejos, compra, devolve, troca ou cancela, além de transações anteriores." },
      { lead: "Comunicações conosco —", text: "informações que você fornece ao se comunicar conosco, como ao consultar nosso atendimento ao cliente." },
      { lead: "Informações de dispositivo —", text: "dispositivo, navegador ou rede de conexão, endereço de IP ou outros identificadores únicos." },
      { lead: "Informações de uso —", text: "como e quando você acessa ou navega pelos Serviços." },
    ],
  },
  {
    title: "Fontes de informações pessoais",
    body: [
      "Podemos coletar informações pessoais das seguintes formas:",
      { lead: "Diretamente de você —", text: "quando você cria uma conta, visita ou utiliza os Serviços, comunica-se conosco ou fornece suas informações de qualquer outra forma." },
      { lead: "Automaticamente, através dos Serviços —", text: "a partir do seu dispositivo quando você utiliza nossos produtos ou visita nossos sites, e através de cookies ou tecnologias similares." },
      { lead: "Dos nossos provedores de serviços —", text: "quando os contratamos para viabilizar determinadas tecnologias e quando coletam ou processam informações em nosso nome." },
      { lead: "Dos nossos parceiros ou de terceiros.", text: "" },
    ],
  },
  {
    title: "Como usamos suas informações pessoais",
    body: [
      "Dependendo de como você interage conosco, podemos usar suas informações pessoais para os seguintes fins:",
      { lead: "Fornecer, personalizar e melhorar os Serviços —", text: "processar pagamentos e pedidos, lembrar suas preferências, enviar notificações da sua conta, processar compras, devoluções e trocas, organizar envios e proporcionar uma experiência de compra personalizada." },
      { lead: "Marketing e publicidade —", text: "envio de comunicações promocionais por e-mail ou mensagem, e exibição de anúncios online sobre produtos ou serviços, com base na sua atividade nos Serviços." },
      { lead: "Segurança e prevenção contra fraudes —", text: "autenticar sua conta, garantir pagamento seguro e detectar atividades fraudulentas ou ilegais. Você é responsável por manter suas credenciais de acesso em segurança." },
      { lead: "Comunicações com você —", text: "oferecer atendimento ao cliente, responder às suas solicitações e manter nosso relacionamento comercial." },
      { lead: "Razões jurídicas —", text: "cumprir a legislação aplicável, responder a processos legais válidos e proteger nossos direitos e os de nossos usuários." },
    ],
  },
  {
    title: "Como compartilhamos suas informações pessoais",
    body: [
      "Em determinadas circunstâncias, podemos compartilhar suas informações pessoais com terceiros para fins legítimos:",
      "Com fabricantes e parceiros que prestam serviços em nosso nome, como gestão de TI, processamento de pagamentos, análise de dados, atendimento ao cliente, armazenamento em nuvem, processamento de pedidos e frete.",
      "Com parceiros comerciais e de marketing para oferecer serviços de marketing e publicidade, sempre de acordo com os próprios avisos de privacidade desses parceiros.",
      "Quando você nos autoriza, solicita ou consente o compartilhamento, por exemplo para envio de produtos ou uso de integrações de redes sociais.",
      "Com nossos afiliados ou empresas do mesmo grupo econômico.",
      "Em conexão com transações comerciais, como fusões, para cumprir obrigações legais aplicáveis e proteger ou defender os Serviços e nossos direitos.",
    ],
  },
  {
    title: "Sites e links de terceiros",
    body: [
      "Os Serviços podem conter links para sites ou plataformas operadas por terceiros. Recomendamos que você revise as políticas de privacidade e segurança desses terceiros. Não garantimos nem nos responsabilizamos pelas práticas de privacidade desses sites, incluindo a precisão e integridade das informações que disponibilizam.",
    ],
  },
  {
    title: "Informações de crianças",
    body: [
      "Os Serviços não são destinados ao uso por crianças e não coletamos intencionalmente informações pessoais de menores de idade. Se você for pai, mãe ou responsável legal de uma criança que compartilhou informações conosco, entre em contato pelos canais indicados abaixo para solicitar a exclusão desses dados.",
    ],
  },
  {
    title: "Segurança e retenção das suas informações",
    body: [
      "Embora adotemos medidas de segurança adequadas, nenhum sistema é completamente infalível. Recomendamos que você evite enviar informações sensíveis por meios não seguros.",
      "O período de retenção das suas informações pode variar conforme a necessidade de manter sua conta ativa, fornecer os Serviços, cumprir obrigações legais, resolver contestações ou fazer cumprir contratos e políticas aplicáveis.",
    ],
  },
  {
    title: "Seus direitos e escolhas",
    body: [
      "Dependendo da sua localização, você pode ter alguns ou todos os direitos abaixo. Esses direitos não são absolutos e podem se aplicar apenas em determinadas circunstâncias:",
      { lead: "Direito de acesso —", text: "solicitar acesso às informações pessoais que mantemos sobre você." },
      { lead: "Direito de exclusão —", text: "solicitar que excluamos as informações pessoais que temos sobre você." },
      { lead: "Direito de correção —", text: "solicitar a correção de informações imprecisas." },
      { lead: "Direito à portabilidade —", text: "receber uma cópia das suas informações e solicitar a transferência a terceiros, em determinadas circunstâncias." },
      { lead: "Preferências de comunicação —", text: "você pode cancelar e-mails promocionais a qualquer momento pelo link de cancelamento nos próprios e-mails." },
      "Não discriminaremos você por exercer qualquer um desses direitos. Poderemos solicitar a verificação da sua identidade antes de processar solicitações, e responderemos dentro do prazo exigido pela legislação aplicável.",
    ],
  },
  {
    title: "Reclamações",
    body: [
      "Se você tiver alguma reclamação sobre o modo como processamos suas informações pessoais, entre em contato conosco pelos canais abaixo. Dependendo da sua localização, você pode apresentar reclamação diretamente à autoridade local de proteção de dados.",
    ],
  },
  {
    title: "Transferências internacionais",
    body: [
      "É possível que suas informações pessoais sejam transferidas, armazenadas e processadas fora do país em que você reside, sempre com mecanismos de transferência reconhecidos e adequados.",
    ],
  },
  {
    title: "Alterações nesta Política de Privacidade",
    body: [
      'Podemos atualizar esta Política periodicamente para refletir mudanças em nossas práticas ou por razões operacionais, legais ou regulatórias. Publicaremos a versão revisada neste site, atualizando a data de "Última atualização".',
    ],
  },
  {
    title: "Contato",
    body: [
      "Se você tiver dúvidas sobre nossas práticas de privacidade ou desejar exercer seus direitos, entre em contato pelo telefone +55 47 99203-1609 ou pelo e-mail contato@cocohoneybrazil.com.br.",
      "COCO HONEY BRAZIL LTDA — Rua Paulo Schwarzer, 259, Blumenau SC, 89037-030, Brasil.",
    ],
  },
];

function Privacidade() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="header-label text-muted-foreground">COCO HONEY BRAZIL</p>
        <h1 className="mt-4 text-4xl font-semibold uppercase leading-tight md:text-6xl">Política de Privacidade</h1>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Última atualização: 4 de setembro de 2026</p>

        <div className="mt-10 space-y-6 border-t border-foreground/15 pt-10 text-sm leading-relaxed text-muted-foreground">
          <p>
            A COCO HONEY BRAZIL® é responsável por esta loja e site, incluindo todas as informações, conteúdos, funcionalidades, ferramentas, produtos e serviços relacionados, com o objetivo de oferecer a você, cliente, uma experiência de compra personalizada (os "Serviços"). Esta Política de Privacidade descreve como coletamos, usamos e compartilhamos suas informações pessoais quando você visita, utiliza ou realiza uma compra por meio dos Serviços, ou quando se comunica conosco.
          </p>
          <p>
            Leia esta Política com atenção. Ao utilizar e acessar qualquer um dos Serviços, você reconhece que leu e compreende a forma como suas informações são coletadas, usadas e compartilhadas.
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
      </main>
      <Footer />
    </div>
  );
}
