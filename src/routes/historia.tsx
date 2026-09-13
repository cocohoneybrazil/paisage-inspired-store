import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import gabrielaPhoto from "@/assets/gabriela.jpg";
import philippePhoto from "@/assets/philippe-godinho.jpg";

export const Route = createFileRoute("/historia")({
  head: () => ({
    meta: [
      { title: "Nossa história — COCO HONEY BRAZIL" },
      { name: "description", content: "A história da COCO HONEY BRAZIL: como nasceu uma marca feita para unir sol, bronze e uma vida saudável, criada por Gabriela e Philippe em Santa Catarina." },
      { property: "og:title", content: "Nossa história — COCO HONEY BRAZIL" },
      { property: "og:description", content: "A história da COCO HONEY BRAZIL: como nasceu uma marca feita para unir sol, bronze e uma vida saudável, criada por Gabriela e Philippe em Santa Catarina." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Historia,
});

function Historia() {
  return (
    <div>
      <Header />
      <main>
        <header className="border-b border-foreground/15 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="header-label text-muted-foreground">COCO HONEY BRAZIL</p>
            <h1 className="mt-5 text-5xl font-semibold uppercase leading-none md:text-8xl">Nossa história</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A gente envasou o verão.


              A Coco nasceu da paixão, de um sonho de entregar a melhor experiência para os amigos e de transformar o cuidado com a pele em um ritual de autoestima.

            </p>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            <article className="border-t border-foreground/20 pt-5">
              <p className="header-label text-muted-foreground">01</p>
              <h2 className="mt-6 text-3xl font-semibold uppercase leading-tight md:text-4xl">A origem</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  A Coco veio com um propósito: unir sol, bronze e uma vida saudável.
                </p>
                <p>
                  São coisas que sempre enxergamos como complementares. No final, era menos sobre criar uma marca e mais sobre materializar uma personalidade, um lifestyle e uma forma de viver dos seus idealizadores.
                </p>
                <p>
                  Nasceu da paixão. De um sonho de entregar a melhor experiência para os amigos. Porque nunca foi apenas sobre ficar mais bronzeada, era sobre como você se sente enquanto isso acontece.
                </p>
                <p>
                  A ideia nunca foi simplesmente criar mais um bronzeador. Era criar uma experiência. Uma forma de transformar o cuidado com a pele em parte daquele ritual que acontece antes, durante e depois do sol.
                </p>
                <p>
                  Foi assim que começou a nossa busca por uma fórmula que tivesse personalidade. Que carregasse o Brasil não apenas no nome, mas naquilo que você sente quando abre o frasco.
                </p>
              </div>
            </article>

            <article className="border-t border-foreground/20 pt-5">
              <p className="header-label text-muted-foreground">02</p>
              <h2 className="mt-6 text-3xl font-semibold uppercase leading-tight md:text-4xl">A personalidade</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p className="text-lg font-medium uppercase tracking-wide text-foreground">Sexy. Leal. Expressivo.</p>
                <p>
                  Sexy, porque o verão também é sobre se sentir bem na própria pele, se sentir desejada por você mesma.
                </p>
                <p>
                  Leal, porque acreditamos em relações verdadeiras — com nossos amigos, nossa comunidade e com aquilo que escolhemos colocar na pele. E o cheirinho você vai ver, não te abandona haha.
                </p>
                <p>
                  Expressivo, porque nunca quisemos ser uma marca que passa despercebida. Acreditamos na personalidade. A Coco Honey nasceu para ser sentida.
                </p>
              </div>
            </article>

            <article className="border-t border-foreground/20 pt-5 md:col-span-2">
              <p className="header-label text-muted-foreground">03</p>
              <h2 className="mt-6 text-3xl font-semibold uppercase leading-tight md:text-4xl">Do nosso verão para o seu</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Gabriela e Philippe cresceram com o mar por perto.
              </p>
              <div className="mt-10 grid gap-14 md:grid-cols-2 md:gap-12">
                <div>
                  <img
                    src={gabrielaPhoto}
                    alt="Retrato de Gabriela, cofundadora da Coco Honey Brazil"
                    className="aspect-square w-full object-cover grayscale"
                  />
                  <p className="header-label mt-4 text-foreground">Gabriela</p>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Para Gabriela, praia sempre foi sinônimo de liberdade, banho de mar, esporte, amigos e aquele equilíbrio entre cuidar do corpo e nunca abrir mão de um bom doce. Dona do Romarinho, um cachorro que era de rua e que, para ela, é o mais fofo do mundo.
                  </p>
                  </div>
                </div>
                <div>
                  <img
                    src={philippePhoto}
                    alt="Retrato de Philippe Godinho, cofundador da Coco Honey Brazil"
                    className="aspect-square w-full object-cover grayscale"
                  />
                  <p className="header-label mt-4 text-foreground">Philippe Godinho</p>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Philippe cresceu frequentando a praia. Com o avô pescador, teve desde cedo o contato com o mar.
                  </p>
                  <p>
                    Nas férias, alugava cadeira e guarda-sol no litoral de Santa Catarina. Nas horas vagas, atividade física e praia são os melhores remédios. E amigos que, até hoje, são sua família.
                  </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-foreground/15 pt-6 text-sm leading-relaxed text-muted-foreground md:col-span-2">
                <p>
                  Dois caminhos diferentes. A mesma paixão pelo verão. E talvez tenha sido justamente daí que veio a Coco Honey Brazil. De uma vontade muito simples: entregar à comunidade uma experiência que traduzisse aquilo que nós mesmos amamos viver.
                </p>
                <p className="mt-4 font-medium uppercase tracking-wide text-foreground">
                  Uma marca brasileira. Uma rotina. Um ritual. Um jeito de viver.
                </p>
              </div>
            </article>
          </div>

          <div className="mt-20 border-t border-foreground/15 pt-10">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Feito em Santa Catarina, com ingredientes naturais e sem crueldade animal, para quem vive o verão com consciência.
            </p>
            <Link to="/produto" search={{ pack: "pack-003" }} className="mt-6 inline-block text-xs font-semibold uppercase underline underline-offset-4">
              Conhecer o Coco Honey Bronze
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
