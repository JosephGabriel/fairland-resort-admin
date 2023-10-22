import { SelectChangeEvent } from "@mui/material";

export interface Option {
  label: string;
  value: string;
}

export interface Props<T> {
  value: T;
  label: string;
  labelId: string;
  id: string;
  options: Option[];
  onChange: (event: SelectChangeEvent<T>) => void;
}
