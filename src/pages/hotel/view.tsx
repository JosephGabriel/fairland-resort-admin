import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { Grid, Pagination, Typography } from "@mui/material";

import { Star, StarOutline } from "@mui/icons-material";

import { AddRoomModal } from "@src/components/add-room-modal";
import { RoomCarousel } from "@src/components/room-carousel";
import { CustomSelectInput } from "@src/components/custom-select-input";
import { ImageGridCarousel as ImageGridCarousel } from "@src/components/image-grid-viewer";
import { Loader } from "@src/components/loader";

import { OrderBy } from "@src/services/apollo/hooks";

import { Props } from "./utils";

import * as Material from "./styles";

export const HotelView = (props: Props) => {
  return (
    <Material.Container>
      <Loader variant="backdrop" isLoading={props.isDeleting} />

      {props.isOpen && (
        <AddRoomModal
          hotelId={props.hotelId}
          isOpen={props.isOpen}
          onClose={props.onCloseModal}
        />
      )}

      <Material.ThumbnailImage src={props.hotel?.thumbnail} />

      <Material.DetailContainer>
        <Material.PaperTitleGrid>
          <Material.TitleGrid container spacing={2} alignItems={"flex-start"}>
            <Grid item>
              <Material.ImageLogo src={props.hotel?.logo} />
            </Grid>

            <Grid item>
              <Material.MainTitle variant="body1">
                {props.hotel?.name}
              </Material.MainTitle>

              <Material.SummaryText variant="caption">
                Descrição súmaria: {props.hotel?.summary}
              </Material.SummaryText>

              {Array(Math.trunc(Number(props.hotel?.rating ?? 0)))
                .fill(" ")
                .map((_, index) => (
                  <Star key={index} />
                ))}

              {Array(Math.trunc(5 - Number(props.hotel?.rating ?? 0)))
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
              <Typography variant="body1">
                {props.hotel?.description}
              </Typography>
              <br />

              <Typography variant="h5">Endereço</Typography>

              <Typography variant="body1">
                Logradouro: {props.hotel?.address}, {props.hotel?.addressNumber}
              </Typography>

              <Typography variant="body1">
                Bairro: {props.hotel?.neighborhood}, {props.hotel?.city},{" "}
                {props.hotel?.state} - {props.hotel?.zipCode}
              </Typography>
            </Material.DescriptionPaper>
          </Grid>

          {props.hotel?.latitude && props.hotel?.longitude && (
            <Material.MapItemGrid item md={6}>
              <MapContainer
                center={[
                  Number(props.hotel?.latitude),
                  Number(props.hotel?.longitude),
                ]}
                zoom={13}
                id="map"
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    Number(props.hotel?.latitude),
                    Number(props.hotel?.longitude),
                  ]}
                >
                  <Popup>{props.hotel?.name}</Popup>
                </Marker>
              </MapContainer>
            </Material.MapItemGrid>
          )}
        </Material.MapGrid>

        <Typography variant="h5">Imagens</Typography>

        <ImageGridCarousel images={props.hotel?.images} />

        <Grid container>
          <Material.RoomGridItemOptions item md={12}>
            <div>
              <Material.RoomTitle variant="h5">Quartos</Material.RoomTitle>

              <Material.AddRoomButton
                variant="contained"
                onClick={props.onOpenModal}
              >
                Adicionar um quarto
              </Material.AddRoomButton>
            </div>

            <div>
              <CustomSelectInput<OrderBy>
                value={props.orderBy}
                label="Ordenar por"
                id="select-outlined-label"
                labelId="select-outlined-label"
                options={props.selectOptions}
                onChange={props.handleChange}
              />
            </div>
          </Material.RoomGridItemOptions>

          <Grid item md={12}>
            <RoomCarousel
              rooms={props.rooms}
              onDeleteRoom={props.onDeleteRoom}
              isLoading={props.isDeletingRoom}
            />
          </Grid>

          <Grid item md={12}>
            <Material.PaginationContainer>
              <Pagination
                color="primary"
                defaultPage={1}
                siblingCount={0}
                count={props.totalItems}
                page={props.page}
                onChange={props.onPageChange}
              />
            </Material.PaginationContainer>
          </Grid>
        </Grid>
      </Material.DetailContainer>
    </Material.Container>
  );
};
