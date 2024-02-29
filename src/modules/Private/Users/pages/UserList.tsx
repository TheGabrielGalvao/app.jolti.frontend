import { takeRight } from "lodash";
import { Column } from "../../../../core/components/atoms/BasicTable";
import { useQuery, useQueryClient } from "react-query";
import { CardElement } from "../../../../core/components/atoms";
import { CrudTable } from "../../../../core/components/molecules/CrudTable";
import { StatusBody } from "../../../../core/components/templates/data/StatusBodyTemplate";
import UserService from "../../../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useRoute } from "../../../../core/context/RouteContext";
import { Check } from "phosphor-react";
import { UserModel } from "../../../../models/User.model";
import { useDefaultQueryConfig } from "../../../../core/hooks/queryConfig";
import { useAuth } from "../../../../core/context/AuthContext";
import { toastyPreset } from "../../../../core/util/constants/toastyPreSet";
import { AxiosError } from "axios";
import { msg } from "../../../../core/util/constants/msg";
import { isValidUUID } from "../../../../core/util/helpers/string";

export const UserList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleSetToast, handleSetLoading } = useRoute();

  const { userInfo, logout } = useAuth();
  const { data: users } = useQuery("list-users", () => UserService.getAll(), {
    retry: false,
    enabled: isValidUUID(userInfo?.uuid!),
    behavior: {
      onFetch: () => {
        handleSetLoading(true);
      },
    },
    onSuccess: () => {
      handleSetLoading(false);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        handleSetToast({
          ...toastyPreset.WARNING,
          message: msg.common.expiredSession,
        });
        logout();
      } else {
        handleSetToast({
          ...toastyPreset.DANGER,
          message: msg.common.loadError,
        });
      }
      handleSetLoading(false);
    },
  });

  const list = takeRight(users, 10);

  const UserBody = (row: UserModel) => {
    return (
      <div className="flex flex-col">
        <span className="font-bold text-gray-800">{row.userName}</span>
        <span className="text-xs">{row.userEmail}</span>
      </div>
    );
  };

  const columnList: Column[] = [
    {
      name: "userName",
      label: "Usuário",
      sortable: true,
      order: 2,
      bodyShape: UserBody,
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

    await UserService.remove(uuid);
    queryClient.invalidateQueries("list-users");

    handleSetToast({
      icon: <Check weight="bold" />,
      message: "Dados deletados com sucesso!",
      type: "success",
    });

    navigate("../list");
  };

  return (
    <CardElement className="h-full bg-card">
      <CrudTable
        title="Listagem de Usuários"
        legend="Veja informações de seus usuários"
        data={list}
        columns={columnList}
        deleteFunction={handleDelete}
        allowActions={false}
      />
    </CardElement>
  );
};
