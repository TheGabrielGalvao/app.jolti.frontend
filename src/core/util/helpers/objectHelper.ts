import { OptionItem } from "../../types/Option";

export function enumToSelectOptions<T>(
  enumObject: T,
  labels: Record<keyof T, string>
): OptionItem[] {
  return Object.entries(enumObject as unknown as Record<keyof T, unknown>).map(
    ([key, value]) => ({
      label: labels[key as keyof T] || key.replace(/([a-z])([A-Z])/g, "$1 $2"),
      value,
    })
  );
}


export function enumToOptionItemList<T>(enumObj: T): OptionItem[] {
  const optionItemList: OptionItem[] = [];

  for (const key in enumObj) {
      if (Object.prototype.hasOwnProperty.call(enumObj, key)) {
          const isValueProperty = parseInt(key, 10) >= 0
          if (!isValueProperty) {
              const value = (enumObj as any)[key];
              const label = key;
              optionItemList.push({ value, label });
          }
      }
  }

  return optionItemList;
}