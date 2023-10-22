import { Box, DialogContentText, styled } from "@mui/material";

export const DialogText = styled(DialogContentText)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default { DialogText, LoadingContainer };
