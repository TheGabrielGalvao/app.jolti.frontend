import { ERegisterStatus } from "../core/util/enum/EStatus";

export interface ProductCategoryModel {
  uuid?: string;
  name: string;
  description?: string;
  status: ERegisterStatus;
}
