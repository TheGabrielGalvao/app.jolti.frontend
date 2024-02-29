import { EReleaseFlow } from "../../common/enum/Release";
import { ProductModel } from "../Product.model";
import { EStockReleaseStatus } from "./EStockReleaseStatus";
import { StockLocationModel } from "./StockLocation.model";


export interface InventoryAdjustmentModel
{
     uuid?: string 
     description?: string 
     amount: number 
     createdAt?: Date 
     updatedAt?: Date 
     flow: EReleaseFlow 
     status: EStockReleaseStatus 
     productUuid?: string  
     stockLocationUuid?: string  
     product: ProductModel 
     stockLocation: StockLocationModel 
}


export enum EInventoryAdjustmentStatus {
  PENDING = 0,
}

export const EInventoryAdjustmentStatusLabels = {
  PENDING: "Pendente",
};

export enum EInventoryAdjustmentOperation {
  INFLOW = 0,
  OUTFLOW = 1,
}
