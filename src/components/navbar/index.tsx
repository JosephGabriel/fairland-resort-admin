import { useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <>
      <Material.TopBar position="sticky">
        <Toolbar>
          <IconButton onClick={() => setOpen(true)}>
            <Menu />
          </IconButton>
        </Toolbar>
      </Material.TopBar>

      <Material.Drawer
        open={open}
        variant="temporary"
        anchor="left"
        onClose={() => setOpen(false)}
      >
        <Toolbar />

        <Box>
          <List>
            {drawerItems.map((item, index) => (
              <>
                <Link
                  to={`/dashboard${item.link}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem key={item.link} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                {index === drawerItems.length - 1 ? null : <Divider />}
              </>
            ))}
          </List>
        </Box>
      </Material.Drawer>
    </>
  );
};
