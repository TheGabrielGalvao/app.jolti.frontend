import clsx from "clsx";
import { OptionItem } from "../../../types/Option";
import { enumToSelectOptions } from "../../../util/helpers/objectHelper";
import { TextElement } from "../../atoms";
import {
  ERegisterStatus,
  ERegisterStatusLabels,
} from "../../../util/enum/EStatus";

export const StatusBody = (row: any) => {
  const statusOptions: OptionItem[] = enumToSelectOptions(
    ERegisterStatus,
    ERegisterStatusLabels
  );
  const status = statusOptions.find(
    (item) => item.value?.toString() === row.status.toString()
  ) as OptionItem;

  console.log("row", row);
  console.log("status", status);

  return (
    <TextElement
      size="sm"
      className={clsx({
        // "font-bold bg-warning/20 text-warning py-1 px-2 rounded-md uppercase shadow-md":
        //   status.value === ERegisterStatus.UNCOMPLETED,
        "font-bold bg-success/20 text-success py-1 px-2 rounded-md uppercase shadow-[96px]":
          status.value === ERegisterStatus.ACTIVE,
        "font-bold bg-danger/20 text-danger py-1 px-2 rounded-md uppercase shadow-md":
          status.value === ERegisterStatus.INACTIVE,
      })}
    >
      {status?.label}
    </TextElement>
  );
};
