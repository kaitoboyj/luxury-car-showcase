import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import hero from "@/assets/hero-car.jpg";
import logo from "@/assets/motorsbay-logo.png.asset.json";
import { fetchCars, fmt, offPct, type Car } from "@/lib/cars";

const TG = "https://t.me/motorsbaychat";
const OG = "https://id-preview--dd8521ae-417a-4bd6-9a01-76acdd7749e6.lovable.app/__l5e/assets-v1/b0fb34c8-998c-4270-ad84-bfc2a423cfc9/supercar-showcase.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Motors Bay — Luxury Cars for Sale" },
      { name: "description", content: "Year-end stock clearance on curated luxury cars with big discounts." },
      { property: "og:title", content: "Best Motors Bay — Luxury Cars for Sale" },
      { property: "og:description", content: "Year-end stock clearance on curated luxury cars with big discounts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: OG },
      { name: "twitter:image", content: OG },
    ],
  }),
  component: Index,
});

const enquire = (c: Car) =>
  `${TG}?text=${encodeURIComponent(
    `Hello Best Motors Bay, I'm interested in this car:\n\n${c.name}\nPrice: ${fmt(c.sale_price)} (was ${fmt(c.price)}, you save ${fmt(c.price - c.sale_price)})\nColours: ${c.colors.join(", ") || "—"}\n\nIs it still available?`,
  )}`;

function CarCard({ c }: { c: Car }) {
  const [img, setImg] = useState(0);
  const pct = offPct(c);
  return (
    <article className="group relative overflow-hidden border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl">
      {pct > 0 && <span className="absolute right-3 top-3 z-10 bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">-{pct}%</span>}
      <div className="h-52 overflow-hidden bg-muted">
        <img src={c.images[img] ?? hero} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      {c.images.length > 1 && (
        <div className="flex gap-1 p-2">
          {c.images.map((u, i) => (
            <button key={u} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`} className={`h-10 flex-1 overflow-hidden border ${i === img ? "border-primary" : "border-border opacity-60"}`}>
              <img src={u} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="p-6">
        <h3 className="font-display text-xl">{c.name}</h3>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-2xl font-semibold text-primary">{fmt(c.sale_price)}</span>
          {c.price > c.sale_price && <span className="text-sm text-muted-foreground line-through">{fmt(c.price)}</span>}
        </div>
        {c.price > c.sale_price && <p className="mt-1 text-xs text-muted-foreground">You save {fmt(c.price - c.sale_price)}</p>}
        {c.colors.length > 0 && <p className="mt-3 text-xs text-muted-foreground">Colours: <span className="text-foreground">{c.colors.join(", ")}</span></p>}
        <p className={`mt-1 text-xs ${c.stock > 0 ? "text-muted-foreground" : "text-destructive"}`}>
          {c.stock > 0 ? `${c.stock} in stock` : "Sold out"}
        </p>
        <a href={enquire(c)} target="_blank" rel="noreferrer" className="mt-5 block w-full border border-primary py-3 text-center text-xs uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground">Enquire on Telegram</a>
      </div>
    </article>
  );
}

function Index() {
  const { data: cars = [], isLoading } = useQuery({ queryKey: ["cars"], queryFn: fetchCars });
  return (
    <div className="min-h-screen">
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-8 py-6">
        <a href="/" className="flex items-center gap-3">
          <img src={logo.url} alt="Best Motors Bay logo" className="h-12 w-12 object-contain" />
          <span className="font-display text-xl tracking-[0.2em] text-primary">BEST MOTORS BAY</span>
        </a>
        <nav className="flex items-center gap-8 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <a href="#inventory" className="hover:text-primary">Inventory</a>
          <a href={TG} target="_blank" rel="noreferrer" className="border border-primary/60 px-4 py-2 text-primary hover:bg-primary hover:text-primary-foreground">Contact</a>
        </nav>
      </header>
      <section className="relative flex h-[85vh] items-end">
        <img src={hero} alt="Luxury car" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative max-w-3xl px-8 pb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Year-End Clearance Event</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Drive Extraordinary.</h1>
          <p className="mt-4 text-lg text-muted-foreground">Hand-selected luxury vehicles at prices you won't see again.</p>
          <a href="#inventory" className="mt-8 inline-block bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground">View Inventory</a>
        </div>
      </section>
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-16 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Why prices are lower</p>
            <h2 className="mt-3 font-display text-3xl">Out with the old, in with the new year.</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>As the year comes to a close, we are clearing our showroom to make room for a fresh line-up of vehicles arriving for the New Year. That means the cars in our current stock must go — and we would rather pass the savings to you than hold them over.</p>
            <p>Every vehicle below is priced lower than usual, with the same careful inspection and quality we're known for. Once a car is sold, it's gone, so if something catches your eye, message us on Telegram today.</p>
          </div>
        </div>
      </section>
      <section id="inventory" className="mx-auto max-w-6xl px-8 py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">The Collection</p>
        <h2 className="mt-3 font-display text-4xl">Featured Inventory</h2>
        {isLoading ? (
          <p className="mt-10 text-muted-foreground">Loading cars…</p>
        ) : cars.length === 0 ? (
          <p className="mt-10 text-muted-foreground">New arrivals coming soon. Message us on Telegram for current availability.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((c) => <CarCard key={c.id} c={c} />)}
          </div>
        )}
      </section>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <img src={logo.url} alt="" className="mx-auto mb-3 h-10 w-10 object-contain" />© 2021 Best Motors Bay
      </footer>
      <a href={TG} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-primary px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-primary-foreground shadow-2xl hover:opacity-90">Chat on Telegram</a>
    </div>
  );
}
