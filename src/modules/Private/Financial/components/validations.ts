import * as yup from "yup";
import { FinancialReleaseModel } from "../../../../models/Financial/FinancialRelease.model";

export const transactionValidation = yup.object<FinancialReleaseModel>().shape({
  title: yup.string().required("Obrigatório"),
  // value: yup
  //   .number()
  //   .transform((value, originalValue) => {
  //     return originalValue === "" ? null : value;
  //   })
  //   .required("Obrigatório")
  //   .lessThan(0, "O valor deve ser maior que 0"),
});
