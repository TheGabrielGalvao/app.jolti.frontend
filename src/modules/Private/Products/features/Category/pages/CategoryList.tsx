import { takeRight } from "lodash";
import { useQuery, useQueryClient } from "react-query";
import { Check } from "phosphor-react";
import { useRoute } from "../../../../../../core/context/RouteContext";
import { useDefaultQueryConfig } from "../../../../../../core/hooks/queryConfig";
import { Column } from "../../../../../../core/components/atoms/BasicTable";
import { StatusBody } from "../../../../../../core/components/templates/data/StatusBodyTemplate";
import { CardElement } from "../../../../../../core/components/atoms";
import { CrudTable } from "../../../../../../core/components/molecules/CrudTable";
import ProductCategoryService from "../../../../../../services/product/ProductCategoryService";

export const CategoryList = () => {
  const { handleSetToast } = useRoute();
  const queryClient = useQueryClient();
  const queryConfig = useDefaultQueryConfig();
  const { data: categories } = useQuery(
    "list-categories",
    () => ProductCategoryService.getAll(),
    queryConfig
  );

  const list = takeRight(categories, 10);

  const columnList: Column[] = [
    {
      name: "name",
      label: "Nome",
      sortable: true,
      order: 2,
    },
    {
      name: "status",
      label: "Status",
      sortable: true,
      order: 4,
      bodyShape: StatusBody,
    },
  ];

  const handleDelete = async (uuid: string) => {
    if (!uuid) {
      return;
    }

    await ProductCategoryService.remove(uuid);
    queryClient.invalidateQueries("list-categories");

    handleSetToast({
      icon: <Check weight="bold" />,
      message: "Dados deletados com sucesso!",
      type: "success",
    });
  };

  return (
    <CardElement className="h-full bg-card">
      <CrudTable
        title="Listagem de Categorias"
        legend="Veja informações das categorias dos produtos"
        data={list}
        columns={columnList}
        routePrefix="category"
        deleteFunction={handleDelete}
      />
    </CardElement>
  );
};
