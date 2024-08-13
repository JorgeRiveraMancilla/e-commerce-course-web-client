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
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { addBasketItemAsync } from "../../../store/slices/basketSlice";
import { formatChileanCurrency } from "../../../utils/util";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  const handleAddItem = (productId: number) => {
    dispatch(addBasketItemAsync({ productId }));
  };

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
          {formatChileanCurrency(product.price)}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>

      <CardActions>
        <LoadingButton
          loading={status === "pendingAddItem" + product.id}
          onClick={() => handleAddItem(product.id)}
          size="small"
        >
          Añadir al carro
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          Ver
        </Button>
      </CardActions>
    </Card>
  );
};
