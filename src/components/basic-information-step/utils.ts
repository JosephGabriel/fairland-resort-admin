import { z } from "zod";

export const BasicHotelInfoSchema = z.object({
  name: z.string().trim().nonempty(),
  summary: z.string().trim().nonempty(),
  description: z.string().trim().nonempty(),
});

export type TBasicHotelInfoSchema = z.infer<typeof BasicHotelInfoSchema>;
