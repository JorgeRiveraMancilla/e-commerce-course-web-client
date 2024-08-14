import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import { useForm, FieldValues } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/configureStore";
import { loginAsync } from "../../store/slices/accountSlice";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const submitForm = async (data: FieldValues) => {
    try {
      await dispatch(loginAsync(data));
      navigate(location.state?.from || "/catalog");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>

      <Typography component="h1" variant="h5">
        Iniciar sesión
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(submitForm)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "El correo electrónico es obligatorio.",
          })}
          error={!!errors.email}
          helperText={errors?.email?.message as string}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: "La contraseña es obligatoria.",
          })}
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />

        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Iniciar sesión
        </LoadingButton>

        <Grid container>
          <Grid item>
            <Link to="/register" style={{ textDecoration: "none" }}>
              ¿No tienes una cuenta? Regístrate.
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
