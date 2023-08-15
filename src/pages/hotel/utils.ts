import { OrderBy } from "@services/apollo/hooks";

export const selectOptions = [
  { label: "Decrescente", value: OrderBy.Desc },
  { label: "Ascendente", value: OrderBy.Asc },
];
