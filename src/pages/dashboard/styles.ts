import { Box, Grid, Paper, Typography, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const GridItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  flex: 1,
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const GridFullItem = styled(Grid)(() => ({
  display: "flex",
  flex: 1,
}));

export const GridTitle = styled(Typography)(() => ({
  marginBottom: "1rem",
}));
