import * as yup from "yup";

export const userSignInValidation = yup.object().shape({
  // email: yup
  //   .string()
  //   .required(() => "Obrigatório")
  //   .email("Email inválido"),
  password: yup.string().required(() => "Obrigatório"),
});
