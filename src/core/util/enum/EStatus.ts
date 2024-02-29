export enum GenericStatus {
  Undefined = "Não Definido",
  Active = "Ativo",
  Inactive = "Inativo",
}

export interface GenericStatusIndexable {
  [key: string]: GenericStatus;
}

export const GenericStatusIndex: GenericStatusIndexable = {
  1: GenericStatus.Undefined,
  2: GenericStatus.Active,
  3: GenericStatus.Inactive,
};

export enum ERegisterStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export const ERegisterStatusLabels = {
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
};
