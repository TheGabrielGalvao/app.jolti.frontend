import * as yup from "yup";
import { ContactModel } from "../../../models/Contact.model";

export const contactValidation = yup.object<ContactModel>().shape({
  fullName: yup.string().required(() => "Obrigatório"),
  email: yup
    .string()
    .required(() => "Obrigatório")
    .email("Email inválido"),
  cpfCnpj: yup.string().required(() => "Preenche esse caraio"),
});
