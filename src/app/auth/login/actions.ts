"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/ui-only/server";

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/auth/login?error=1");
  redirect("/auth/environment");
}
