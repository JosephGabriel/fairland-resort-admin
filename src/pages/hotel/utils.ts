import { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";

import {
  GetHotelByIdQuery,
  GetRoomsByHotelQuery,
  OrderBy,
} from "@services/apollo/hooks";

export const selectOptions = [
  { label: "Decrescente", value: OrderBy.Desc },
  { label: "Ascendente", value: OrderBy.Asc },
];

export interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  onOpenModal: () => void;
  selectOptions: typeof selectOptions;
  onDeleteRoom: (id: string) => void;
  handleChange: (event: SelectChangeEvent<OrderBy>) => void;
  hotel: GetHotelByIdQuery["hotel"] | undefined;
  rooms: GetRoomsByHotelQuery["roomsByHotel"]["rooms"] | undefined;
  isDeleting: boolean;
  isDeletingRoom: boolean;
  orderBy: OrderBy;
  hotelId: string;
  totalItems: number;
  page: number;
  onPageChange: (_: ChangeEvent<unknown>, page: number) => void;
}
