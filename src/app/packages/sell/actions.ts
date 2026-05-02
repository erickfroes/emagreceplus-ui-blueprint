"use server";

import { createClient } from "@/lib/ui-only/server";

export async function createPackageSaleAction(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return;

  const packageId = String(formData.get("packageId") ?? "").trim();
  const patientIdRaw = String(formData.get("patientId") ?? "").trim();
  const leadIdRaw = String(formData.get("leadId") ?? "").trim();
  const installments = Number(formData.get("installments") ?? 1);
  const firstDueDate = String(formData.get("firstDueDate") ?? "").trim();
  const rule = String(formData.get("releaseRule") ?? "after_first_payment").trim();

  const { data: membership } = await supabase.from("memberships").select("tenant_id").eq("user_id", authData.user.id).eq("status", "active").limit(1).maybeSingle();
  if (!membership?.tenant_id || !packageId || !firstDueDate || installments <= 0) return;

  const saleReference = `SALE-${Date.now()}`;

  await supabase.rpc("create_package_sale", {
    p_tenant_id: membership.tenant_id,
    p_package_id: packageId,
    p_patient_id: patientIdRaw || null,
    p_lead_id: leadIdRaw || null,
    p_sale_reference: saleReference,
    p_installments: installments,
    p_first_due_date: firstDueDate,
    p_entitlement_release_rule: rule,
  });
}
