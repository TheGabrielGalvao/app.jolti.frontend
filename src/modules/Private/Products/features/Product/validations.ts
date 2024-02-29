import * as yup from "yup";
import { ProductModel } from "../../../../../models/Product.model";

export const productValidation = yup.object<ProductModel>().shape({
  name: yup.string().required(() => "Obrigatório"),
});
