import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../store/configureStore";
import {
  fetchProductAsync,
  productSelectors,
} from "../../../../store/slices/productSlice";
import { NotFoundPage } from "../../../not-found/NotFoundPage";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../../../../store/slices/basketSlice";
import { Loading } from "../../../../components/Loading";
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@mui/material";
import { formatChileanCurrency } from "../../../../utils/util";

export const ProductDetailsPage = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const { status: productStatus } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(0);
  const id = useParams<{ id: string }>().id as string;
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, parseInt(id))
  );
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, product, dispatch]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (0 <= parseInt(event.currentTarget.value))
      setQuantity(parseInt(event.currentTarget.value));
  }

  function handleUpdateCart() {
    if (!product) return;

    if (!item || item?.quantity < quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;

      dispatch(
        addBasketItemAsync({ productId: product.id, quantity: updatedQuantity })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;

      dispatch(
        removeBasketItemAsync({
          productId: product.id,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (productStatus.includes("pending"))
    return <Loading message="Cargando el producto..." />;

  if (!product) return <NotFoundPage />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>

      <Grid item xs={6}>
        <Typography variant="h3" textAlign="center">
          {product.name}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h4" color="secondary">
          {formatChileanCurrency(product.price)}
        </Typography>

        <TableContainer sx={{ mb: 3 }}>
          <Table>
            <TableBody sx={{ fontSize: "1.1em" }}>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Tipo</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Marca</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant={"outlined"}
              type={"number"}
              label={"Cantidad en el carro"}
              fullWidth
              value={quantity}
            />
          </Grid>

          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={status.includes("pending")}
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color={"primary"}
              size={"large"}
              variant={"contained"}
              fullWidth
            >
              {item ? "Actualizar cantidad" : "Añadir al carro"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
