import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import {
  ChevronLeft,
  ChevronRight,
  Star,
  StarOutline,
} from "@mui/icons-material";

import { useGetHotelByIdQuery } from "../../services/apollo/generated";

import * as Material from "./styles";
import { AddRoomModal } from "../../components/add-room-modal";

export const HotelPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();

  const { data } = useGetHotelByIdQuery({
    variables: {
      id: `${id}`,
    },
  });

  return (
    <Material.Container>
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
          <Grid item md={12}>
            <Material.RoomTitle variant="h5">Quartos</Material.RoomTitle>
            <Material.AddRoomButton
              variant="contained"
              onClick={() => setIsOpen(true)}
            >
              Adicionar um quarto
            </Material.AddRoomButton>

            {data?.hotel.rooms?.length ? (
              <Grid container spacing={4}>
                {data?.hotel.rooms?.map((room) => (
                  <Grid item md={3} key={room.id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={room.thumbnail}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {room.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {room.summary}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid item md={12}>
                <Material.NoRoomPaper>
                  <Material.NoRoomPaperText variant="body1">
                    Nenhum quarto adicionado
                  </Material.NoRoomPaperText>
                </Material.NoRoomPaper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Material.DetailContainer>
    </Material.Container>
  );
};