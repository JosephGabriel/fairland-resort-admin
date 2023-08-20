import { OrderBy } from "@services/apollo/generated/hooks";

export const selectOptions = [
  { label: "Decrescente", value: OrderBy.Desc },
  { label: "Ascendente", value: OrderBy.Asc },
];

export const perPageOptions = [
  { label: "12", value: "12" },
  { label: "24", value: "24" },
  { label: "36", value: "36" },
  { label: "48", value: "36" },
];
