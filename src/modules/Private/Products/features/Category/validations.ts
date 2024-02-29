import * as yup from "yup";
import { ProductCategoryModel } from "../../../../../models/ProductCategory.model";

export const productCategoryValidation = yup.object<ProductCategoryModel>().shape({
  name: yup.string().required(() => "Obrigatório"),
});
