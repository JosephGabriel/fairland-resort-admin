import { AppBar, Drawer as _Drawer, styled } from "@mui/material";

const drawerWidth = 240;

export const TopBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const Drawer = styled(_Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
}));
