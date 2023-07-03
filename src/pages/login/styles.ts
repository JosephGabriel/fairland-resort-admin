import { Button, Grid, TextField, Typography, styled } from "@mui/material";

export const Container = styled(Grid)(() => ({
  height: "100vh",
}));

export const Title = styled(Typography)(() => ({
  // marginTop: theme.spacing(5),
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
}));

export const FormContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: "#333",
  display: "flex",
  flexDirection: "column",
  //   alignItems: "center",
  // paddingTop: theme.spacing(0),
  borderRadius: theme.shape.borderRadius,
  width: "30%",
}));

export const Form = styled("form")(({ theme }) => ({
  //   width: "60%",
  padding: theme.spacing(5),
}));

export const Input = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
