import { Grid, TextField, styled } from "@mui/material";

export const Container = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const SearchInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
