import React from "react";
import "./styles/Header.css";
import { AccountCircle, MenuOutlined } from "@mui/icons-material";
import {
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import your AuthContext


const Header = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);
  const { currentUser, signOut } = useAuth(); // Get the current user from AuthContext
  const navigate = useNavigate();

  //  Handler for signing out
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/account");
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  // Handlers for the main menu
  const handleMenuOpen = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  // Handlers for the account menu
  const handleAccountMenuOpen = (event) => setAccountAnchorEl(event.currentTarget);
  const handleAccountMenuClose = () => setAccountAnchorEl(null);

  // Menu items
  const menuItems = [
    { text: "Home", link: "/" },
    { text: "About Us", link: "/about" },
    { text: "Events", link: "/events" },
    { text: "Ministries", link: "/ministries" },
    { text: "Blog", link: "/blog" },
  ];

  const accountItems = currentUser
    ? [
        { text: "Profile", link: "/profile" },
        { text: "Sign Out", action: handleSignOut },
      ]
    : [
        { text: "Sign In/Up", link: "/account" },
      ];

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo-container">
          <a href="/" aria-label="Home">
            <img src="/nrabc-text_logo.svg" alt="Church Logo" className="logo" />
          </a>
        </div>

        {/* Navigation Menu */}
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
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((menuItem, index) => (
                <MenuItem key={index} onClick={() => navigate(menuItem.link)}>
                  {menuItem.text}
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

        {/* Account Menu */}
        <Button
          onClick={handleAccountMenuOpen}
          className="account"
          aria-label="account"
          startIcon={<AccountCircle sx={{ color: "#6d2323" }} />}
        >
          <Typography className="account-text">Account</Typography>
        </Button>
        <Menu
          anchorEl={accountAnchorEl}
          open={Boolean(accountAnchorEl)}
          onClose={handleAccountMenuClose}
        >
          {accountItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={item.action ? item.action : () => navigate(item.link)}
            >
              {item.text}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </header>
  );
};

export default Header;
