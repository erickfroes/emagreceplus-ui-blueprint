export type MockPatient = {
  id: string;
  nome: string;
  plano: 'Essential' | 'Premium';
  progressoSemanas: number;
};

export const mockPatients: MockPatient[] = [
  { id: 'pac_001', nome: 'Fernanda Souza', plano: 'Premium', progressoSemanas: 4 },
  { id: 'pac_002', nome: 'Carlos Lima', plano: 'Essential', progressoSemanas: 2 }
];
