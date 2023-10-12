import { TextFieldProps } from "@mui/material";

import * as Material from "./styles";

type Props = TextFieldProps & {
  name: string;
  label: string;
};

export const CustomInput = ({ label, ...props }: Props) => {
  return (
    <Material.Input variant="outlined" fullWidth label={label} {...props} />
  );
};
