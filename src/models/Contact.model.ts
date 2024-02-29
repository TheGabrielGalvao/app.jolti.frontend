import { ERegisterStatus } from "../core/util/enum/EStatus";

export enum ETipoContato {
  NONE = 0,
  CLIENTE = 1,
  OPERADORACARTAO = 2,
  FORNECEDOR = 3,
  FUNCIONARIO = 4,
  FREELANCER = 5,
}

export const ETipoContatoLabels = {
  NONE: "Não Definido",
  CLIENTE: "Cliente",
  OPERADORACARTAO: "Operadora de Cartão",
  FORNECEDOR: "Fornecedor",
  FUNCIONARIO: "Funcionário",
  FREELANCER: "Freelancer",
};

export enum EDocumentType {
  NONE = 0,
  CPF = 1,
  CNPJ = 2,
}

export const EDocumentTypeLabels = {
  NONE: "Não Definido",
  CPF: "CPF",
  CNPJ: "CNPJ",
};

export interface ContactModel {
  uuid?: string;
  fullName: string;
  surName?: string;
  email?: string;
  phone: string;
  secondaryPhone?: string;
  documentType?: EDocumentType;
  cpfCnpj?: string;
  status: ERegisterStatus;
}
