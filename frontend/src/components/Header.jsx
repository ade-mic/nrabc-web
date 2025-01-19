import React from "react";
import "./styles/Header.css";
import { AccountCircle, MenuOutlined } from "@mui/icons-material";
import { Typography, IconButton, Menu, MenuItem, useMediaQuery, Button } from "@mui/material";

const Header = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "About Us", link: "/about" },
    { text: "Events", link: "/events" },
    { text: "Ministries", link: "/ministries" },
    { text: "Blog", link: "/blog" },
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <a href="/" aria-label="Home">
            <img src="/nrabc-text_logo.svg" alt="Church Logo" className="logo" />
          </a>
        </div>
        {isMobile ? (
          <>
            <IconButton
              aria-label="Open Menu"
              onClick={handleMenuOpen}
              className="menu-toggle"
            >
              <MenuOutlined sx={{ fontSize: "30px" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((menuItem, index) => (
                <MenuItem key={index} onClick={handleMenuClose}>
                  <a href={menuItem.link} className="menu-link" role="menuitem">
                    {menuItem.text}
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <nav className="nav">
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index}>
                  <a href={menuItem.link} className="nav-link">
                    {menuItem.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <Button className="account" aria-label="account" startIcon={<AccountCircle sx={{color: "#6d2323"}} />}>
          <Typography  className="account-text">
            Account
          </Typography>
        </Button>
      </div>
    </header>
  );
};

export default Header;
