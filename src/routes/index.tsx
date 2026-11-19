import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-car.jpg";
import logo from "@/assets/motorsbay-logo.png.asset.json";

const TG = "https://t.me/motorsbaychat";
const OG = "https://id-preview--dd8521ae-417a-4bd6-9a01-76acdd7749e6.lovable.app/__l5e/assets-v1/b0fb34c8-998c-4270-ad84-bfc2a423cfc9/supercar-showcase.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Best Motors Bay — Luxury Cars for Sale" },
      { name: "description", content: "Shop curated luxury cars with exclusive discounts." },
      { property: "og:title", content: "Best Motors Bay — Luxury Cars for Sale" },
      { property: "og:description", content: "Shop curated luxury cars with exclusive discounts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: OG },
      { name: "twitter:image", content: OG },
    ],
  }),
  component: Index,
});

const cars = [
  { name: "Rolls-Royce Ghost", year: 2025, price: 345000, off: 8 },
  { name: "Lamborghini Huracán EVO", year: 2024, price: 268000, off: 10 },
  { name: "Ferrari Roma", year: 2025, price: 247000, off: 6 },
  { name: "Bentley Continental GT", year: 2024, price: 235000, off: 12 },
  { name: "Porsche 911 Turbo S", year: 2025, price: 230000, off: 5 },
  { name: "Mercedes-Maybach S680", year: 2025, price: 229000, off: 9 },
];
const enquire = (c: (typeof cars)[number]) =>
  `${TG}?text=${encodeURIComponent(
    `Hello Best Motors Bay, I'm interested in this car:\n\n${c.name} (${c.year})\nPrice: ${fmt(c.price * (1 - c.off / 100))} (was ${fmt(c.price)}, ${c.off}% off)\n\nIs it still available?`,
  )}`;
const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function Index() {
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
        <div className="relative px-8 pb-20 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Winter Collection Event</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">Drive Extraordinary.</h1>
          <p className="mt-4 text-lg text-muted-foreground">Hand-selected luxury vehicles, now up to 12% off.</p>
          <a href="#inventory" className="mt-8 inline-block bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground">View Inventory</a>
        </div>
      </section>
      <section id="inventory" className="mx-auto max-w-6xl px-8 py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">The Collection</p>
        <h2 className="mt-3 font-display text-4xl">Featured Inventory</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((c) => (
            <article key={c.name} className="group relative overflow-hidden border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl">
              <span className="absolute right-3 top-3 z-10 bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">-{c.off}%</span>
              <img src={hero} alt={c.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.year}</p>
                <h3 className="mt-1 font-display text-xl">{c.name}</h3>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-primary">{fmt(c.price * (1 - c.off / 100))}</span>
                  <span className="text-sm text-muted-foreground line-through">{fmt(c.price)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">You save {fmt(c.price * c.off / 100)}</p>
                <a href={enquire(c)} target="_blank" rel="noreferrer" className="mt-5 block w-full border border-primary py-3 text-center text-xs uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground">Enquire on Telegram</a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground"><img src={logo.url} alt="" className="mx-auto mb-3 h-10 w-10 object-contain" />© 2021 Best Motors Bay</footer>
      <a href={TG} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-primary px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-primary-foreground shadow-2xl hover:opacity-90">Chat on Telegram</a>
    </div>
  );
}
