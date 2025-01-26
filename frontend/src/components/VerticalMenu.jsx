import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import {
  Home,
  Article,
  People,
  Event,
  CloudUpload,
  ChevronLeft,
  Menu,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const VerticalMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [open, setOpen] = useState(true);

  const menuItems = [
    { text: "Dashboard", icon: <Home />, path: "/admin" },
    { text: "Create Article", icon: <Article />, path: "/create-article" },
    { text: "Manage Users", icon: <People />, path: "/manage-users" },
    { text: "Create Event", icon: <Event />, path: "/create-event" },
    { text: "Upload Resources", icon: <CloudUpload />, path: "/resources" },
  ];

  return (
    <Box  >
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        sx={{
          
          width: open ? drawerWidth : 73,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 73,
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            backgroundColor: '#1a237e',
            color: 'white',
            borderRight: 'none',
            top: "90px",
            height: "80vh",
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '20px 16px',
            justifyContent: open ? 'flex-end' : 'center',
          }}
        >
          <IconButton 
            onClick={() => setOpen(!open)}
            sx={{ color: 'white' }}
          >
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
        </Box>
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: 
                  currentPath === item.path 
                    ? 'rgba(255,255,255,0.08)'
                    : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.12)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{
                  opacity: open ? 1 : 0,
                  transition: 'opacity 0.3s',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default VerticalMenu;
