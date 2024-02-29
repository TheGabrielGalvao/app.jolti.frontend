import { ProductModel } from "../../models/Product.model";
import { BaseService, BeforeSaveParams } from "../BaseService";

const API_URL = "Product";

export default new (class ProductService extends BaseService<ProductModel> {
  constructor() {
    super(API_URL, "uuid");
  }
  
  beforeSave = async ({ data }: BeforeSaveParams<ProductModel>): Promise<ProductModel> => {
    const normalizedData: ProductModel = {
      ...data,
      description: data.description ?? ""
    }
    return normalizedData;
  };
  

})();
