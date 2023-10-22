import { z } from "zod";

export const steps = ["Informações", "Imagens"];

export interface Props {
  hotelId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const RoomBasicInfoSchema = z.object({
  name: z.string().nonempty(),
  summary: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number(),
});

export const RoomImagesSchema = z.object({
  thumbnail: z.string().nonempty(),
  images: z.array(z.string().nonempty()).nonempty(),
});

export const AddRoomSchema = z.union([RoomBasicInfoSchema, RoomImagesSchema]);

export type TRoomBasicInfoSchema = z.infer<typeof RoomBasicInfoSchema>;
export type TRoomImagesSchema = z.infer<typeof RoomImagesSchema>;
export type TAddRoomSchema = TRoomBasicInfoSchema & TRoomImagesSchema;

export const fields: MappedCustomField<TRoomBasicInfoSchema> = {
  name: {
    label: "Nome",
  },
  summary: {
    label: "Súmario",
  },
  price: {
    label: "Preço",
  },
  description: {
    label: "Descrição",
    multiline: true,
  },
};

export const imagesFields: TRoomImagesSchema = {
  thumbnail: "",
  images: [""],
};
