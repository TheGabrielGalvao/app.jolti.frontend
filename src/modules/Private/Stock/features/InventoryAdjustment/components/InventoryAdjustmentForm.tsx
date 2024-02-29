import { ForwardRefRenderFunction, forwardRef, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ArrowDown, ArrowUp, Check } from "phosphor-react";
import ModalElement, { ModalElementProps, ModalElementRef } from "../../../../../../core/components/atoms/ModalElement";
import { useRoute } from "../../../../../../core/context/RouteContext";
import { BaseForm } from "../../../../../../core/components/molecules/BaseForm";
import { TextInput } from "../../../../../../core/components/molecules";
import { SelectInput } from "../../../../../../core/components/molecules/SelectInput";
import { ButtonElement, TextElement, TextareaElement } from "../../../../../../core/components/atoms";
import { inventoryAdjustmentValidation } from "../validation";
import ProductService from "../../../../../../services/product/ProductService";
import { OptionItem } from "../../../../../../core/types/Option";
import { RadioBox } from "../../../../../../core/components/atoms/RadioBox";
import { EReleaseFlow } from "../../../../../../common/enum/Release";
import { useNavigate } from "react-router-dom";
import { InventoryAdjustmentModel } from "../../../../../../models/Stock/InventoryAdjustment.model";
import InventoryAdjustmentService from "../../../../../../services/stock/InventoryAdjustmentService";

export interface InventoryAdjustmentFormProps extends ModalElementProps {
  uuid?: string;
  onSubmitAction(): void;
  cancelAction?(): void
}

const InventoryAdjustmentForm: React.ForwardRefRenderFunction<
  ModalElementRef,
  InventoryAdjustmentFormProps
> = ({ uuid, title, onSubmitAction, cancelAction = () => { } }, ref) => {
  const queryClient = useQueryClient();
  const { handleSetToast } = useRoute();
  const [productList, setProductList] = useState<OptionItem[]>()
  const [flow, setFlow] = useState<EReleaseFlow>()

  const { data: inventoryAdjustmentData } = useQuery(
    ["list-inventoryAdjustments", uuid],
    InventoryAdjustmentService.find,
    {
      retry: false,
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );


  useQuery(
    ["product-options"],
    ProductService.getOptions,
    {
      retry: false,
      enabled: true,
      refetchOnWindowFocus: false,
      onSuccess: (data: OptionItem[]) => {
        setProductList(data)
      }
    }
  );

  const handleSubmitInventoryAdjustment = async (data: InventoryAdjustmentModel) => {
    const objectSave: InventoryAdjustmentModel = {
      ...data,
      flow: flow as EReleaseFlow
    };
    if (uuid) {

      await InventoryAdjustmentService.update(uuid, objectSave);
    } else {


      await InventoryAdjustmentService.create(objectSave);
    }
    queryClient.invalidateQueries(["list-inventoryAdjustments"]);

    onSubmitAction();

    handleSetToast({
      icon: <Check weight="bold" />,
      message: "Dados salvos com sucesso!",
      type: "success",
    });
  };


  return (
    <ModalElement title={title} ref={ref}>
      <BaseForm
        onSubmit={handleSubmitInventoryAdjustment}
        defaultValues={inventoryAdjustmentData ?? {}}
        validationSchema={inventoryAdjustmentValidation}
        className="w-96"
      >
        <div className="flex w-full py-2 justify-center items-center gap-2">
          <RadioBox
            type="button"
            onClick={() => setFlow(EReleaseFlow.Entrada)}
            isActive={flow === EReleaseFlow.Entrada}
            activeColor='green'
            className="py-3"
          >
            <ArrowUp />
            <TextElement size="sm">Entrada</TextElement>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setFlow(EReleaseFlow.Saída)}
            isActive={flow === EReleaseFlow.Saída}
            activeColor='red'
            className="py-3"
          >
            <ArrowDown />
            <TextElement size="sm">Saída</TextElement>
          </RadioBox>
        </div>
        <SelectInput
          type="select"
          id="productUuid"
          name="productUuid"
          label="Produto"
          placeholder="Produto"
          className="w-full"
          options={productList}
        />
        <TextInput
          type="text"
          id="amount"
          name="amount"
          label="Quantidade"
          placeholder="Quantidade"
          className="w-full"
        />

        {/* <TextareaElement
          id="description"
          name="description"
          label="Descrição"
          placeholder="Observações"
          className="w-full"
        /> */}
        <div className="flex justify-end w-full gap-2">
          <ButtonElement
            variant="default"
            type="button"
            onClick={() => cancelAction()}
          >
            Cancelar
          </ButtonElement>
          <ButtonElement variant="primary" type="submit" className="">
            Salvar
          </ButtonElement>
        </div>
      </BaseForm>
    </ModalElement>
  );
};

export default forwardRef(InventoryAdjustmentForm);
