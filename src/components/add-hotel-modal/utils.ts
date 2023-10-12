import { z } from "zod";

export const imagesFields = {
  logo: "",
  thumbnail: "",
  images: [""],
};

export const BasicHotelInfoSchema = z.object({
  name: z.string().trim().nonempty(),
  summary: z.string().trim().nonempty(),
  description: z.string().trim().nonempty(),
});

export const SearchAddressSchema = z.object({
  address: z.string().trim().nonempty(),
  zipCode: z.string().trim().nonempty(),
  neighborhood: z.string().trim().nonempty(),
  addressNumber: z.string().trim().nonempty(),
  state: z.string().trim().nonempty(),
  city: z.string().trim().nonempty(),
  longitude: z.number(),
  latitude: z.number(),
});

export const ImagesSchema = z.object({
  thumbnail: z.string().trim().nonempty(),
  logo: z.string().trim().nonempty(),
  images: z.array(z.string().trim().nonempty()),
});

export const AddHotelSchema = z.union([
  BasicHotelInfoSchema,
  SearchAddressSchema,
  ImagesSchema,
]);

export type TBasicHotelInfoSchema = z.infer<typeof BasicHotelInfoSchema>;
export type TSearchAddressSchema = z.infer<typeof SearchAddressSchema>;
export type TImagesSchema = z.infer<typeof ImagesSchema>;

export type TAddHotelSchema = TBasicHotelInfoSchema &
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
