import * as yup from "yup";
import { UserModel } from "../../../models/User.model";
import { isValidUUID } from "../../../core/util/helpers/string";
import { required } from "../../../core/util/helpers/validationHelper";

export const userValidation = yup.object<UserModel>().shape({
  userName: yup.string().required(() => required("Nome")),
  userProfileUuid: yup
    .string()
    .required(() => required("Perfil de Usuário"))
    .test("is-uuid", "UUID inválido", (value) => isValidUUID(value)),
  userEmail: yup
    .string()
    .required(() => required("Email"))
    .email("Email inválido"),
});
