import { useRef } from "react";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reviewStats, reviewVideos, reviews } from "@/lib/reviews";

export function Stars({ rating, className = "h-3.5 w-3.5" }: { rating: number; className?: string }) {
  return <span className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrelas`}>
    {[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`${className} ${star <= Math.round(rating) ? "fill-foreground text-foreground" : "text-foreground/25"}`} />)}
  </span>;
}

function ReviewCard({ index }: { index: number }) {
  const review = reviews[index];
  if (!review) return null;
  return <article className="border-t border-foreground/20 pt-5">
    <Stars rating={review.rating} />
    <h3 className="mt-4 text-sm font-semibold uppercase">{review.title}</h3>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">“{review.text}”</p>
    <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{review.name} · {review.city}</p>
    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">{review.date}{review.pack ? ` · ${review.pack}` : ""} · Compra verificada</p>
  </article>;
}

export function VideoWall() {
  const ref = useRef<HTMLDivElement>(null);
  return <div ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {reviewVideos.map((video) => <figure key={video.id} className="w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-[23%]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-secondary">
        {video.src
          ? <video src={video.src} poster={video.poster} controls playsInline className="h-full w-full object-cover" />
          : <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-foreground/25 text-muted-foreground">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-foreground/25"><Play className="h-4 w-4" /></span>
              <span className="text-[10px] uppercase tracking-[0.18em]">Espaço para vídeo</span>
            </div>}
      </div>
      <figcaption className="mt-3"><p className="text-xs font-semibold uppercase">{video.author}</p><p className="mt-1 text-[11px] text-muted-foreground">{video.caption}</p></figcaption>
    </figure>)}
  </div>;
}

export function ReviewsSection({ compact = false }: { compact?: boolean }) {
  return <section id="avaliacoes" className="border-t border-foreground/15 bg-background">
    <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
      <p className="header-label text-muted-foreground">AVALIAÇÕES REAIS</p>
      <h2 className="mt-6 max-w-4xl text-5xl font-semibold uppercase leading-none md:text-7xl">Quem usa, conta</h2>
      <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6 border-y border-foreground/15 py-7">
        <div><p className="text-5xl font-semibold leading-none">{reviewStats.average.toFixed(1)}</p><div className="mt-3"><Stars rating={reviewStats.average} /></div><p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{reviewStats.total} avaliações verificadas</p></div>
        <ul className="min-w-56 flex-1 space-y-1.5">
          {reviewStats.breakdown.map((row) => <li key={row.star} className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="w-8">{row.star}★</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10"><span className="block h-full bg-foreground" style={{ width: `${(row.count / reviewStats.total) * 100}%` }} /></span>
            <span className="w-6 text-right">{row.count}</span>
          </li>)}
        </ul>
        <Button variant="outline" className="h-11 rounded-lg px-6 text-xs font-semibold uppercase" asChild>
          <a href="https://wa.me/5547992031609" target="_blank" rel="noreferrer">Enviar minha avaliação</a>
        </Button>
      </div>
      <div className="mt-14">
        <p className="header-label text-muted-foreground">EM VÍDEO</p>
        <div className="mt-6"><VideoWall /></div>
      </div>
      <div className={`mt-16 grid gap-8 md:grid-cols-2 ${compact ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
        {reviews.slice(0, compact ? 4 : 6).map((_, index) => <ReviewCard key={index} index={index} />)}
      </div>
    </div>
  </section>;
}
