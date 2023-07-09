import { Box, Button, Typography, styled } from "@mui/material";

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
