import { DefaultValues } from "react-hook-form";
import { ZodSchema, z } from "zod";

export interface Props<T> {
  schema: ZodSchema<T>;
  onSubmit: (values: T) => void;
  defaultValues?: DefaultValues<T> | undefined;

  fields: MappedCustomField<T>;
}

export const BasicHotelInfoSchema = z.object({
  name: z.string().trim().nonempty(),
  summary: z.string().trim().nonempty(),
  description: z.string().trim().nonempty(),
});

export type TBasicHotelInfoSchema = z.infer<typeof BasicHotelInfoSchema>;
