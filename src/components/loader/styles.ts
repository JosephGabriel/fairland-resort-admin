import { Backdrop, styled } from "@mui/material";

export const BackDropContainer = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  position: "fixed",
  top: 0,
  height: "100%",
}));
