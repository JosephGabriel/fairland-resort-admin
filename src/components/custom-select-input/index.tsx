import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import * as Material from "./styles";

interface Option {
  label: string;
  value: string;
}

interface Props<T> {
  value: T;
  label: string;
  labelId: string;
  id: string;
  options: Option[];
  onChange: (event: SelectChangeEvent<T>) => void;
}

export const CustomSelectInput = <T,>({
  label,
  labelId,
  id,
  value,
  options,
  onChange,
}: Props<T>) => {
  return (
    <Material.InputContainer variant="outlined">
      <InputLabel id={labelId}>{label}</InputLabel>

      <Select
        labelId={labelId}
        id={id}
        value={value}
        onChange={onChange}
        label={label}
      >
        {options.map((op) => (
          <MenuItem key={op.value} value={op.value}>
            {op.label}
          </MenuItem>
        ))}
      </Select>
    </Material.InputContainer>
  );
};
