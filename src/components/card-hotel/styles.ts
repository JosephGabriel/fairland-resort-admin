import { Room } from "@mui/icons-material";

import {
  Card,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";

export const CardContainer = styled(Card)(() => ({
  position: "relative",
  height: "100%",
}));

export const MenuButton = styled(IconButton)(() => ({
  position: "absolute",
  top: 0,
  right: 0,
}));

export const CardImage = styled(CardMedia)(() => ({
  height: 140,
}));

export const CardSummary = styled(Typography)(() => ({
  margin: "0.2rem 0",
  marginBottom: "1rem",
}));

export const RoomIcon = styled(Room)(() => ({
  fontSize: "0.9rem",
  marginRight: "0.2rem",
}));

export const IconGrid = styled(Grid)(() => ({
  display: "flex",
}));
