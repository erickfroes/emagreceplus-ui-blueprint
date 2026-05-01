"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function selectUnit(formData: FormData) {
  const unitId = String(formData.get("unitId") ?? "");
  const cookieStore = await cookies();
  cookieStore.set("active_unit_id", unitId, { httpOnly: true, sameSite: "lax", path: "/" });
  redirect("/dashboard");
}
