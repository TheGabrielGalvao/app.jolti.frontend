import { takeRight } from "lodash";
import {
  BasicTable,
  Column,
} from "../../../../core/components/atoms/BasicTable";
import { useQuery } from "react-query";
import {
  ButtonElement,
  CardElement,
  HeadingElement,
  TextElement,
} from "../../../../core/components/atoms";
import { useDefaultQueryConfig } from "../../../../core/hooks/queryConfig";
import FinancialReleaseService from "../../../../services/financial/FinancialReleaseService";
import { enumToOptionItemList, enumToSelectOptions } from "../../../../core/util/helpers/objectHelper";
import { OptionItem } from "../../../../core/types/Option";
import {
  EFinancialOperation,
  EFinancialReleaseStatus,
  EFinancialReleaseStatusLabels,
  FinancialReleaseModel,
} from "../../../../models/Financial/FinancialRelease.model";
import clsx from "clsx";
import { ArrowDown, ArrowUp, Funnel, Minus, Plus } from "phosphor-react";
import {
  dateTimeFormat,
  moneyFormat,
} from "../../../../core/util/helpers/datetimeFormat";
import { ModalElementRef } from "../../../../core/components/atoms/ModalElement";
import { useRef } from "react";
import TransactionForm from "../components/TransactionForm";

export const Transactions = () => {
  // const queryClient = useQueryClient();
  const modalRef = useRef<ModalElementRef>(null);
  const queryConfig = useDefaultQueryConfig();
  const { data: transactions } = useQuery(
    "list-transactions",
    () => FinancialReleaseService.getAll(),
    queryConfig
  );

  const handleShowModal = () => {
    modalRef.current?.show();
  };

  const list = takeRight(transactions, 10);

  const StatusBody = (row: any) => {
    const statusOptions: OptionItem[] = enumToOptionItemList(EFinancialReleaseStatus)
    const status = statusOptions.find(
      (item) => item.value?.toString() === row.status.toString()
    ) as OptionItem;

    return (
      <TextElement
        size="sm"
        className={clsx({
          "font-bold bg-warning/30 text-subtitle py-1 px-2 rounded-md uppercase shadow-md":
            status.value === EFinancialReleaseStatus.Pendente,
          "font-bold bg-success/20 text-success py-1 px-2 rounded-md uppercase shadow-[96px]":
            status.value === EFinancialReleaseStatus.Concluído,
          // "font-bold bg-red-200 text-red-700 py-1 px-2 rounded-md uppercase shadow-md":
          //   status.value === EFinancialReleaseStatus.INACTIVE,
        })}
      >
        {status?.label}
      </TextElement>
    );
  };

  const ValueBody = (row: FinancialReleaseModel) => {
    const value = row.value;

    return (
      <TextElement
        size="sm"
        className={clsx({
          "font-bold text-danger py-1 px-2 rounded-md uppercase":
            row.operation === EFinancialOperation.OUTFLOW,
          "font-bold text-success py-1 px-2 rounded-md uppercase":
            row.operation === EFinancialOperation.INFLOW,
        })}
      >
        {row.operation === EFinancialOperation.INFLOW ? (
          <span className="flex gap-1 justify-start items-center">
            <Plus />
            {moneyFormat(value)}
            <ArrowUp />
          </span>
        ) : (
          <span className="flex gap-2 justify-start items-center">
            <Minus />
            {moneyFormat(value)}
            <ArrowDown />
          </span>
        )}
      </TextElement>
    );
  };

  const columnList: Column[] = [
    {
      name: "title",
      label: "Título",
      sortable: true,
      order: 1,
    },
    {
      name: "value",
      label: "Valor",
      sortable: true,
      order: 2,
      bodyShape: ValueBody,
    },
    {
      name: "createdAt",
      label: "Data de Lançamento",
      sortable: true,
      order: 3,
      bodyShape: (row: FinancialReleaseModel) =>
        dateTimeFormat(row.createdAt.toString()),
    },
    {
      name: "status",
      label: "Status",
      sortable: true,
      order: 4,
      bodyShape: StatusBody,
    },
  ];

  // const handleDelete = async (uuid: string) => {
  //   if (!uuid) {
  //     return;
  //   }

  //   await FinancialReleaseService.remove(uuid);
  //   queryClient.invalidateQueries("list-transactions");

  //   navigate("../list");
  // };

  return (
    <CardElement className="flex flex-col w-full h-full bg-card">
      <TransactionForm
        title="Nova Transação"
        ref={modalRef}
        onSubmitAction={() => modalRef.current?.hide()}
      />
      <div className="flex max-w-full gap-4 justify-between items-center py-4 px-10">
        <div className="flex justify-start items-start flex-col">
          <HeadingElement className="text-gray-600" size="lg">
            Listagem de Transações
          </HeadingElement>
          <TextElement className="text-gray-400">
            Veja informações de suas transações
          </TextElement>
        </div>
        <div className="flex gap-2">
          <ButtonElement
            variant="default"
            type="button"
            onClick={() => { }}
            className="flex justify-center items-center gap-1 text-sm px-3"
            title="Exibir Filtro"
          >
            <Funnel size={25} className="font-bold" />
          </ButtonElement>
          <ButtonElement
            onClick={handleShowModal}
            variant="primary"
            type="button"
            className="flex justify-center items-center gap-1 text-sm px-3"
          >
            <Plus size={16} className="font-bold" weight="bold" />
            <TextElement className="uppercase text-white font-bold " size="sm">
              Nova Transação
            </TextElement>
          </ButtonElement>
        </div>
      </div>
      <div className="py-4 px-10">
        <BasicTable data={list} columns={columnList} />
      </div>
    </CardElement>
  );
};
