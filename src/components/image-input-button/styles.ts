import { Grid, IconButton, Paper, Typography, styled } from "@mui/material";

export const Container = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const GridItem = styled(Grid)(() => ({
  flex: 1,
  height: 200,
  maxHeight: 200,
  position: "relative",
}));

export const UploadItem = styled(Paper)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  height: "100%",
}));

export const ImagesContainer = styled(Paper)(() => ({
  flex: 1,
  position: "relative",
  height: "100%",
  display: "flex",
}));

export const Image = styled("img")(() => ({
  height: "100%",
  width: "100%",
  // aspectRatio: "1/1",
  obejectFit: "cover",
}));

export const ImageAbsolute = styled("img")(() => ({
  height: "100%",
  width: "100%",
  // aspectRatio: "1/1",
  obejectFit: "cover",
  position: "absolute",
}));

export const ButtonContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 9999999999,
  width: "100%",
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

export const UploadButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const LabelText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(1),
}));
