"use server";

import { createClient } from "@/lib/ui-only/server";

export async function createPackageAction(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return;

  const code = String(formData.get("code") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const serviceId = String(formData.get("serviceId") ?? "").trim();

  const { data: membership } = await supabase
    .from("memberships")
    .select("tenant_id")
    .eq("user_id", authData.user.id)
    .eq("status", "active")
    .limit(1)
    .maybeSingle();

  if (!membership?.tenant_id || !code || !name || !serviceId) return;

  const { data, error } = await supabase.rpc("create_package", {
    p_tenant_id: membership.tenant_id,
    p_code: code,
    p_name: name,
    p_services: [{ service_id: serviceId, quantity: 1 }],
    p_entitlements: {
      app_enabled: formData.get("appEnabled") === "on",
      chat_enabled: formData.get("chatEnabled") === "on",
      documents_enabled: formData.get("documentsEnabled") === "on",
      checkin_enabled: formData.get("checkinEnabled") === "on",
    },
  });

  if (error) return;
  void data;
}
