import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import StoreIcon from "@mui/icons-material/Store";
import { useState, MouseEvent } from "react";
import { Badge, Switch } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { logout } from "../store/slices/accountSlice";
import { clearBasket } from "../store/slices/basketSlice";

const mainTitle = "E-COMMERCE";
const leftLinks = [
  { title: "Productos", path: "/catalog" },
  { title: "Nosotros", path: "/about" },
  { title: "Contacto", path: "/contact" },
];
const rightLinks = [
  { title: "Iniciar sesión", path: "/login" },
  { title: "Registrarse", path: "/register" },
];
const linkStyles = {
  color: "inherit",
  my: 2,
  textDecoration: "none",
  "&.active": {
    color: "text.secondary",
  },
  "&:hover": {
    color: "grey.500",
  },
};

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export const Header = ({ handleThemeChange, darkMode }: Props) => {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const itemCount = basket?.items?.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const [anchorUserMenu, setAnchorUserMenu] = useState<HTMLElement | null>(
    null
  );

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const handleClickProfile = () => {
    navigate("/profile");
    setAnchorUserMenu(null);
  };

  const handleClickLogout = () => {
    dispatch(logout());
    dispatch(clearBasket());
    setAnchorUserMenu(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <IconButton color="inherit" component={NavLink} to="/">
            <StoreIcon />
          </IconButton>

          <Typography
            component={NavLink}
            to="/"
            variant="h6"
            noWrap
            sx={{
              color: "inherit",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              mx: 2,
              textDecoration: "none",
            }}
          >
            {mainTitle}
          </Typography>

          <Box sx={{ display: "flex", flexGrow: 1 }}>
            {leftLinks.map(({ title, path }) => (
              <Button key={title} component={NavLink} to={path} sx={linkStyles}>
                {title}
              </Button>
            ))}
          </Box>

          <IconButton
            component={Link}
            to="/basket"
            size="large"
            edge="start"
            color="inherit"
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <Box sx={{ flexGrow: 0, mx: 1 }}>
              <Tooltip title="Abrir configuración">
                <IconButton
                  onClick={(event: MouseEvent<HTMLElement>) =>
                    handleOpenUserMenu(event)
                  }
                  sx={{ p: 0 }}
                >
                  <Avatar />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorUserMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorUserMenu)}
                onClose={() => handleCloseUserMenu()}
              >
                <MenuItem onClick={() => handleClickProfile()}>
                  <Typography textAlign="center">Perfil</Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClickLogout()}>
                  <Typography textAlign="center">Cerrar sesión</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: "flex" }}>
              {rightLinks.map(({ title, path }) => (
                <Button
                  key={title}
                  component={NavLink}
                  to={path}
                  sx={linkStyles}
                >
                  {title}
                </Button>
              ))}
            </Box>
          )}

          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
