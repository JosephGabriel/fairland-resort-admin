import { Box, TextField, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(2)} ${theme.spacing(1)}`,
  marginBottom: 0,
}));

export const Input = styled(TextField)(() => ({
  marginBottom: "1rem",
}));
