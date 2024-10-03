import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SailingIcon from '@mui/icons-material/Sailing';
import { useNavigate } from 'react-router-dom';

const settings: string[] = ["Profile", "Bookings", "Logout"];

export const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget as HTMLElement);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget as HTMLElement);
    };

    const navigate = useNavigate();
    const handleOnClick = (path: string) => { 
          navigate(path);
      };
    
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SailingIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".1rem",
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        NAV DESK
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            <MenuItem onClick={() => { handleOnClick('/rooms'); handleCloseUserMenu(); }}><Typography textAlign="center">Rooms</Typography></MenuItem>
                            <MenuItem onClick={() => { handleOnClick('/pricing'); handleCloseUserMenu(); }}><Typography textAlign="center">Pricing</Typography></MenuItem>
                            <MenuItem onClick={() => { handleOnClick('/bookings'); handleCloseUserMenu(); }}><Typography textAlign="center">Booking</Typography></MenuItem>
                            <MenuItem onClick={() => { handleOnClick('/register'); handleCloseUserMenu(); }}><Typography textAlign="center">Register</Typography></MenuItem>
                        </Menu>
                    </Box>
                    <SailingIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        NAV DESK
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button onClick={() => handleOnClick('/rooms')} sx={{ my: 2, color: "white", display: "block" }}>
                            Rooms
                        </Button>
                        <Button onClick={() => handleOnClick('/pricing')} sx={{ my: 2, color: "white", display: "block" }}>
                            Pricing
                        </Button>
                        <Button onClick={() => handleOnClick('/bookings')} sx={{ my: 2, color: "white", display: "block" }}>
                            Booking
                        </Button>
                        <Button onClick={() => handleOnClick('/register')} sx={{ my: 2, color: "white", display: "block" }}>
                            Register
                        </Button>
                    </Box>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: "center" }}>
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
  }