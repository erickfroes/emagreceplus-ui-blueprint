export interface TenantUnit {
  id: string;
  name: string;
  status: "active" | "inactive" | "simulated";
}
