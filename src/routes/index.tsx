import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-car.jpg";
import { SupportChat } from "@/components/SupportChat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum Motors — Luxury Cars for Sale" },
      { name: "description", content: "Shop curated luxury cars with exclusive discounts." },
      { property: "og:title", content: "Aurum Motors — Luxury Cars for Sale" },
      { property: "og:description", content: "Shop curated luxury cars with exclusive discounts." },
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
const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function Index() {
  return (
    <div className="min-h-screen">
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-8 py-6">
        <span className="font-display text-2xl tracking-widest text-primary">AURUM</span>
        <a href="#inventory" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary">Inventory</a>
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
        <h2 className="font-display text-4xl">Featured Inventory</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((c) => (
            <article key={c.name} className="relative overflow-hidden border border-border bg-card">
              <span className="absolute right-3 top-3 z-10 bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">-{c.off}%</span>
              <img src={hero} alt={c.name} className="h-48 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.year}</p>
                <h3 className="mt-1 font-display text-xl">{c.name}</h3>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-primary">{fmt(c.price * (1 - c.off / 100))}</span>
                  <span className="text-sm text-muted-foreground line-through">{fmt(c.price)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">You save {fmt(c.price * c.off / 100)}</p>
                <button className="mt-5 w-full border border-primary py-3 text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground">Enquire</button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">© 2021 Aurum Motors</footer>
      <SupportChat />
    </div>
  );
}
