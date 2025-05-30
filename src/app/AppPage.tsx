import { Container, CssBaseline, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/home/HomePage";
import { useAppDispatch } from "./store/configureStore";
import { fetchCurrentUser } from "./store/slices/accountSlice";
import { fetchBasketAsync } from "./store/slices/basketSlice";
import { Loading } from "./components/Loading";

export const AppPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
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

  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {loading ? (
            <Loading message="Inicializando la aplicación..." />
          ) : location.pathname === "/" ? (
            <HomePage />
          ) : (
            <Container sx={{ mt: 4 }}>
              <Outlet />
            </Container>
          )}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};
