import type { PackageSaleFlowDto, SaleStep } from "@/contracts/package-sale";

export const packageSaleStepsMock: SaleStep[] = [
  { key: "patient", label: "Paciente", description: "Vincular paciente ou lead" },
  { key: "package", label: "Pacote", description: "Escolher pacote e condições" },
  { key: "payment", label: "Pagamento", description: "Salvar condições" },
  { key: "contract", label: "Contrato", description: "Gerar e enviar assinatura" },
  { key: "confirmation", label: "Confirmação", description: "Confirmar venda e cobranças" },
];

export const packageSaleFlowMock: PackageSaleFlowDto = {
  state: "default",
  activeStep: "payment",
  patientName: "Mariana Rocha",
  packageName: "Programa Metabólico 12 semanas",
  packagePriceCents: 289000,
  paymentConditions: [
    { label: "Método", value: "Pix parcelado (simulado)" },
    { label: "Parcelas", value: "4x de R$ 722,50" },
    { label: "Primeiro vencimento", value: "10/05/2026" },
    { label: "Regra de ativação", value: "Após 1ª parcela" },
  ],
  signableDocuments: [
    { id: "doc-1", name: "Contrato de prestação de serviço", status: "pending", provider: "d4sign_simulado" },
    { id: "doc-2", name: "Termo de ciência e consentimento", status: "pending", provider: "d4sign_simulado" },
  ],
  simulatedChargesCount: 4,
};
