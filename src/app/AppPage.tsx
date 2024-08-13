import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./store/configureStore";
import { fetchCurrentUser } from "./store/slices/accountSlice";
import { fetchBasketAsync } from "./store/slices/basketSlice";
import { Loading } from "./components/Loading";
import { Header } from "./components/Header";

export const AppPage = () => {
  const dispatch = useAppDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: !darkMode ? "#eaeaea" : "#121212",
      },
    },
  });

  const handleSwitchTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />

      <CssBaseline />

      <Header
        darkMode={darkMode}
        handleThemeChange={() => handleSwitchTheme()}
      />

      {loading ? (
        <Loading message="Inicializando la aplicación..." />
      ) : (
        <Container sx={{ mt: 4 }}>
          <Outlet />
        </Container>
      )}
    </ThemeProvider>
  );
};
