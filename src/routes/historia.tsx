import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/historia")({
  head: () => ({
    meta: [
      { title: "Nossa história — COCO HONEY BRAZIL" },
      { name: "description", content: "A história da COCO HONEY BRAZIL: origem, propósito e a jornada de um bronzeador natural e vegano feito em Santa Catarina." },
      { property: "og:title", content: "Nossa história — COCO HONEY BRAZIL" },
      { property: "og:description", content: "A história da COCO HONEY BRAZIL: origem, propósito e a jornada de um bronzeador natural e vegano feito em Santa Catarina." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Historia,
});

const chapters = [
  { label: "01", title: "A origem", note: "Conteúdo em breve." },
  { label: "02", title: "O propósito", note: "Conteúdo em breve." },
  { label: "03", title: "A fórmula", note: "Conteúdo em breve." },
  { label: "04", title: "Santa Catarina · Brasil", note: "Conteúdo em breve." },
];

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
              Um bronzeador natural e vegano nascido em Santa Catarina, feito para quem vive o verão com consciência.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 md:grid-cols-2">
            {chapters.map((chapter) => (
              <article key={chapter.label} className="border-t border-foreground/20 pt-5">
                <p className="header-label text-muted-foreground">{chapter.label}</p>
                <h2 className="mt-6 text-3xl font-semibold uppercase leading-tight md:text-4xl">{chapter.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{chapter.note}</p>
              </article>
            ))}
          </div>

          <div className="mt-20 border-t border-foreground/15 pt-10">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Esta página está reservada para a história da marca. Assim que os textos e as fotos forem definidos, o conteúdo entra aqui.
            </p>
            <Link to="/produto" className="mt-6 inline-block text-xs font-semibold uppercase underline underline-offset-4">
              Conhecer o Coco Honey Bronze
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
