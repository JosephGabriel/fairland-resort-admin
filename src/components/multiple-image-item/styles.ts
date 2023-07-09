import { Box, IconButton, Paper, styled } from "@mui/material";

export const ImageContainer = styled(Paper)(() => ({
  flex: 1,
  height: "100%",
  display: "flex",
}));

export const ImageBox = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
}));

export const ImageAbsolute = styled("img")(() => ({
  height: "100%",
  width: "100%",
  position: "absolute",
  objectFit: "cover",
}));

export const ButtonContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 9999999999,
  width: "100%",
  height: "100%",
}));

export const ChangeImageButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const RemoveImageButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 2,
  transform: "translate(50%,-10%)",
  backgroundColor: theme.palette.background.default,
}));
