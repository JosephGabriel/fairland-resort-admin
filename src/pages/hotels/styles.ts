import { Box, Button, Grid, Typography, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const Title = styled(Typography)(() => ({
  //   marginBottom: theme.spacing(4),
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export const AddButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const GridItemCard = styled(Grid)(() => ({
  flex: 1,
}));

export const PaginationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(3),
}));
