import { ERegisterStatus } from "../core/util/enum/EStatus";
import { ProductCategoryModel } from "./ProductCategory.model";
import { StockLocationModel } from "./Stock/StockLocation.model";

export interface ProductModel {
  uuid?: string;
  name: string;
  price?: number
  description?: string;
  status: ERegisterStatus;
  productCategoryUuid?: string;
  productCategory: ProductCategoryModel
  affectsStock: boolean
  minimalStock?: number
  stockLocationUuid?: string
  stockLocation?: StockLocationModel
}
