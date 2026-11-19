import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;

export type Car = {
  id: string;
  name: string;
  price: number;
  sale_price: number;
  colors: string[];
  stock: number;
  images: string[];
};

export const COLORS = ["Black", "White", "Silver", "Grey", "Red", "Blue", "Green", "Yellow", "Orange", "Gold", "Brown", "Purple"];

export const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
export const offPct = (c: Pick<Car, "price" | "sale_price">) =>
  c.price > 0 ? Math.round(((c.price - c.sale_price) / c.price) * 100) : 0;

export async function fetchCars(): Promise<Car[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Car[];
}
