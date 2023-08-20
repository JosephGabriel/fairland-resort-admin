import { ChangeEvent, useState } from "react";
import { Grid, Pagination, SelectChangeEvent } from "@mui/material";

import { AddHotelModal } from "@components/add-hotel-modal";
import { CustomSelectInput } from "@components/custom-select-input";
import { CustomSkeleton } from "@components/skeleton";
import { Loader } from "@components/loader";
import { Card } from "@components/card";

import { HotelRepository } from "@repositories/hotel";

import {
  OrderBy,
  useDeleteHotelMutation,
  useGetHotelsByAdminQuery,
} from "@services/apollo/generated/hooks";

import { perPageOptions, selectOptions } from "./utils";

import * as Material from "./styles";

export const HotelsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [orderBy, setOrderBy] = useState(OrderBy.Desc);
  const [perPage, setPerPage] = useState(12);

  const [totalItems, setItemsCount] = useState(0);
  const [page, setPage] = useState(1);

  const { data, loading, refetch, fetchMore } = useGetHotelsByAdminQuery({
    variables: {
      options: {
        orderBy: orderBy,
        take: perPage,
        skip: page * perPage - perPage,
      },
    },
    onCompleted(data) {
      setItemsCount(Math.ceil(data.hotelsByAdmin.count / perPage));
    },
  });

  const repository = new HotelRepository();

  const [deleteHotel] = useDeleteHotelMutation();

  const handleChange = (event: SelectChangeEvent<OrderBy>) => {
    setOrderBy(event.target.value as OrderBy);

    setPage(1);

    refetch({
      options: {
        orderBy: orderBy,
        take: perPage,
        skip: page * perPage - perPage,
      },
    });
  };

  const onPageChange = async (_: ChangeEvent<unknown>, page: number) => {
    setPage(page);

    await fetchMore({
      variables: {
        options: {
          take: perPage,
          skip: page * perPage - perPage,
        },
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

  const onDeleteHotel = async (hotelId: string) => {
    await deleteHotel({
      variables: { id: hotelId },
      update: (cache, { data }) => {
        repository.onDeleteHotel(String(data?.deleteHotel.id), cache);
      },
    });
  };

  return (
    <>
      <Loader variant="linear" isLoading={loading} />

      <Material.Container>
        <AddHotelModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item md={"auto"}>
            <Material.Title variant="h4">
              Gerenciamento de Hotéis
            </Material.Title>

            <Material.Subtitle variant="body1">
              aqui você poderá adicionar, atualizar e apagar hotéis
            </Material.Subtitle>

            <Material.AddButton
              variant="contained"
              onClick={() => setIsOpen(true)}
            >
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

        <Grid container spacing={2} alignItems={"stretch"}>
          {loading && (
            <>
              {new Array(4).fill(" ").map((_, idx) => (
                <Material.GridItemCard item md={3} key={idx}>
                  <CustomSkeleton variant="card" />
                </Material.GridItemCard>
              ))}
            </>
          )}

          {data &&
            data.hotelsByAdmin?.hotels.map((hotel) => (
              <Material.GridItemCard item md={3} key={hotel.id}>
                <Card
                  id={hotel.id}
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

          <Grid item sm={12}>
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
      </Material.Container>
    </>
  );
};
