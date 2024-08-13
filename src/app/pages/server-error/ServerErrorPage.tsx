import { Container, Paper, Typography, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";

export const ServerErrorPage = () => {
  const { state } = useLocation();

  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant="h4" sx={{ py: 1, textAlign: "center" }}>
            {state.error.title}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ py: 1 }}>
            {state.error.detail || "Internal Server Error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h4" sx={{ py: 1, textAlign: "center" }}>
          Server error
        </Typography>
      )}
    </Container>
  );
};
