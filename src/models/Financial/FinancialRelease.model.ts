export interface FinancialReleaseModel {
  uuid?: string;
  title: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  status: EFinancialReleaseStatus;
  operation: EFinancialOperation;
  financialReleaseTypeUuid: string;
  userUuid: string;
  contactUuid?: string;
}

export enum EFinancialReleaseStatus {
  "Pendente" = 0,
  "Concluído" = 1,
  "Falhou" = 2,
  "Cancelado" = 3,
  "Em Processamento" = 4,
  "Reembolsado" = 5,
  "Disputado" = 6,
}

export const EFinancialReleaseStatusLabels = {
  PENDING: "Pendente",
};

export enum EFinancialOperation {
  INFLOW = 0,
  OUTFLOW = 1,
}
