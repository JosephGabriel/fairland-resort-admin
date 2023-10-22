import { InputLabel, MenuItem, Select } from "@mui/material";

import { Props } from "./utils";

import Material from "./styles.ts";

export const CustomSelectInput = <T,>({
  label,
  labelId,
  id,
  value,
  options,
  onChange,
}: Props<T>) => {
  return (
    <Material.InputContainer variant="outlined" className="form-control">
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
