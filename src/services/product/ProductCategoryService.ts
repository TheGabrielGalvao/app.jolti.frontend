import { ProductCategoryModel } from "../../models/ProductCategory.model";
import { BaseService } from "../BaseService";

const API_URL = "ProductCategory";

export default new (class ProductCategoryService extends BaseService<ProductCategoryModel> {
  constructor() {
    super(API_URL, "uuid");
  }
})();
