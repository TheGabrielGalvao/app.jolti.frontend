import { useQuery } from "react-query";
import {
  CardElement,
  HeadingElement,
  TextElement,
} from "../../../../core/components/atoms";
import { useDefaultQueryConfig } from "../../../../core/hooks/queryConfig";
import FinancialReleaseService from "../../../../services/financial/FinancialReleaseService";
import { moneyFormat } from "../../../../core/util/helpers/datetimeFormat";
import {
  ArrowDown,
  ArrowUp,
  Clock,
  CurrencyDollar,
  Minus,
  Money,
} from "phosphor-react";

export const Dashboard = () => {
  const queryConfig = useDefaultQueryConfig();
  const { data } = useQuery(
    "list-transactions",
    () => FinancialReleaseService.getDashboard(),
    queryConfig
  );

  return (
    <div className="flex flex-col w-full max-h-screen gap-2 overflow-y-hidden ">
      <div className="flex w-full gap-12 h-30">
        <div className="flex w-full gap-4" id="completed">
          <CardElement className="bg-card flex flex-col w-full items-start p-5 justify-start gap-10">
            <TextElement className="w-full flex justify-between">
              <TextElement>Saídas</TextElement>
              <ArrowDown weight="bold" size={22} className="text-red-500" />
            </TextElement>
            <HeadingElement className="text-2xl flex items-center">
              <Minus weight="bold" />{" "}
              {moneyFormat(data?.totalExpenseCompleted ?? 0)}
            </HeadingElement>
          </CardElement>
          <CardElement className="bg-card flex flex-col w-full items-start p-5 justify-start gap-10">
            <TextElement className="w-full flex justify-between">
              <TextElement>Entradas</TextElement>
              <ArrowUp weight="bold" size={22} className="text-green-500" />
            </TextElement>
            <HeadingElement className="text-2xl">
              {moneyFormat(data?.totalRevenueCompleted ?? 0)}
            </HeadingElement>
          </CardElement>
        </div>
        <div className="flex w-full gap-4" id="pending">
          <CardElement className="bg-card flex flex-col w-full items-start p-5 justify-start gap-10">
            <TextElement className="w-full flex justify-between">
              <TextElement>Á Pagar</TextElement>
              <div className="flex">
                <Clock size={22} weight="bold" className="text-gray-200" />
                <ArrowDown weight="bold" size={22} className="text-red-500" />
              </div>
            </TextElement>
            <HeadingElement className="text-2xl flex items-center">
              <Minus weight="bold" />{" "}
              {moneyFormat(data?.totalExpensePending ?? 0)}
            </HeadingElement>
          </CardElement>
          <CardElement className="bg-card flex flex-col w-full items-start p-5 justify-start gap-10">
            <TextElement className="w-full flex justify-between">
              <TextElement>À Receber</TextElement>
              <div className="flex">
                <Clock size={22} weight="bold" className="text-gray-200" />
                <ArrowUp weight="bold" size={22} className="text-green-500" />
              </div>
            </TextElement>
            <HeadingElement className="text-2xl">
              {moneyFormat(data?.totalRevenuePending ?? 0)}
            </HeadingElement>
          </CardElement>
        </div>
        <div className="flex w-full gap-4" id="balance">
          <CardElement className="bg-primary flex flex-col w-full items-start p-5 justify-start gap-10">
            <TextElement className="w-full flex justify-between text-white">
              <TextElement>Saldo Atual</TextElement>
              <div className="flex">
                <CurrencyDollar
                  weight="bold"
                  size={22}
                  className="text-white"
                />
              </div>
            </TextElement>
            <HeadingElement className="text-2xl flex items-center text-white">
              {moneyFormat(data?.currentBalance ?? 0)}
            </HeadingElement>
          </CardElement>
          <CardElement className="bg-secondary flex flex-col w-full items-start p-5 justify-start gap-10">
            <TextElement className="w-full flex justify-between text-white">
              <TextElement>Saldo Previsto</TextElement>
              <div className="flex">
                <Clock size={22} weight="bold" className="text-gray-200" />
                <CurrencyDollar
                  weight="bold"
                  size={22}
                  className="text-white"
                />
              </div>
            </TextElement>
            <HeadingElement className="text-2xl text-white">
              {moneyFormat(data?.expectedBalance ?? 0)}
            </HeadingElement>
          </CardElement>
        </div>
      </div>
      <div className="flex w-full gap-2 h-96">
        <CardElement className="h-full bg-card" />
        <CardElement className="h-full bg-card" />
      </div>

      {/* <div className="flex w-full gap-2 h-96">
        <CardElement className="bg-card " />
      </div> */}
    </div>
  );
};
