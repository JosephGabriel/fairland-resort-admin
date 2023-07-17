import React from "react";
import { MoreVert } from "@mui/icons-material";

import { CardContent, Grid, Menu, MenuItem, Typography } from "@mui/material";

import {
  useDeleteHotelMutation,
  GetHotelsByAdminQuery,
  GetHotelsByAdminDocument,
} from "../../services/apollo/generated";

import { Unpacked } from "../../../types";

import * as Material from "./styles";

interface Props {
  hotel: Unpacked<GetHotelsByAdminQuery["hotelsByAdmin"]>;
}

export const CardHotel = ({ hotel }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [deleteHotel] = useDeleteHotelMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteHotel = async () => {
    await deleteHotel({
      variables: { id: `${hotel?.id}` },
      update: (cache) => {
        const hotels = cache.readQuery<GetHotelsByAdminQuery>({
          query: GetHotelsByAdminDocument,
        });

        cache.writeQuery({
          query: GetHotelsByAdminDocument,
          data: {
            hotelsByAdmin: hotels?.hotelsByAdmin?.filter(
              (h) => h.id !== hotel?.id
            ),
          },
        });
      },
    });
  };

  const handleEdit = () => {
    handleClose();
  };

  return (
    <Material.CardContainer>
      <Material.CardImage image={hotel?.thumbnail} title={hotel?.name} />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDeleteHotel}>Apagar</MenuItem>
      </Menu>

      <Material.MenuButton onClick={handleClick}>
        <MoreVert />
      </Material.MenuButton>

      <CardContent>
        <Material.LinkTitle to={`${hotel?.id}`}>
          <Typography gutterBottom variant="h5" marginBottom={0} component="h2">
            {hotel?.name}
          </Typography>
        </Material.LinkTitle>

        <Material.CardSummary variant="body2" color="textSecondary">
          {hotel?.summary}
        </Material.CardSummary>

        <Grid container alignItems={"center"}>
          <Material.IconGrid item md={"auto"}>
            <Material.RoomIcon fontSize="small" />
          </Material.IconGrid>

          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              {hotel?.city} - {hotel?.state}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Material.CardContainer>
  );
};
