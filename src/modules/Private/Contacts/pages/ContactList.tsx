import { takeRight } from "lodash";
import { Column } from "../../../../core/components/atoms/BasicTable";
import { useQuery, useQueryClient } from "react-query";
import { CardElement, HeadingElement } from "../../../../core/components/atoms";
import ContactService from "../../../../services/ContactService";
import { CrudTable } from "../../../../core/components/molecules/CrudTable";
import { StatusBody } from "../../../../core/components/templates/data/StatusBodyTemplate";
import { useNavigate } from "react-router-dom";
import { useDefaultQueryConfig } from "../../../../core/hooks/queryConfig";
import { ContactModel } from "../../../../models/Contact.model";

export const ContactList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const queryConfig = useDefaultQueryConfig();
  const { data: contacts } = useQuery(
    "list-contacts",
    () => ContactService.getAll(),
    queryConfig
  );

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(1|)?(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return null;
  };

  const ContactBody = (row: ContactModel) => {
    return (
      <div className="flex flex-col">
        <span className="font-bold text-gray-800">{row.fullName}</span>
        <span className="text-xs">{formatPhoneNumber(row.phone)}</span>
      </div>
    );
  };

  const list = takeRight(contacts, 10);

  const columnList: Column[] = [
    {
      name: "fullName",
      label: "Nome",
      sortable: true,
      order: 2,
      bodyShape: ContactBody,
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

    await ContactService.remove(uuid);
    queryClient.invalidateQueries("list-contacts");

    navigate("../list");
  };

  return (
    <CardElement className="h-full bg-card">
      <CrudTable
        title="Listagem de Contatos"
        legend="Veja informações de seus contatos"
        data={list}
        columns={columnList}
        deleteFunction={handleDelete}
      />
    </CardElement>
  );
};
