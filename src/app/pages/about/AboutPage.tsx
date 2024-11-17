import {
  Box,
  Typography,
  Link,
  Paper,
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const AboutPage = () => {
  const technologies = [
    {
      name: "ASP.NET Core",
      type: "Backend Framework",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/.NET_Core_Logo.svg",
      docUrl: "https://docs.microsoft.com/en-us/aspnet/core/",
    },
    {
      name: "Entity Framework Core",
      type: "Object-Relational Mapping",
      logo: "https://entityframework.net/images/logo.png",
      docUrl: "https://docs.microsoft.com/en-us/ef/core/",
    },
    {
      name: "PostgreSQL",
      type: "Database",
      logo: "https://www.postgresql.org/media/img/about/press/elephant.png",
      docUrl: "https://www.postgresql.org/docs/",
    },
    {
      name: "AutoMapper",
      type: "Object Mapping",
      logo: "https://avatars.githubusercontent.com/u/890883?s=280&v=4",
      docUrl: "https://docs.automapper.org/en/stable/",
    },
    {
      name: "Stripe.net",
      type: "Payment Processing",
      logo: "https://stripe.com/img/v3/home/twitter.png",
      docUrl: "https://stripe.com/docs/api?lang=dotnet",
    },
    {
      name: "CloudinaryDotNet",
      type: "Cloud Storage",
      logo: "https://logowik.com/content/uploads/images/cloudinary-icon8821.logowik.com.webp",
      docUrl: "https://cloudinary.com/documentation/dotnet_integration",
    },
    {
      name: "React",
      type: "Frontend Library",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      docUrl: "https://reactjs.org/docs/getting-started.html",
    },
    {
      name: "Redux Toolkit",
      type: "State Management",
      logo: "https://redux.js.org/img/redux.svg",
      docUrl: "https://redux-toolkit.js.org/introduction/getting-started",
    },
    {
      name: "Material-UI",
      type: "UI Framework",
      logo: "https://mui.com/static/logo.png",
      docUrl: "https://mui.com/getting-started/usage/",
    },
    {
      name: "React Router",
      type: "Routing",
      logo: "https://reactrouter.com/_brand/React%20Router%20Brand%20Assets/React%20Router%20Logo/Light.svg",
      docUrl: "https://reactrouter.com/en/main",
    },
    {
      name: "Axios",
      type: "HTTP Client",
      logo: "https://axios-http.com/assets/logo.svg",
      docUrl: "https://axios-http.com/docs/intro",
    },
    {
      name: "Yup",
      type: "Validation",
      logo: "https://avatars.githubusercontent.com/u/339286?s=48&v=4",
      docUrl: "https://github.com/jquense/yup",
    },
    {
      name: "React Hook Form",
      type: "Forms",
      logo: "https://react-hook-form.com/images/logo/react-hook-form-logo-only.svg",
      docUrl: "https://react-hook-form.com/get-started",
    },
    {
      name: "Postman",
      type: "API Testing",
      logo: "https://logowik.com/content/uploads/images/postman-api-platform6643.logowik.com.webp",
      docUrl: "https://learning.postman.com/docs/getting-started/introduction/",
    },
  ];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Acerca de este proyecto
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography paragraph>
          Este E-commerce es un proyecto simulado desarrollado con fines
          educativos y de demostración. No es una tienda real y no procesa
          transacciones reales.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Tecnologías principales utilizadas
        </Typography>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Logo</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {technologies.map((tech) => (
                <TableRow key={tech.name}>
                  <TableCell>
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      style={{ width: 40, height: 40, objectFit: "contain" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={tech.docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="inherit"
                      underline="hover"
                    >
                      {tech.name}
                    </Link>
                  </TableCell>
                  <TableCell>{tech.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Repositorios del proyecto
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Link
            href="https://github.com/JorgeRiveraMancilla/e-commerce-course-api"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <GitHubIcon />
            API REST (Backend)
          </Link>
          <Link
            href="https://github.com/JorgeRiveraMancilla/e-commerce-course-web-client"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <GitHubIcon />
            Cliente Web (Frontend)
          </Link>
        </Box>

        <Divider sx={{ my: 3 }} />
        <Typography paragraph>
          Este proyecto es de código abierto y está disponible para su uso
          educativo y como referencia para desarrolladores que deseen aprender
          sobre la construcción de aplicaciones web modernas utilizando ASP.NET
          Core y React.
        </Typography>
      </Paper>
    </Container>
  );
};
