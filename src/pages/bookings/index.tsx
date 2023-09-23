import { Grid } from "@mui/material";

import BookingsTable from "@components/bookings-table";

import * as Material from "./styles";

export const BookingsPage = () => {
  return (
    <Material.Container>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item md={"auto"}>
          <Material.Title variant="h4">
            Gerenciamento de Reservas
          </Material.Title>
          {/* <Material.Subtitle variant="body1">
            aqui você poderá adicionar, atualizar e apagar hotéis
          </Material.Subtitle>

          <Material.AddButton variant="contained" onClick={openAddModal}>
            Adicionar Hotel
          </Material.AddButton> */}
        </Grid>

        <BookingsTable />
      </Grid>
    </Material.Container>
  );
};
