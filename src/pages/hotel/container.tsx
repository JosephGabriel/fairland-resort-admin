import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";

import { RoomRepository } from "@repositories/room";

import {
  OrderBy,
  useDeleteRoomMutation,
  useGetHotelByIdQuery,
  useGetRoomsByHotelQuery,
} from "@services/apollo/generated/hooks";

import { HotelView } from "./view";

import { selectOptions } from "./utils";

export const HotelContainer = () => {
  const { id } = useParams();

  const hotelId = String(id);

  const perPage = 12 / 3;

  const repository = new RoomRepository();

  const [isOpen, setIsOpen] = useState(false);
  const [orderBy, setOrderBy] = useState(OrderBy.Desc);
  const [totalItems, setItemsCount] = useState(0);
  const [page, setPage] = useState(1);

  const { data: hotel } = useGetHotelByIdQuery({
    variables: { id: hotelId },
  });

  const { data, loading, refetch, fetchMore } = useGetRoomsByHotelQuery({
    variables: {
      hotelId,
      options: {
        take: perPage,
        orderBy: orderBy,
        skip: page * perPage - perPage,
      },
    },
    onCompleted(data) {
      setItemsCount(Math.ceil(data.roomsByHotel.count / perPage));
    },
  });

  const [deleteRoom, { loading: isDeleting }] = useDeleteRoomMutation();

  const onCloseModal = () => setIsOpen(false);
  const onOpenModal = () => setIsOpen(true);

  const handleChange = async (event: SelectChangeEvent<OrderBy>) => {
    setOrderBy(event.target.value as OrderBy);

    setPage(1);

    await refetch({
      options: {
        take: perPage,
        orderBy: orderBy,
        skip: 0,
      },
    });
  };

  const onPageChange = async (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);

    await fetchMore({
      variables: {
        options: {
          take: perPage,
          orderBy: orderBy,
          skip: page * perPage - perPage,
        },
      },
    });
  };

  const onDeleteRoom = async (roomId: string) => {
    await deleteRoom({
      variables: { id: roomId },
      update: (cache) => {
        repository.onDeleteRoom(roomId, cache);
      },
      onError: (err) => {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <HotelView
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      onOpenModal={onOpenModal}
      selectOptions={selectOptions}
      handleChange={handleChange}
      hotel={hotel?.hotel}
      isDeleting={isDeleting}
      orderBy={orderBy}
      hotelId={hotelId}
      isDeletingRoom={loading}
      onDeleteRoom={onDeleteRoom}
      page={page}
      rooms={data?.roomsByHotel.nodes}
      totalItems={totalItems}
      onPageChange={onPageChange}
    />
  );
};
