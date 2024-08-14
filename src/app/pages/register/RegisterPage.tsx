import { Info, LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Grid,
  Tooltip,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../api/agent";

const regexPassword =
  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;

const regexEmail = /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

const tooltipMessage =
  "Contraseña debe tener 6-10 caracteres, con al menos un número, una minúscula, una mayúscula, un carácter especial, y sin espacios.";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const submitForm = async (data: FieldValues) => {
    agent.Account.register(data)
      .then(() => {
        toast.success("Registro exitoso - Inicia sesión ahora");
        navigate("/login");
      })
      .catch((error) => handleApiErrors(error));
  };

  const handleApiErrors = (errors: any) => {
    console.log(errors);
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
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
        Registrarse
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(submitForm)}
        noValidate
        sx={{ mt: 1, width: "100%" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="Nombre completo"
          {...register("name", {
            required: "El nombre completo es requerido.",
          })}
          error={!!errors.name}
          helperText={errors?.name?.message as string}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Correo electrónico"
          {...register("email", {
            required: "El correo electrónico es obligatorio.",
            pattern: {
              value: regexEmail,
              message: "El correo electrónico es inválido.",
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message as string}
        />

        <Box display="flex">
          <TextField
            margin="normal"
            required
            fullWidth
            label="Contraseña"
            type="password"
            {...register("password", {
              required: "La contraseña es requerida.",
              pattern: {
                value: regexPassword,
                message:
                  "La contraseña no cumple con los requisitos de complejidad.",
              },
            })}
            error={!!errors.password}
            helperText={errors?.password?.message as string}
          />

          <Tooltip title={tooltipMessage} sx={{ ml: 1, mt: 3.5 }}>
            <Info color="secondary" />
          </Tooltip>
        </Box>

        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Registrarse
        </LoadingButton>

        <Grid container>
          <Grid item>
            <Link to="/login" style={{ textDecoration: "none" }}>
              {"¿Ya tienes una cuenta? Inicia sesión."}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
