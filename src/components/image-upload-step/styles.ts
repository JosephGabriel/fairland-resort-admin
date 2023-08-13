import { Grid, IconButton, Paper, styled } from "@mui/material";

export const Container = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const GridItem = styled(Grid)(() => ({
  flex: 1,
}));

export const UploadItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const UploadButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(2),
}));
