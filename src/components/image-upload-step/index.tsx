import { Button, Grid } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

import {
  Control,
  Controller,
  DefaultValues,
  FieldValues,
  useForm,
} from "react-hook-form";

import { ImageInputUpload } from "@components/image-input-upload";

import * as Material from "./styles";

interface Props<T> {
  defaultValues: DefaultValues<T> | undefined;
  schema: ZodSchema<T>;
  onSubmit: (data: T) => void;

  fields: MappedImageField<T>;
}

export function ImageUploadStep<T extends FieldValues>(props: Props<T>) {
  const { defaultValues, fields, schema, onSubmit } = props;

  const { handleSubmit, formState, control } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <Material.Container container spacing={2} alignItems={"stretch"}>
      {Object.keys(fields).map((label, idx) => (
        <Controller
          key={idx}
          name={label}
          control={control as Control<FieldValues>}
          render={({ field: { name, value, onChange, onBlur } }) => (
            <ImageInputUpload
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      ))}

      <Grid item md={12} sx={{ marginTop: "2rem" }}>
        <Button
          disabled={!formState.isValid}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Próximo
        </Button>
      </Grid>
    </Material.Container>
  );
}
