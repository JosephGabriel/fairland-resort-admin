import { useState } from "react";
import { Grid, Grow, LinearProgress } from "@mui/material";

import { AddHotelModal } from "../../components/add-hotel-modal";
import { CardHotel } from "../../components/card-hotel";

import * as Material from "./styles";
import { useGetHotelsByAdminQuery } from "../../services/apollo/generated";

export const HotelsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, loading } = useGetHotelsByAdminQuery();

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
                <CardHotel hotel={hotel} />
              </Material.GridItemCard>
            ))}
        </Grid>
      </Material.Container>
    </>
  );
};
