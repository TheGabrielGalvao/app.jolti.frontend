import * as yup from "yup";
import { UserModel } from "../../../models/User.model";

export const userProfileValidation = yup.object<UserModel>().shape({
  name: yup.string().required(() => "Obrigatório"),
});
