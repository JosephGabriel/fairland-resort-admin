import { useField } from "formik";
import { TextFieldProps } from "@mui/material";

import * as Material from "./styles";

type Props = TextFieldProps & {
  name: string;
  label: string;
};

export const CustomInput = ({ name, label, ...props }: Props) => {
  const [field, meta] = useField({
    name,
  });

  return (
    <Material.Input
      variant="outlined"
      fullWidth
      {...field}
      {...props}
      label={label}
      error={!!meta.error}
      helperText={meta.error}
    />
  );
};
