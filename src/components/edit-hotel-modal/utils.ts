import { z } from "zod";

export const imagesFields = {
  logo: "",
  thumbnail: "",
  images: [""],
};

export const BasicHotelInfoSchema = z.object({
  name: z.string().trim(),
  summary: z.string().trim(),
  description: z.string().trim(),
});

export const SearchAddressSchema = z.object({
  address: z.string().trim(),
  zipCode: z.string().trim(),
  neighborhood: z.string().trim(),
  addressNumber: z.string().trim(),
  state: z.string().trim(),
  city: z.string().trim(),
  longitude: z.number(),
  latitude: z.number(),
});

export const ImagesSchema = z.object({
  thumbnail: z.string().trim(),
  logo: z.string().trim(),
  images: z.array(z.string().trim()),
});

export const UpdateHotelSchema = z.union([
  BasicHotelInfoSchema,
  SearchAddressSchema,
  ImagesSchema,
]);

export type TBasicHotelInfoSchema = z.infer<typeof BasicHotelInfoSchema>;
export type TSearchAddressSchema = z.infer<typeof SearchAddressSchema>;
export type TImagesSchema = z.infer<typeof ImagesSchema>;

export type TUpdateHotelSchema = TBasicHotelInfoSchema &
  TSearchAddressSchema &
  TImagesSchema;

export const fields: MappedCustomField<TBasicHotelInfoSchema> = {
  name: {
    label: "Nome",
  },
  summary: {
    label: "Súmario",
  },
  description: {
    label: "Descrição",
    multiline: true,
  },
};
