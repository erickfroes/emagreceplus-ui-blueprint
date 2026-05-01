import type { PatientDetail, PatientListResult, PatientRepository } from "@/contracts/patients";
import type { DataProvider } from "./data-provider";
import { patientDetailsMock, patientsMock } from "@/data/mock/patients.mock";

export class MockPatientRepository implements PatientRepository {
  async listPatients(): Promise<PatientListResult> { return { state: "default", items: patientsMock }; }
  async getPatientDetail(patientId: string): Promise<PatientDetail | null> { return patientDetailsMock[patientId] ?? null; }
}

export const mockDataProvider: DataProvider = {
  patients: new MockPatientRepository(),
};
