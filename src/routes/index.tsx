import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import hero from "@/assets/hero-car.jpg";
import logo from "@/assets/motorsbay-logo.png";
import { fetchCars, fmt, offPct, type Car } from "@/lib/cars";
import { I18nProvider, LanguagePrompt, LanguageSelect, useI18n } from "@/lib/i18n";
import { ThemeToggle } from "@/lib/theme";

const TG = "https://t.me/motorsbaychat";
const SITE = ((import.meta.env["VITE_SITE_URL"] as string | undefined) ?? "").replace(/\/+$/, "");
const OG = `${SITE}/supercar-showcase.png`;

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

const enquire = (c: Car, t: ReturnType<typeof useI18n>["t"]) =>
  `${TG}?text=${encodeURIComponent(
    `${t.msgHello}\n\n${c.name}\n${t.msgPrice}: ${fmt(c.sale_price)} (${t.msgWas} ${fmt(c.price)}, ${t.youSave} ${fmt(c.price - c.sale_price)})\n${t.colours}: ${c.colors.join(", ") || "—"}\n\n${t.msgAvailable}`,
  )}`;

function CarCard({ c }: { c: Car }) {
  const [img, setImg] = useState(0);
  const { t } = useI18n();
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
            <button key={u} onClick={() => setImg(i)} aria-label={`${t.photo} ${i + 1}`} className={`h-10 flex-1 overflow-hidden border ${i === img ? "border-primary" : "border-border opacity-60"}`}>
              <img src={u} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="p-6">
        <h3 className="break-words font-display text-xl">{c.name}</h3>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-2xl font-semibold text-primary">{fmt(c.sale_price)}</span>
          {c.price > c.sale_price && <span className="text-sm text-muted-foreground line-through">{fmt(c.price)}</span>}
        </div>
        {c.price > c.sale_price && <p className="mt-1 text-xs text-muted-foreground">{t.youSave} {fmt(c.price - c.sale_price)}</p>}
        {c.colors.length > 0 && <p className="mt-3 text-xs text-muted-foreground">{t.colours}: <span className="text-foreground">{c.colors.join(", ")}</span></p>}
        <p className={`mt-1 text-xs ${c.stock > 0 ? "text-muted-foreground" : "text-destructive"}`}>
          {c.stock > 0 ? `${c.stock} ${t.inStock}` : t.soldOut}
        </p>
        <a href={enquire(c, t)} target="_blank" rel="noreferrer" className="mt-5 block w-full border border-primary py-3 text-center text-xs uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground">{t.enquire}</a>
      </div>
    </article>
  );
}

function Index() {
  return (
    <I18nProvider>
      <Page />
      <LanguagePrompt />
    </I18nProvider>
  );
}

function Page() {
  const { t } = useI18n();
  const { data: cars = [], isLoading } = useQuery({ queryKey: ["cars"], queryFn: fetchCars });
  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:px-8 sm:py-6">
        <a href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <img src={logo} alt="Best Motors Bay logo" className="h-9 w-9 object-contain sm:h-12 sm:w-12" />
          <span className="whitespace-nowrap font-display text-sm tracking-[0.12em] text-primary sm:text-xl sm:tracking-[0.2em]">BEST MOTORS BAY</span>
        </a>
        <nav className="flex min-w-0 items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:gap-6 sm:text-xs sm:tracking-[0.25em]">
          <a href="#inventory" className="whitespace-nowrap hover:text-primary">{t.inventory}</a>
          <a href={TG} target="_blank" rel="noreferrer" className="whitespace-nowrap border border-primary/60 px-2 py-1.5 text-primary hover:bg-primary hover:text-primary-foreground sm:px-4 sm:py-2">{t.contact}</a>
          <LanguageSelect />
          <ThemeToggle />
        </nav>
      </header>
      <section className="relative flex h-[85vh] min-h-[520px] items-end">
        <img src={hero} alt="Luxury car" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative w-full max-w-3xl px-4 pb-16 sm:px-8 sm:pb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-primary sm:text-sm sm:tracking-[0.3em]">{t.eyebrow}</p>
          <h1 className="mt-4 break-words font-display text-4xl leading-tight sm:text-5xl md:text-7xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">{t.heroSub}</p>
          <a href="#inventory" className="mt-8 inline-block bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground sm:px-8 sm:py-4 sm:text-sm">{t.viewInventory}</a>
        </div>
      </section>
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:gap-10 sm:px-8 sm:py-16 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{t.whyEyebrow}</p>
            <h2 className="mt-3 break-words font-display text-3xl">{t.whyTitle}</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>{t.why1}</p>
            <p>{t.why2}</p>
          </div>
        </div>
      </section>
      <section id="inventory" className="mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{t.collection}</p>
        <h2 className="mt-3 break-words font-display text-3xl sm:text-4xl">{t.featured}</h2>
        {isLoading ? (
          <p className="mt-10 text-muted-foreground">{t.loading}</p>
        ) : cars.length === 0 ? (
          <p className="mt-10 text-muted-foreground">{t.empty}</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((c) => <CarCard key={c.id} c={c} />)}
          </div>
        )}
      </section>
      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        <img src={logo} alt="" className="mx-auto mb-3 h-10 w-10 object-contain" />© 2021 Best Motors Bay
      </footer>
      <a href={TG} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-primary px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-primary-foreground shadow-2xl hover:opacity-90 sm:px-5">{t.chat}</a>
    </div>
  );
}
