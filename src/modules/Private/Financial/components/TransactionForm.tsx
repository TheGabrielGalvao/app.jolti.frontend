import { ForwardRefRenderFunction, forwardRef, useState } from "react";
import ModalElement, {
  ModalElementProps,
  ModalElementRef,
} from "../../../../core/components/atoms/ModalElement";
import { BaseForm } from "../../../../core/components/molecules/BaseForm";
import { EFinancialReleaseStatus, FinancialReleaseModel } from "../../../../models/Financial/FinancialRelease.model";
import FinancialReleaseService from "../../../../services/financial/FinancialReleaseService";
import { useQuery, useQueryClient } from "react-query";
import { useRoute } from "../../../../core/context/RouteContext";
import { ArrowDown, ArrowUp, Check } from "phosphor-react";
import { TextInput } from "../../../../core/components/molecules";
import { SelectInput } from "../../../../core/components/molecules/SelectInput";
import FinancialReleaseTypeService from "../../../../services/financial/FinancialReleaseTypeService";
import { ButtonElement, TextElement } from "../../../../core/components/atoms";
import { transactionValidation } from "./validations";
import ManualTransactionService from "../../../../services/financial/ManualTransactionService";
import { ManualTransactionModel } from "../../../../models/Financial/ManualTransaction.model";
import { EReleaseFlow } from "../../../../common/enum/Release";
import { RadioBox } from "../../../../core/components/atoms/RadioBox";

export interface TransactionFormProps extends ModalElementProps {
  uuid?: string;
  onSubmitAction(): void;
}

const TransactionForm: React.ForwardRefRenderFunction<
  ModalElementRef,
  TransactionFormProps
> = ({ uuid, title, onSubmitAction }, ref) => {
  const queryClient = useQueryClient();
  const { handleSetToast } = useRoute();
  const [flow, setFlow] = useState<EReleaseFlow>()

  const { data: transactionData } = useQuery(
    ["transaction", uuid],
    FinancialReleaseService.find,
    {
      retry: false,
      enabled: uuid !== null && uuid !== "",
      refetchOnWindowFocus: false,
    }
  );

  const { data: transactionTypeData } = useQuery(
    ["transactionType"],
    FinancialReleaseTypeService.getOptions,
    {
      retry: false,
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  const handleSubmitTransaction = async (data: ManualTransactionModel) => {
    if (uuid) {
      const objectSave: ManualTransactionModel = {
        ...data,
        flow: flow as EReleaseFlow,
        status: EFinancialReleaseStatus.Concluído,

      };
      await ManualTransactionService.update(uuid, objectSave);
    } else {
      const objectSave: ManualTransactionModel = {
        ...data,
        flow: flow as EReleaseFlow,
        status: EFinancialReleaseStatus.Concluído,
      };
      await ManualTransactionService.create(objectSave);
    }
    queryClient.invalidateQueries(["list-transactions"]);

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
        onSubmit={handleSubmitTransaction}
        defaultValues={transactionData}
        validationSchema={transactionValidation}
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
        <TextInput
          type="text"
          id="title"
          name="title"
          label="Título"
          placeholder="Título"
          className="w-full placeholder:text-gray-900 text-gray-900"
        />
        <TextInput
          type="text"
          id="value"
          name="value"
          label="Valor"
          placeholder="Valor"
          className="w-full"
        />
        {/* <SelectInput
          type="select"
          id="financialReleaseTypeUuid"
          name="financialReleaseTypeUuid"
          label="Tipo de Lançamento"
          placeholder="Tipo de Lançamento"
          className="w-full"
          options={transactionTypeData}
        /> */}
        <div className="flex justify-end w-full gap-2">
          {/* <ButtonElement
              variant="default"
              type="button"
              onClick={() => navigate("../list")}
            >
              Cancelar
            </ButtonElement> */}
          <ButtonElement variant="primary" type="submit" className="">
            Salvar
          </ButtonElement>
        </div>
      </BaseForm>
    </ModalElement>
  );
};

export default forwardRef(TransactionForm);
