import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { Check } from "phosphor-react";
import ProductService from "../../../../../../services/product/ProductService";
import { ProductModel } from "../../../../../../models/Product.model";
import { ERegisterStatus } from "../../../../../../core/util/enum/EStatus";
import {
  ButtonElement,
  CardElement,
  CheckboxElement,
  HeadingElement,
} from "../../../../../../core/components/atoms";
import { BaseForm } from "../../../../../../core/components/molecules/BaseForm";
import { productValidation } from "../validations";
import { TextInput } from "../../../../../../core/components/molecules";
import { useRoute } from "../../../../../../core/context/RouteContext";
import { SelectInput } from "../../../../../../core/components/molecules/SelectInput";
import ProductCategoryService from "../../../../../../services/product/ProductCategoryService";

export const ProductForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { uuid } = useParams<{ uuid?: string }>();
  const { handleSetToast } = useRoute();
  const [affectsStock, setAffectsStock] = useState(false);

  const { data: productCategoryData } = useQuery(
    ["productCategory"],
    ProductCategoryService.getOptions,
    {
      retry: false,
      enabled: uuid !== null && uuid !== "",
      refetchOnWindowFocus: false,
    }
  );

  const { data: productData } = useQuery(
    ["product", uuid],
    ProductService.find,
    {
      retry: false,
      enabled: uuid !== null && uuid !== "",
      refetchOnWindowFocus: false,
      onSuccess: (data: ProductModel) => {
        setAffectsStock(data.affectsStock);
      },
    }
  );

  const handleSubmitProduct = async (data: ProductModel) => {
    if (uuid) {
      const objectSave: ProductModel = {
        ...data,
        affectsStock: affectsStock,
      };
      await ProductService.update(uuid, objectSave);
    } else {
      const objectSave: ProductModel = {
        ...data,
        status: ERegisterStatus.ACTIVE,
        affectsStock: affectsStock,
      };
      await ProductService.create(objectSave);
    }

    queryClient.invalidateQueries(["list-products"]);

    handleSetToast({
      icon: <Check weight="bold" />,
      message: "Dados salvos com sucesso!",
      type: "success",
    });

    navigate("../product/list");
  };

  return (
    <CardElement className="h-full bg-card">
      <div className="flex w-full flex-col gap-4 py-4 px-40">
        <HeadingElement>Formulário de Cadastro</HeadingElement>
        <BaseForm
          onSubmit={handleSubmitProduct}
          validationSchema={productValidation}
          defaultValues={productData}
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
            <SelectInput
              type="select"
              id="productCategoryUuid"
              name="productCategoryUuid"
              label="Categoria"
              placeholder="Categoria"
              className="w-full"
              options={productCategoryData}
            />
          </div>
          <div className="flex gap-2 w-full items-center justify-end">
            <CheckboxElement
              name="affectsStock"
              checked={affectsStock}
              onClick={() => setAffectsStock(!affectsStock)}
              label="Movimenta Estoque"
              className="w-full flex-1 "
            />
            <TextInput
              type="text"
              id="minimalStock"
              name="minimalStock"
              label="Estoque Mínimo"
              placeholder="0"
              className="placeholder:text-gray-900 text-gray-900"
            />
            <TextInput
              type="text"
              id="price"
              name="price"
              label="Preço"
              placeholder="0,00"
              className=" placeholder:text-gray-900 text-gray-900"
            />
          </div>
          <div className="flex justify-end w-full gap-2">
            <ButtonElement
              variant="default"
              type="button"
              onClick={() => navigate("../product/list")}
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
