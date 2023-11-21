import { Box, Grid, Typography, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const GridHeader = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  alignItems: "center",
  justifyContent: "space-between",
}));

export const Title = styled(Typography)(() => ({}));

export const GridSearchItem = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "flex-end",
}));

export default {
  Container,
  GridHeader,
  Title,
  GridSearchItem,
};
