import { takeRight } from "lodash";
import { useQuery } from "react-query";
import clsx from "clsx";
import { ArrowDown, ArrowUp, Funnel, Minus, Plus } from "phosphor-react";
import { useRef } from "react";
import { ModalElementRef } from "../../../../../../core/components/atoms/ModalElement";
import { useDefaultQueryConfig } from "../../../../../../core/hooks/queryConfig";
import {
  enumToOptionItemList,
  enumToSelectOptions,
} from "../../../../../../core/util/helpers/objectHelper";
import { OptionItem } from "../../../../../../core/types/Option";
import {
  ButtonElement,
  CardElement,
  HeadingElement,
  TextElement,
} from "../../../../../../core/components/atoms";
import {
  dateTimeFormat,
  moneyFormat,
} from "../../../../../../core/util/helpers/datetimeFormat";
import {
  BasicTable,
  Column,
} from "../../../../../../core/components/atoms/BasicTable";
import {
  EInventoryAdjustmentStatus,
  EInventoryAdjustmentStatusLabels,
  InventoryAdjustmentModel,
} from "../../../../../../models/Stock/InventoryAdjustment.model";
import InventoryAdjustmentService from "../../../../../../services/stock/InventoryAdjustmentService";
import InventoryAdjustmentForm from "../components/InventoryAdjustmentForm";
import { EReleaseFlow } from "../../../../../../common/enum/Release";
import { EStockReleaseStatus } from "../../../../../../models/Stock/EStockReleaseStatus";

export const InventoryAdjustment = () => {
  const modalRef = useRef<ModalElementRef>(null);
  const queryConfig = useDefaultQueryConfig();
  const { data: adjustments } = useQuery(
    "list-inventoryAdjustments",
    () => InventoryAdjustmentService.getAll(),
    queryConfig
  );

  const handleShowModal = () => {
    modalRef.current?.show();
  };

  const list = takeRight(adjustments, 10);

  const StatusBody = (row: any) => {
    const statusOptions: OptionItem[] =
      enumToOptionItemList(EStockReleaseStatus);
    const status = statusOptions.find(
      (item) => item.value?.toString() === row.status.toString()
    ) as OptionItem;

    return (
      <TextElement
        size="sm"
        className={clsx({
          "font-bold bg-warning/20 text-subtitle py-1 px-2 rounded-md uppercase shadow-md":
            status.value === EStockReleaseStatus.Pendente,
          "font-bold bg-success/20 text-success py-1 px-2 rounded-md uppercase shadow-[96px]":
            status.value === EStockReleaseStatus.Lançado,
          "font-bold bg-danger/20 text-danger py-1 px-2 rounded-md uppercase shadow-md":
            status.value === EStockReleaseStatus.Estornado,
        })}
      >
        {status?.label}
      </TextElement>
    );
  };

  const ValueBody = (row: InventoryAdjustmentModel) => {
    const value = row.amount;

    return (
      <TextElement
        size="sm"
        className={clsx({
          "font-bold text-danger py-1 px-2 rounded-md uppercase":
            row.flow === EReleaseFlow.Saída,
          "font-bold text-success py-1 px-2 rounded-md uppercase":
            row.flow === EReleaseFlow.Entrada,
        })}
      >
        {row.flow === EReleaseFlow.Entrada ? (
          <span className="flex gap-1 justify-start items-center">
            <Plus />
            {value}
            <ArrowUp />
          </span>
        ) : (
          <span className="flex gap-2 justify-start items-center">
            <Minus />
            {value}
            <ArrowDown />
          </span>
        )}
      </TextElement>
    );
  };

  const DefaultBody = (row: InventoryAdjustmentModel) => {
    return (
      <div className="flex flex-col">
        <span className="font-light text-title">{row.product.name}</span>
      </div>
    );
  };

  const columnList: Column[] = [
    {
      name: "product",
      label: "Produto",
      sortable: true,
      order: 1,
      bodyShape: DefaultBody,
    },
    {
      name: "amount",
      label: "Quantidade",
      sortable: true,
      order: 2,
      bodyShape: ValueBody,
    },
    {
      name: "createdAt",
      label: "Data de Lançamento",
      sortable: true,
      order: 3,
      bodyShape: (row: InventoryAdjustmentModel) =>
        dateTimeFormat(row.createdAt!.toString()),
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

  //   await InventoryAdjustmentService.remove(uuid);
  //   queryClient.invalidateQueries("list-adjustments");

  //   navigate("../list");
  // };

  return (
    <CardElement className="flex flex-col w-full h-full bg-card">
      <InventoryAdjustmentForm
        title="Novo Ajuste"
        ref={modalRef}
        onSubmitAction={() => modalRef.current?.hide()}
        cancelAction={() => modalRef.current?.hide()}
      />
      <div className="flex max-w-full gap-4 justify-between items-center py-4 px-10">
        <div className="flex justify-start items-start flex-col">
          <HeadingElement className="text-gray-600" size="lg">
            Ajuste de Estoque
          </HeadingElement>
          <TextElement className="text-gray-400">
            Veja informações e faça novos Ajustes de Estoque
          </TextElement>
        </div>
        <div className="flex gap-2">
          <ButtonElement
            variant="default"
            type="button"
            onClick={() => {}}
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
              Novo Ajuste
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
