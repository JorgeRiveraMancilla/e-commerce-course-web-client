import { Container, Paper, Typography, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <Container component={Paper}>
      <Typography variant={"h4"} sx={{ py: 1, textAlign: "center" }}>
        Página no encontrada
      </Typography>
      <Divider />
      <Button component={Link} to="/catalog" fullWidth>
        Volver a la tienda
      </Button>
    </Container>
  );
};
