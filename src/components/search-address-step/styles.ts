import { Grid, TextField, Typography, styled } from "@mui/material";

export const Container = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const SearchInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));
