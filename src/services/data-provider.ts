import type { PatientRepository } from "@/contracts/patients";

export interface DataProvider {
  patients: PatientRepository;
}
