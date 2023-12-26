import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";

import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { Avatar, Box, IconButton, MenuItem } from "@mui/material";
import { PropsWithChildren } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface IDashboardProps extends PropsWithChildren {}

const DashboardContainerStyled = styled.div`
  height: 100vh;
  bacground: #f4f5f7;
`;

const drawerWidth = 240;

export default function Dashboard({ children }: IDashboardProps) {
  const handleLogout = () => {
    const c = confirm("are you sure want to logout?");
    if (c) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <DashboardContainerStyled>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            background: `#FFF`,
          }}
        >
          <Toolbar>
            <div style={{ width: "100%" }}>
              <IconButton size="large" edge="start" aria-label="open drawer">
                <MenuIcon />
              </IconButton>
            </div>
            <MenuItem sx={{ color: "black" }} onClick={handleLogout}>
              <Avatar
                sx={{
                  mr: 1,
                  fontSize: "16px",
                  width: "2rem",
                  height: "2rem",
                }}
              >
                U
              </Avatar>
              <p>Handoyo</p>
              <KeyboardArrowDownIcon />
            </MenuItem>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {["Dashboard", "Cars"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <HomeIcon /> : <LocalShippingIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </DashboardContainerStyled>
  );
}