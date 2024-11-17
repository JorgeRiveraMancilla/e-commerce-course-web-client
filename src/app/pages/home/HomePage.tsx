import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

export const HomePage = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderHeight = "70vh";
  const maxSliderWidth = "calc(70vh * 16 / 9)";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Typography variant="h4" sx={{ my: 4 }}>
        ¡Bienvenido a la tienda!
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: maxSliderWidth,
          height: sliderHeight,
          mx: "auto",
        }}
      >
        <Slider {...settings}>
          <div>
            <img
              src="/images/hero1.jpg"
              alt="hero"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="/images/hero2.jpg"
              alt="hero"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="/images/hero3.jpg"
              alt="hero"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Slider>
      </Box>
    </Box>
  );
};
