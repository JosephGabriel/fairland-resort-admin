import { Button } from "@mui/material";
import { FieldValues, Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Props } from "./utils";

import Material from "./styles.ts";

export function BasicInformationStep<T extends FieldValues>(props: Props<T>) {
  const { fields, schema, onSubmit, defaultValues } = props;

  const { register, handleSubmit, formState } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <Material.Container>
      {Object.keys(fields).map((key, idx) => (
        <Material.Input
          key={idx}
          variant="outlined"
          fullWidth={!fields[key].minContent}
          label={fields[key].label}
          multiline={fields[key].multiline}
          minRows={fields[key].multiline ? 5 : 0}
          {...register(key as Path<T>)}
          error={!!formState.errors[key]}
          helperText={formState.errors[key]?.message as string}
        />
      ))}

      <Button
        variant="contained"
        disabled={!formState.isValid}
        onClick={handleSubmit(onSubmit)}
      >
        Proximo
      </Button>
    </Material.Container>
  );
}
