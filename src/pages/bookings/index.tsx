import { Fragment } from "react";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

import { BookingsTable } from "@src/components/bookings-table";
import { Loader } from "@src/components/loader";

import { useGetAllBookingsQuery } from "@src/services/apollo/hooks";

import Material from "./styles";

export const BookingsPage = () => {
  const { data, loading } = useGetAllBookingsQuery();

  return (
    <Fragment>
      <Loader isLoading={loading} variant="linear" />

      <Material.Container>
        <Material.GridHeader
          container
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item md={6}>
            <Material.Title variant="h4">
              Gerenciamento de Reservas
            </Material.Title>
            <Typography variant="body1">
              aqui você poderá adicionar, atualizar e apagar hotéis
            </Typography>
          </Grid>

          <Material.GridSearchItem item md={6}>
            <TextField
              label="Pesquisar"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Material.GridSearchItem>
        </Material.GridHeader>

        {data?.bookings ? <BookingsTable data={data.bookings} /> : null}
      </Material.Container>
    </Fragment>
  );
};
