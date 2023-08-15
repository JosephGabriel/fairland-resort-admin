import { styled, Grid, Paper, Typography } from "@mui/material";

export const NoRoomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(10),
}));

export const NoRoomPaperText = styled(Typography)(() => ({
  textAlign: "center",
}));

export const RoomGridItemOptions = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const GridItemCard = styled(Grid)(() => ({
  flex: 1,
}));
