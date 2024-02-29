export const moneyFormat = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const percentFormat = (value: number) => {
  const percent = value * 100;
  const formatedPercent = percent.toLocaleString("pt-BR", { style: "percent" });
  return `${percent > 0 ? "+" + formatedPercent : formatedPercent}`;
};

export const percentDiff = (currentTotal: number, prevTotal: number) => {
  let diff = currentTotal - prevTotal;
  let percent = diff / (prevTotal * 100);
  return percent;
};

export interface ITime {
  hour: number;
  minutes: number;
}

export const timeFormat = (time: ITime) => {
  const state = time;
  if (time.minutes == 0) {
    return `${state.hour}:${state.minutes}0`;
  }
};

export const timeAdd = (time: number) => {
  const hours = (time * 60 + 30) / 60;
  const minutes = (time * 60 + 30) % 60 === 0 ? 0 : 30;

  if (minutes == 0) {
    return `${hours}:${minutes}0`;
  }

  return `${hours}:${minutes}`;
};

export const dateTimeFormat = (date: string): string => {
  const normalizedDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat("pt-Br", options);
  const formattedDateTime = formatter.format(normalizedDate).replace(",", " -");

  return formattedDateTime;
};
