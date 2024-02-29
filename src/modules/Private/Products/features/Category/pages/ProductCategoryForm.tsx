import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { Check } from "phosphor-react";
import ProductCategoryService from "../../../../../../services/product/ProductCategoryService";
import { ProductCategoryModel } from "../../../../../../models/ProductCategory.model";
import { ERegisterStatus } from "../../../../../../core/util/enum/EStatus";
import { ButtonElement, CardElement, HeadingElement } from "../../../../../../core/components/atoms";
import { BaseForm } from "../../../../../../core/components/molecules/BaseForm";
import { productCategoryValidation } from "../validations";
import { TextInput } from "../../../../../../core/components/molecules";
import { useRoute } from "../../../../../../core/context/RouteContext";

export const ProductCategoryForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { uuid } = useParams<{ uuid?: string }>();
  const { handleSetToast } = useRoute();
  const { data: productCategoryData } = useQuery(
    ["productCategory", uuid],
    ProductCategoryService.find,
    {
      retry: false,
      enabled: uuid !== null && uuid !== "",
      refetchOnWindowFocus: false,
    }
  );

  const handleSubmitProductCategory = async (data: ProductCategoryModel) => {
    if (uuid) {
      const objectSave: ProductCategoryModel = {
        ...data,
      };
      await ProductCategoryService.update(uuid, objectSave);
    } else {
      const objectSave: ProductCategoryModel = {
        ...data,
        status: ERegisterStatus.ACTIVE,
      };
      await ProductCategoryService.create(objectSave);
    }
    queryClient.invalidateQueries(["list-productCategories"]);

    handleSetToast({
      icon: <Check weight="bold" />,
      message: "Dados salvos com sucesso!",
      type: "success",
    });

    navigate("../category/list");
  };

  return (
    <CardElement className="h-full bg-card">
      <div className="flex w-full flex-col gap-4 py-4 px-10">
        <HeadingElement>Formulário de Cadastro</HeadingElement>
        <BaseForm
          onSubmit={handleSubmitProductCategory}
          validationSchema={productCategoryValidation}
          defaultValues={productCategoryData}
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
              onClick={() => navigate("../category/list")}
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
