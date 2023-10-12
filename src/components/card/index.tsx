import { useState, MouseEvent } from "react";
import { MoreVert } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";

import { CardContent, Grid, Menu, MenuItem, Typography } from "@mui/material";

import { EditHotelModal } from "@components/edit-hotel-modal";

import { useDeleteHotelMutation } from "@services/apollo/hooks";

import { HotelRepository } from "@repositories/hotel";

import * as Material from "./styles";

interface Props {
  id: string;
  name: string;
  summary: string;
  thumbnail: string;
  city?: string;
  state?: string;
  isLink: boolean;
}

export const Card: React.FC<Props> = ({
  id,
  name,
  summary,
  thumbnail,
  city,
  state,
  isLink,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [deleteHotel] = useDeleteHotelMutation();

  const repository = new HotelRepository();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDeleteHotel().then(handleClose);
  };

  const onCloseEditModal = () => {
    setIsOpenEdit(false);
  };

  const handleEdit = () => {
    setIsOpenEdit(true);

    handleClose();
  };

  const onDeleteHotel = async () => {
    await deleteHotel({
      variables: { id },
      update: (cache, { data }) => {
        repository.onDeleteHotel(String(data?.deleteHotel.id), cache);
      },
      onCompleted: () => {
        enqueueSnackbar("Hótel apagado com sucesso", {
          variant: "success",
        });
      },
    });
  };

  return (
    <Material.CardContainer>
      <EditHotelModal
        hotelId={id}
        isOpen={isOpenEdit}
        onClose={onCloseEditModal}
      />

      <Material.CardImage image={thumbnail} title={name} />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Apagar</MenuItem>
      </Menu>

      <Material.MenuButton onClick={handleClick}>
        <MoreVert />
      </Material.MenuButton>

      <CardContent>
        {isLink ? (
          <Material.LinkTitle to={`${id}`}>
            <Typography
              gutterBottom
              variant="h5"
              marginBottom={0}
              component="h2"
            >
              {name}
            </Typography>
          </Material.LinkTitle>
        ) : (
          <Typography gutterBottom variant="h5" marginBottom={0} component="h2">
            {name}
          </Typography>
        )}

        <Material.CardSummary variant="body2" color="textSecondary">
          {summary}
        </Material.CardSummary>

        {city && state && (
          <Grid container alignItems={"center"}>
            <Material.IconGrid item md={"auto"}>
              <Material.RoomIcon fontSize="large" />
            </Material.IconGrid>

            <Grid item>
              <Typography variant="body2" color="textSecondary" component="p">
                {city} - {state}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Material.CardContainer>
  );
};
