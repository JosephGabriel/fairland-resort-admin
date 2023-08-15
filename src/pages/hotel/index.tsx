import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { Grid, Pagination, SelectChangeEvent, Typography } from "@mui/material";

import {
  ChevronLeft,
  ChevronRight,
  Star,
  StarOutline,
} from "@mui/icons-material";

import { AddRoomModal } from "@components/add-room-modal";
import { RoomCarousel } from "@components/room-carousel";
import { CustomSelectInput } from "@components/custom-select-input";
import { Loader } from "@components/loader";

import { RoomRepository } from "@repositories/room";

import {
  OrderBy,
  useDeleteRoomMutation,
  useGetHotelByIdQuery,
  useGetRoomsByHotelQuery,
} from "@services/apollo/hooks";

import { selectOptions } from "./utils";

import * as Material from "./styles";

export const HotelPage = () => {
  const { id } = useParams();

  const perPage = 12 / 3;

  const repository = new RoomRepository(String(id));

  const [isOpen, setIsOpen] = useState(false);
  const [orderBy, setOrderBy] = useState(OrderBy.Desc);

  const [totalItems, setItemsCount] = useState(0);
  const [page, setPage] = useState(1);

  const { data } = useGetHotelByIdQuery({
    variables: {
      id: String(id),
    },
  });

  const {
    data: rooms,
    loading,
    refetch,
  } = useGetRoomsByHotelQuery({
    variables: {
      hotelId: String(id),
      options: {
        take: perPage,
        orderBy: orderBy,
        skip: page * perPage - perPage,
      },
    },
    onCompleted(data) {
      setItemsCount(Math.ceil(data.roomsByHotel.count / 4));
    },
  });

  const [deleteRoom, { loading: isDeleting }] = useDeleteRoomMutation();

  const handleChange = (event: SelectChangeEvent<OrderBy>) => {
    setOrderBy(event.target.value as OrderBy);

    refetch({
      hotelId: String(id),
      options: {
        take: perPage,
        orderBy: orderBy,
        skip: 0,
      },
    });
  };

  const onPageChange = async (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);

    refetch({
      hotelId: String(id),
      options: {
        take: perPage,
        orderBy: orderBy,
        skip: page * perPage - perPage,
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
    <Material.Container>
      <Loader variant="backdrop" isLoading={isDeleting} />

      <AddRoomModal
        hotelId={String(id)}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <Material.ThumbnailImage src={data?.hotel.thumbnail} />

      <Material.DetailContainer>
        <Material.PaperTitleGrid>
          <Material.TitleGrid container spacing={2} alignItems={"flex-start"}>
            <Grid item>
              <Material.ImageLogo src={data?.hotel.logo} />
            </Grid>

            <Grid item>
              <Material.MainTitle variant="body1">
                {data?.hotel.name}
              </Material.MainTitle>

              <Material.SummaryText variant="caption">
                Descrição súmaria: {data?.hotel.summary}
              </Material.SummaryText>

              {Array(Math.trunc(Number(data?.hotel.rating ?? 0)))
                .fill(" ")
                .map((_, index) => (
                  <Star key={index} />
                ))}

              {Array(Math.trunc(5 - Number(data?.hotel.rating ?? 0)))
                .fill(" ")
                .map((_, index) => (
                  <StarOutline key={index} />
                ))}
            </Grid>
          </Material.TitleGrid>
        </Material.PaperTitleGrid>

        <Material.MapGrid container spacing={2} alignItems={"stretch"}>
          <Grid item md={6}>
            <Material.DescriptionPaper>
              <Typography variant="h5">Descrição</Typography>
              <Typography variant="body1">{data?.hotel.description}</Typography>
              <br />

              <Typography variant="h5">Endereço</Typography>

              <Typography variant="body1">
                Logradouro: {data?.hotel.address}, {data?.hotel.addressNumber}
              </Typography>

              <Typography variant="body1">
                Bairro: {data?.hotel.neighborhood}, {data?.hotel.city},{" "}
                {data?.hotel.state} - {data?.hotel.zipCode}
              </Typography>
            </Material.DescriptionPaper>
          </Grid>

          <Material.MapItemGrid item md={6}>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              id="map"
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Material.MapItemGrid>
        </Material.MapGrid>

        <Typography variant="h5">Imagens</Typography>

        <Material.ImageGrid container>
          <Material.CarouselButton isLeft>
            <ChevronLeft />
          </Material.CarouselButton>

          <Material.CarouselButton>
            <ChevronRight />
          </Material.CarouselButton>

          {data?.hotel.images?.map((image, index) => (
            <Grid item md={3} key={index}>
              <img src={image} style={{ height: "200px" }} />
            </Grid>
          ))}
        </Material.ImageGrid>

        <Grid container>
          <Material.RoomGridItemOptions item md={12}>
            <div>
              <Material.RoomTitle variant="h5">Quartos</Material.RoomTitle>

              <Material.AddRoomButton
                variant="contained"
                onClick={() => setIsOpen(true)}
              >
                Adicionar um quarto
              </Material.AddRoomButton>
            </div>

            <div>
              <CustomSelectInput<OrderBy>
                value={orderBy}
                label="Ordenar por"
                id="select-outlined-label"
                labelId="select-outlined-label"
                options={selectOptions}
                onChange={handleChange}
              />
            </div>
          </Material.RoomGridItemOptions>

          <Grid item md={12}>
            <RoomCarousel
              rooms={rooms?.roomsByHotel.rooms}
              onDeleteRoom={onDeleteRoom}
              isLoading={loading}
            />
          </Grid>

          <Grid item md={12}>
            <Material.PaginationContainer>
              <Pagination
                color="primary"
                defaultPage={1}
                siblingCount={0}
                count={totalItems}
                page={page}
                onChange={onPageChange}
              />
            </Material.PaginationContainer>
          </Grid>
        </Grid>
      </Material.DetailContainer>
    </Material.Container>
  );
};
