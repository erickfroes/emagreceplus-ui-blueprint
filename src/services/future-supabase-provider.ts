import type { PatientDetail, PatientListResult, PatientRepository } from "@/contracts/patients";
import type { DataProvider } from "./data-provider";

const UI_ONLY_ERROR = "Supabase provider is not enabled in UI-only mode";

export class FutureSupabasePatientRepository implements PatientRepository {
  async listPatients(): Promise<PatientListResult> { throw new Error(UI_ONLY_ERROR); }
  async getPatientDetail(patientId: string): Promise<PatientDetail | null> {
    void patientId;
    throw new Error(UI_ONLY_ERROR);
  }
}

/**
 * Stub for a future provider migration.
 * Keep this file dependency-free from Supabase in the UI-only phase.
 */
export const futureSupabaseProvider: DataProvider = {
  patients: new FutureSupabasePatientRepository(),
};
