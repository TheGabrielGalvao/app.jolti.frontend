import { takeRight } from "lodash";
import { useQuery, useQueryClient } from "react-query";
import { Check } from "phosphor-react";
import { useRoute } from "../../../../../../core/context/RouteContext";
import { useDefaultQueryConfig } from "../../../../../../core/hooks/queryConfig";
import { Column } from "../../../../../../core/components/atoms/BasicTable";
import { StatusBody } from "../../../../../../core/components/templates/data/StatusBodyTemplate";
import { CardElement } from "../../../../../../core/components/atoms";
import { CrudTable } from "../../../../../../core/components/molecules/CrudTable";
import ProductService from "../../../../../../services/product/ProductService";

export const ProductList = () => {
  const { handleSetToast } = useRoute();
  const queryClient = useQueryClient();
  const queryConfig = useDefaultQueryConfig();
  const { data: products } = useQuery(
    "list-products",
    () => ProductService.getAll(),
    queryConfig
  );

  const list = takeRight(products, 10);

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

    await ProductService.remove(uuid);
    queryClient.invalidateQueries("list-products");

    handleSetToast({
      icon: <Check weight="bold" />,
      message: "Dados deletados com sucesso!",
      type: "success",
    });
  };

  return (
    <CardElement className="h-full bg-card">
      <CrudTable
        title="Listagem de Produtos"
        legend="Veja informações dos Produtos"
        data={list}
        columns={columnList}
        routePrefix="product"
        deleteFunction={handleDelete}
      />
    </CardElement>
  );
};
