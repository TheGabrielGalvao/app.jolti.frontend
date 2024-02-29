import React from "react";
import { UserProfileModel } from "../../../../models/UserProfile.model";
import UserProfileService from "../../../../services/UserProfileService";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import {
  ButtonElement,
  CardElement,
  HeadingElement,
  TextareaElement,
} from "../../../../core/components/atoms";
import { BaseForm } from "../../../../core/components/molecules/BaseForm";
import { TextInput } from "../../../../core/components/molecules";
import { ERegisterStatus } from "../../../../core/util/enum/EStatus";
import { userProfileValidation } from "../validations";
import { Check } from "phosphor-react";
import { useRoute } from "../../../../core/context/RouteContext";

export const UserProfileForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { uuid } = useParams<{ uuid?: string }>();
  const { handleSetToast } = useRoute();
  const { data: userProfileData } = useQuery(
    ["userProfile", uuid],
    UserProfileService.find,
    {
      retry: false,
      enabled: uuid !== null && uuid !== "",
      refetchOnWindowFocus: false,
    }
  );

  const handleSubmitUserProfile = async (data: UserProfileModel) => {
    if (uuid) {
      const objectSave: UserProfileModel = {
        ...data,
      };
      await UserProfileService.update(uuid, objectSave);
    } else {
      const objectSave: UserProfileModel = {
        ...data,
        status: ERegisterStatus.ACTIVE,
      };
      await UserProfileService.create(objectSave);
    }
    queryClient.invalidateQueries(["list-userProfiles"]);

    handleSetToast({
      icon: <Check weight="bold" />,
      message: "Dados salvos com sucesso!",
      type: "success",
    });

    navigate("../profile/list");
  };

  return (
    <CardElement className="h-full bg-card">
      <div className="flex w-full flex-col gap-4 py-4 px-10">
        <HeadingElement>Formulário de Cadastro</HeadingElement>
        <BaseForm
          onSubmit={handleSubmitUserProfile}
          validationSchema={userProfileValidation}
          defaultValues={userProfileData}
          className="flex flex-col items-center justify-center w-full gap-4 px-10"
        >
          <div className="flex gap-2 w-full items-center justify-center">
            <TextInput
              type="text"
              id="name"
              name="name"
              label="Nome"
              placeholder="Nome"
              className="w-full placeholder:text-gray-900 text-gray-900"
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
          <div className="flex gap-2 w-full items-center justify-center">
            {/* <TextareaElement
              id="description"
              name="description"
              // label="Descrição"
              placeholder="Descrição"
              className="w-full"
            /> */}
          </div>
          <div className="flex justify-end w-full gap-2">
            <ButtonElement
              variant="default"
              type="button"
              onClick={() => navigate("../profile/list")}
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
