import { ChangeEvent, useState, Fragment } from "react";
import { Grid, Pagination, SelectChangeEvent } from "@mui/material";

import { AddHotelModal } from "@src/components/add-hotel-modal";
import { CustomSelectInput } from "@src/components/custom-select-input";
import { HotelCarousel } from "@src/components/hotel-carousel";
import { Loader } from "@src/components/loader";

import { OrderBy, useGetHotelsByAdminQuery } from "@src/services/apollo/hooks";

import { perPageOptions, selectOptions } from "./utils";

import * as Material from "./styles";

export const HotelsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [orderBy, setOrderBy] = useState(OrderBy.Desc);
  const [perPage, setPerPage] = useState(12);

  const [page, setPage] = useState(1);

  const { data, loading, refetch } = useGetHotelsByAdminQuery({
    variables: {
      options: {
        orderBy: orderBy,
        take: perPage,
        skip: page * perPage - perPage,
      },
    },
  });

  const openAddModal = () => setIsOpen(true);

  const onCloseAddModal = () => setIsOpen(false);

  const handleChange = (event: SelectChangeEvent<OrderBy>) => {
    setOrderBy(event.target.value as OrderBy);

    setPage(() => {
      return 1;
    });

    refetch({
      options: {
        orderBy: event.target.value as OrderBy,
        take: perPage,
        skip: 1 * perPage - perPage,
      },
    });
  };

  const onPageChange = async (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);

    await refetch({
      options: {
        take: perPage,
        skip: page * perPage - perPage,
      },
    });
  };

  const handlePerPageChange = (event: SelectChangeEvent<string>) => {
    setPerPage(parseInt(event.target.value));

    setPage(1);

    refetch({
      options: {
        orderBy: orderBy,
        take: perPage,
        skip: page * perPage - perPage,
      },
    });
  };

  return (
    <Fragment>
      <Loader variant="linear" isLoading={loading} />

      <Material.Container>
        {isOpen && <AddHotelModal isOpen={isOpen} onClose={onCloseAddModal} />}

        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item md={"auto"}>
            <Material.Title variant="h4">
              Gerenciamento de Hotéis
            </Material.Title>

            <Material.Subtitle variant="body1">
              aqui você poderá adicionar, atualizar e apagar hotéis
            </Material.Subtitle>

            <Material.AddButton variant="contained" onClick={openAddModal}>
              Adicionar Hotel
            </Material.AddButton>
          </Grid>

          <Grid item>
            <CustomSelectInput
              value={String(perPage)}
              label="Itens por página"
              id="select-per-page"
              labelId="select-per-page"
              options={perPageOptions}
              onChange={handlePerPageChange}
            />

            <CustomSelectInput<OrderBy>
              value={orderBy}
              label="Ordenar por"
              id="select-outlined-label"
              labelId="select-outlined-label"
              options={selectOptions}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <HotelCarousel isLoading={loading} hotels={data?.hotelsByAdmin.nodes} />

        <Grid container>
          <Grid item sm={12}>
            <Material.PaginationContainer>
              <Pagination
                color="primary"
                defaultPage={1}
                siblingCount={0}
                count={
                  Math.ceil(Number(data?.hotelsByAdmin.count) / perPage) || 0
                }
                page={page}
                onChange={onPageChange}
              />
            </Material.PaginationContainer>
          </Grid>
        </Grid>
      </Material.Container>
    </Fragment>
  );
};
