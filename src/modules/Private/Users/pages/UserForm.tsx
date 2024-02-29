import React from "react";
import { UserModel } from "../../../../models/User.model";
import UserService from "../../../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import {
  ButtonElement,
  CardElement,
  HeadingElement,
} from "../../../../core/components/atoms";
import { BaseForm } from "../../../../core/components/molecules/BaseForm";
import { TextInput } from "../../../../core/components/molecules";
import { userValidation } from "../../Users/validations";
import { ERegisterStatus } from "../../../../core/util/enum/EStatus";
import { useRoute } from "../../../../core/context/RouteContext";
import { Check } from "phosphor-react";
import { SelectInput } from "../../../../core/components/molecules/SelectInput";
import UserProfileService from "../../../../services/UserProfileService";

export const UserForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleSetToast } = useRoute();
  const { uuid } = useParams<{ uuid?: string }>();
  const { data: userData } = useQuery(["user", uuid], UserService.find, {
    retry: false,
    enabled: uuid !== null && uuid !== "",
    refetchOnWindowFocus: false,
  });

  const { data: userProfileData } = useQuery(
    ["userProfile"],
    UserProfileService.getOptions,
    {
      retry: false,
      enabled: uuid !== null && uuid !== "",
      refetchOnWindowFocus: false,
    }
  );

  const handleSubmitUser = async (data: UserModel) => {
    if (uuid) {
      const objectSave: UserModel = {
        ...data,
        userProfileUuid: userData?.userProfileUuid,
      };
      await UserService.update(uuid, objectSave);
    } else {
      const objectSave: UserModel = {
        ...data,
        status: ERegisterStatus.ACTIVE,
        // password: "1234",
        // profileUuid: "3F7EBD24-C159-4951-A49B-14702DEFBADC",
      };
      await UserService.create(objectSave);
    }
    queryClient.invalidateQueries(["list-users"]);

    handleSetToast({
      icon: <Check weight="bold" />,
      message: "Dados salvos com sucesso!",
      type: "success",
    });

    navigate("../list");
  };

  return (
    <CardElement className="h-full bg-card">
      <div className="flex w-full flex-col gap-4 py-4 px-10">
        <HeadingElement>Formulário de Cadastro</HeadingElement>
        <BaseForm
          onSubmit={handleSubmitUser}
          validationSchema={userValidation}
          defaultValues={userData}
          className="flex flex-col items-center justify-center w-full gap-4 px-10"
        >
          <div className="flex gap-2 w-full items-center justify-center">
            <TextInput
              type="text"
              id="userName"
              name="userName"
              label="Nome"
              placeholder="Nome"
              className="w-full placeholder:text-gray-900 text-gray-900"
            />
            <TextInput
              type="text"
              id="userEmail"
              name="userEmail"
              label="Email"
              placeholder="Email"
              className="w-full"
            />
            <SelectInput
              type="select"
              id="userProfileUuid"
              name="userProfileUuid"
              label="Perfil de Acesso"
              placeholder="Perfil de Acesso"
              className="w-full"
              options={userProfileData}
            />
            {/* <TextInput
              type="password"
              id="password"
              name="password"
              label="Senha"
              placeholder="Senha"
              className="w-full"
            /> */}
          </div>
          <div className="flex gap-2 w-full items-center justify-center"></div>
          <div className="flex justify-end w-full gap-2">
            <ButtonElement
              variant="default"
              type="button"
              onClick={() => navigate("../list")}
            >
              Cancelar
            </ButtonElement>
            <ButtonElement variant="primary" type="submit" className="">
              Salvar
            </ButtonElement>
          </div>
        </BaseForm>
      </div>
    </CardElement>
  );
};
