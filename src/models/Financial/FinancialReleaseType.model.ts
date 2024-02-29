import { EFinancialOperation } from "./FinancialRelease.model";

export interface FinancialReleaseTypeModel {
  uuid?: string;
  name: string;
  description: string;
  operation: EFinancialOperation;
  userUuid?: string;
}
