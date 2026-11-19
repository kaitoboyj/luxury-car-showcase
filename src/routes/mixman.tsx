import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { COLORS, fetchCars, fmt, supabase } from "@/lib/cars";

export const Route = createFileRoute("/mixman")({
  head: () => ({
    meta: [
      { title: "Mix Man — Best Motors Bay" },
      { name: "description", content: "Private inventory manager." },
      { property: "og:title", content: "Mix Man — Best Motors Bay" },
      { property: "og:description", content: "Private inventory manager." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MixMan,
});

const input = "w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

function MixMan() {
  const [pass, setPass] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  if (!supabase) return <p className="p-10 text-muted-foreground">Supabase is not connected. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p>;

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase!.rpc("mixman_ok", { p_pass: pass });
    if (error || !data) setErr("Wrong password");
    else setOk(true);
  };

  if (!ok)
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <form onSubmit={login} className="w-full max-w-sm space-y-4 border border-border bg-card p-8">
          <h1 className="font-display text-2xl text-primary">Mix Man</h1>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" className={input} autoFocus />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className="w-full bg-primary py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground">Enter</button>
        </form>
      </div>
    );
  return <Manager pass={pass} />;
}

function Manager({ pass }: { pass: string }) {
  const qc = useQueryClient();
  const { data: cars = [] } = useQuery({ queryKey: ["cars"], queryFn: fetchCars });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("");
  const [stock, setStock] = useState("1");
  const [colors, setColors] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const p = Number(price) || 0, s = Number(sale) || 0;

  const add = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !p || !s || files.length < 1) return setMsg("Add a name, prices and at least 1 image.");
    setBusy(true); setMsg("");
    try {
      const urls: string[] = [];
      for (const f of files) {
        const path = `${crypto.randomUUID()}-${f.name.replace(/[^\w.]/g, "_")}`;
        const { error } = await supabase!.storage.from("car-images").upload(path, f);
        if (error) throw error;
        urls.push(supabase!.storage.from("car-images").getPublicUrl(path).data.publicUrl);
      }
      const { error } = await supabase!.rpc("mixman_add_car", {
        p_pass: pass, p_name: name, p_price: p, p_sale_price: s, p_colors: colors, p_stock: Number(stock) || 0, p_images: urls,
      });
      if (error) throw error;
      setName(""); setPrice(""); setSale(""); setStock("1"); setColors([]); setFiles([]);
      (e.target as HTMLFormElement).reset();
      setMsg("Car added.");
      qc.invalidateQueries({ queryKey: ["cars"] });
    } catch (x) {
      setMsg("Error: " + (x as Error).message);
    }
    setBusy(false);
  };

  const remove = async (id: string, n: string) => {
    if (!confirm(`Remove ${n}?`)) return;
    const { error } = await supabase!.rpc("mixman_delete_car", { p_pass: pass, p_id: id });
    if (error) alert(error.message);
    qc.invalidateQueries({ queryKey: ["cars"] });
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl text-primary">Mix Man</h1>
      <form onSubmit={add} className="mt-8 grid gap-4 border border-border bg-card p-6 md:grid-cols-2">
        <label className="md:col-span-2 text-sm">Car name<input value={name} onChange={(e) => setName(e.target.value)} className={input} /></label>
        <label className="text-sm">Original price ($)<input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={input} /></label>
        <label className="text-sm">Discount price ($)<input type="number" value={sale} onChange={(e) => setSale(e.target.value)} className={input} /></label>
        <p className="text-sm text-muted-foreground">Amount saved: <span className="text-primary">{fmt(Math.max(0, p - s))}</span></p>
        <label className="text-sm">Cars in stock<input type="number" min={0} value={stock} onChange={(e) => setStock(e.target.value)} className={input} /></label>
        <div className="md:col-span-2 text-sm">
          Colours available
          <div className="mt-2 flex flex-wrap gap-2">
            {COLORS.map((c) => {
              const on = colors.includes(c);
              return (
                <button type="button" key={c} onClick={() => setColors(on ? colors.filter((x) => x !== c) : [...colors, c])}
                  className={`border px-3 py-1 text-xs ${on ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>{c}</button>
              );
            })}
          </div>
        </div>
        <label className="md:col-span-2 text-sm">Images (1–6)
          <input type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 6))} className={input} />
          {files.length > 0 && <span className="text-xs text-muted-foreground">{files.length} selected</span>}
        </label>
        <div className="md:col-span-2 flex items-center gap-4">
          <button disabled={busy} className="bg-primary px-8 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground disabled:opacity-50">{busy ? "Saving…" : "Add car"}</button>
          {msg && <span className="text-sm text-muted-foreground">{msg}</span>}
        </div>
      </form>

      <h2 className="mt-12 font-display text-2xl">Cars on the site ({cars.length})</h2>
      <div className="mt-4 divide-y divide-border border border-border">
        {cars.map((c) => (
          <div key={c.id} className="flex items-center gap-4 p-3">
            <img src={c.images[0]} alt="" className="h-14 w-20 object-cover" />
            <div className="flex-1 text-sm">
              <p className="font-semibold">{c.name}</p>
              <p className="text-muted-foreground">{fmt(c.sale_price)} · {c.stock} in stock · {c.colors.join(", ")}</p>
            </div>
            <button onClick={() => remove(c.id, c.name)} className="border border-destructive px-3 py-1 text-xs text-destructive hover:bg-destructive hover:text-destructive-foreground">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
