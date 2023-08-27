import { styled, Grid, Paper, Typography } from "@mui/material";

export const NoHotelPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(10),
}));

export const NoHotelPaperText = styled(Typography)(() => ({
  textAlign: "center",
}));

export const GridItemCard = styled(Grid)(() => ({
  flex: 1,
}));
