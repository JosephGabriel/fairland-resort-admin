import React from "react";
import { MoreVert } from "@mui/icons-material";

import { CardContent, Grid, Menu, MenuItem, Typography } from "@mui/material";

import * as Material from "./styles";

interface Props {
  id: string;
  name: string;
  summary: string;
  thumbnail: string;
  city?: string;
  state?: string;
  isLink: boolean;
  onEdit?: () => void;
  onRemove?: (id: string) => void;
}

export const Card = ({
  onEdit,
  onRemove,
  id,
  name,
  summary,
  thumbnail,
  city,
  state,
  isLink,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (onRemove) {
      onRemove(id);
    }
    handleClose();
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }

    handleClose();
  };

  return (
    <Material.CardContainer>
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
              <Material.RoomIcon fontSize="small" />
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
