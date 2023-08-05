import { useState } from "react";
import { Grid, Grow, LinearProgress } from "@mui/material";

import { AddHotelModal } from "@components/add-hotel-modal";
import { Card } from "@components/card";

import { HotelRepository } from "@repositories/hotel";

import {
  useDeleteHotelMutation,
  useGetHotelsByAdminQuery,
} from "@services/apollo/hooks";

import * as Material from "./styles";

export const HotelsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, loading } = useGetHotelsByAdminQuery();

  const repository = new HotelRepository();

  const [deleteHotel] = useDeleteHotelMutation();

  const onDeleteHotel = async (hotelId: string) => {
    await deleteHotel({
      variables: { id: hotelId },
      update: (cache) => {
        repository.onDeleteHotel(hotelId, cache);
      },
    });
  };

  return (
    <>
      <Grow in={loading}>
        <LinearProgress />
      </Grow>

      <Material.Container>
        <AddHotelModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

        <Material.Title variant="h4">Gerenciamento de Hotéis</Material.Title>

        <Material.Subtitle variant="body1">
          aqui você poderá adicionar, atualizar e apagar hotéis
        </Material.Subtitle>

        <Material.AddButton variant="contained" onClick={() => setIsOpen(true)}>
          Adicionar Hotel
        </Material.AddButton>

        <Grid container spacing={2} alignItems={"stretch"}>
          {data &&
            data.hotelsByAdmin?.map((hotel) => (
              <Material.GridItemCard item md={3} key={hotel.id}>
                <Card
                  id={hotel.id}
                  key={hotel.id}
                  name={hotel.name}
                  thumbnail={hotel.thumbnail}
                  city={hotel.city}
                  state={hotel.state}
                  summary={hotel.summary}
                  isLink={true}
                  onRemove={onDeleteHotel}
                />
              </Material.GridItemCard>
            ))}
        </Grid>
      </Material.Container>
    </>
  );
};
