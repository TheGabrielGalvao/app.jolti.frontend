import { InventoryAdjustmentModel } from "../../models/Stock/InventoryAdjustment.model";
import { BaseService } from "../BaseService";

const API_URL = "InventoryAdjustment";

export default new (class InventoryAdjustmentService extends BaseService<InventoryAdjustmentModel> {
  constructor() {
    super(API_URL, "uuid");
  }

  
})();
