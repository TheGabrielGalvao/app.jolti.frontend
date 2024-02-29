import * as yup from "yup";
import { InventoryAdjustmentModel } from "../../../../../models/Stock/InventoryAdjustment.model";

export const inventoryAdjustmentValidation = yup.object<InventoryAdjustmentModel>().shape({
  
});
