import React, { Suspense } from "react";
import { ContactModel } from "../../../../models/Contact.model";
import { contactValidation } from "../validations";
import ContactService from "../../../../services/ContactService";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import {
  ButtonElement,
  CardElement,
  HeadingElement,
} from "../../../../core/components/atoms";
import { BaseForm } from "../../../../core/components/molecules/BaseForm";
import { TextInput } from "../../../../core/components/molecules";
import { ERegisterStatus } from "../../../../core/util/enum/EStatus";
import { useRoute } from "../../../../core/context/RouteContext";
import { Check } from "phosphor-react";
import { toastyPreset } from "../../../../core/util/constants/toastyPreSet";
import { msg } from "../../../../core/util/constants/msg";

export const ContactForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { uuid } = useParams();
  const { handleSetToast } = useRoute();
  const { data } = useQuery(["contact", uuid], ContactService.find, {
    retry: false,
    enabled: uuid !== null && uuid !== "",
    refetchOnWindowFocus: false,
  });

  const handleSubmitContact = async (data: ContactModel) => {
    if (uuid) {
      const objectSave: ContactModel = {
        ...data,
      };
      await ContactService.update(uuid, objectSave);
    } else {
      const objectSave: ContactModel = {
        ...data,
        status: ERegisterStatus.ACTIVE,
      };
      await ContactService.create(objectSave);
    }
    queryClient.invalidateQueries(["list-contacts"]);

    handleSetToast({
      ...toastyPreset.SUCCESS,
      message: msg.common.saveSuccess,
    });

    navigate("../list");
  };

  return (
    <CardElement className="h-full bg-card">
      <div className="flex w-full flex-col">
        <HeadingElement>Formulário de Cadastro</HeadingElement>
        <Suspense fallback={"Carregando..."}>
          <BaseForm
            onSubmit={handleSubmitContact}
            validationSchema={contactValidation}
            defaultValues={data}
            className="flex flex-col items-center justify-center w-full gap-4 px-10"
          >
            <div className="flex gap-2 w-full items-center justify-center">
              <TextInput
                type="text"
                id="fullName"
                name="fullName"
                label="Nome"
                placeholder="Nome"
                className="w-full placeholder:text-gray-900 text-gray-900"
              />
              <TextInput
                type="text"
                id="surName"
                name="surName"
                label="Apelido"
                placeholder="Apelido"
                className="w-full"
              />
              <TextInput
                type="text"
                id="cpfCnpj"
                name="cpfCnpj"
                label="CPF/CNPJ"
                placeholder="CPF/CNPJ"
                className="w-full"
              />
            </div>
            <div className="flex gap-2 w-full items-center justify-center">
              <TextInput
                type="text"
                id="email"
                name="email"
                label="Email"
                placeholder="Email"
                className="w-full"
              />
              <TextInput
                type="text"
                id="phone"
                name="phone"
                label="Telefone"
                placeholder="Telefone"
                className="w-full"
              />
            </div>
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
        </Suspense>
      </div>
    </CardElement>
  );
};
