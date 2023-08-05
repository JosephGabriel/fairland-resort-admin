import { useState } from "react";
import { Grid, Grow, LinearProgress } from "@mui/material";

import { AddHotelModal } from "@components/add-hotel-modal";
import { Card } from "@components/card";

import { GetHotelsByAdminDocument } from "@services/apollo/documents";

import {
  useDeleteHotelMutation,
  useGetHotelsByAdminQuery,
} from "@services/apollo/hooks";

import * as Material from "./styles";

export const HotelsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, loading } = useGetHotelsByAdminQuery();

  const [deleteHotel] = useDeleteHotelMutation();

  const onDeleteHotel = async (id: string) => {
    await deleteHotel({
      variables: { id },
      update: (cache) => {
        const hotels = cache.readQuery({
          query: GetHotelsByAdminDocument,
        });

        if (!hotels) {
          return;
        }

        cache.writeQuery({
          query: GetHotelsByAdminDocument,
          data: {
            hotelsByAdmin: hotels?.hotelsByAdmin?.filter((h) => h.id !== id),
          },
        });
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
