import { Funnel, PencilSimple, Plus, Trash } from "phosphor-react";
import { ButtonElement, HeadingElement, TextElement } from "../atoms";
import { useNavigate } from "react-router-dom";
import { BasicTable, Column } from "../atoms/BasicTable";

interface CrudTableProps {
  title: string;
  legend?: string;
  columns: Column[];
  data?: any[];
  allowActions?: boolean
  deleteFunction: (uuid: string) => void;
  routePrefix?: string;
}

export const CrudTable = ({
  title,
  legend,
  data,
  columns,
  deleteFunction,
  routePrefix,
  allowActions = true
}: CrudTableProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full">
      <div className="flex max-w-full gap-4 justify-between items-center py-4 px-10">
        <div className="flex justify-start items-start flex-col">
          <HeadingElement className="text-title" size="lg">
            {title}
          </HeadingElement>
          <TextElement className="text-subtitle">{legend}</TextElement>
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
            variant="primary"
            type="button"
            onClick={() =>
              navigate(`${routePrefix ? `../${routePrefix}/new` : "../new"}`)
            }
            className="flex justify-center items-center gap-1 text-sm px-3"
          >
            <Plus size={16} className="font-bold" weight="bold" />
            <TextElement className="uppercase font-bold " size="sm">
              Adicionar Novo
            </TextElement>
          </ButtonElement>
        </div>
      </div>
      <div className="py-4 px-10">
        <BasicTable
          data={data}
          columns={columns}
          actions={!allowActions ? () => (<></>) : (item: any) => (
            <>
              <PencilSimple
                size={25}
                className="cursor-pointer text-primary"
                weight="fill"
                onClick={() =>
                  navigate(
                    `${routePrefix
                      ? `../${routePrefix}/edit/${item.uuid}`
                      : `../edit/${item.uuid}`
                    }`
                  )
                }
              />
              <Trash
                size={25}
                className="cursor-pointer text-danger"
                weight="fill"
                onClick={() => deleteFunction(item.uuid)}
              />
            </>
          )}
        />
      </div>
    </div>
  );
};
