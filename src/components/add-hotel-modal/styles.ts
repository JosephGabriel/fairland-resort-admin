import { Box, DialogContentText, styled } from "@mui/material";

export const DialogText = styled(DialogContentText)(() => ({
  marginBottom: "3rem",
}));

export const LoadingContainer = styled(Box)(() => ({
  padding: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
