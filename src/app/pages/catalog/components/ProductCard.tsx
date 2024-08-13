import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../../models/product";
import { useAppSelector } from "../../../store/configureStore";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { status } = useAppSelector((state) => state.basket);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />

      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.imageUrl}
        title={product.name}
      />

      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" component="div">
          {product.price}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>

      <CardActions>
        <LoadingButton
          loading={status === "pendingAddItem" + product.id}
          //   TODO: Uncomment this line to add the product to the basket
          //   onClick={() =>
          //     dispatch(addBasketItemAsync({ productId: product.id }))
          //   }
          size="small"
        >
          Add to Cart
        </LoadingButton>

        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};
