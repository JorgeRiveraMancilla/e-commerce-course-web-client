import {
  Container,
  Paper,
  Typography,
  Box,
  Link,
  Avatar,
  Grid,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const ContactPage = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Avatar
              alt="Jorge Rivera Mancilla"
              src="https://media.licdn.com/dms/image/v2/D4E03AQFnnpR_MUDgYg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1702776972159?e=1736985600&v=beta&t=p66PGf18thD95b354su6BUoBfx8b49utKddkVreq2lg"
              sx={{ width: 200, height: 200, margin: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Jorge Rivera Mancilla
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Ingeniero de Software
            </Typography>
            <Typography variant="body1" paragraph>
              Antofagasta, Chile
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Link
                href="https://github.com/JorgeRiveraMancilla"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon fontSize="large" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/jorge-rivera-mancilla"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon fontSize="large" />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
