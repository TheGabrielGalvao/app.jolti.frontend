import { CardElement, HeadingElement } from "../../../../core/components/atoms";
import Calendar2 from "../../../../core/components/molecules/Calendar2";

export const Appointments = () => {
  return (
    <CardElement className="w-full h-full bg-card flex-col">
      <HeadingElement>Compromissos</HeadingElement>
      <Calendar2 />
    </CardElement>
  );
};
