import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import { Gite, Menu, Explore, Luggage } from "@mui/icons-material";

import * as Material from "./styles";

const drawerItems = [
  {
    name: "Dashboard",
    link: "",
    icon: <Explore />,
  },
  {
    name: "Hotéis",
    link: "/hotels",
    icon: <Gite />,
  },
  {
    name: "Reservas",
    link: "/bookings",
    icon: <Luggage />,
  },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toggleOpen = () => setOpen((prev) => !prev);

  const onNavigate = (link: string) => {
    toggleOpen();
    navigate(`/dashboard${link}`);
  };

  return (
    <>
      <Material.TopBar position="sticky">
        <Toolbar>
          <IconButton onClick={toggleOpen}>
            <Menu />
          </IconButton>
        </Toolbar>
      </Material.TopBar>

      <Material.Drawer
        open={open}
        variant="temporary"
        anchor="left"
        onClose={toggleOpen}
      >
        <Toolbar />

        <Box>
          <List>
            {drawerItems.map((item, index) => (
              <Fragment key={index}>
                <ListItem
                  key={item.link}
                  onClick={() => onNavigate(item.link)}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>

                {index === drawerItems.length - 1 ? null : <Divider />}
              </Fragment>
            ))}
          </List>
        </Box>
      </Material.Drawer>
    </>
  );
};
