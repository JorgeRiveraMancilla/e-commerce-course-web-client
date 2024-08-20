import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
  removeBasketItemAsync,
  addBasketItemAsync,
} from "../../store/slices/basketSlice";
import { formatChileanCurrency } from "../../utils/util";

export const BasketPage = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const subtotal =
    basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ??
    0;
  const deliveryFee = subtotal > 100000 ? 0 : 5000;

  if (!basket || basket.items.length == 0)
    return (
      <Typography variant="h5" textAlign="center">
        El carro está vacío
      </Typography>
    );

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mb: 4,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>

              <TableCell align="right">Precio</TableCell>

              <TableCell align="center">Cantidad</TableCell>

              <TableCell align="right">Subtotal</TableCell>

              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      style={{ height: 50, marginRight: 20 }}
                      src={item.imageUrl}
                      alt={item.name}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>

                <TableCell align="right">
                  {formatChileanCurrency(item.price)}
                </TableCell>

                <TableCell align="center">
                  <LoadingButton
                    color="error"
                    loading={
                      status === "pendingRemoveItem" + item.productId + "rem"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>

                  {item.quantity}

                  <LoadingButton
                    loading={status === "pendingAddItem" + item.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({ productId: item.productId })
                      )
                    }
                    color="secondary"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>

                <TableCell align="right">
                  {formatChileanCurrency(item.price * item.quantity)}
                </TableCell>

                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item.productId + "del"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container>
        <Grid item xs={6} />

        <Grid item xs={6}>
          <TableContainer
            component={Paper}
            variant={"outlined"}
            sx={{
              mb: 4,
            }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>Subtotal</TableCell>

                  <TableCell align="right">
                    {formatChileanCurrency(subtotal)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2}>Envío*</TableCell>

                  <TableCell align="right">
                    {formatChileanCurrency(deliveryFee)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>

                  <TableCell align="right">
                    {formatChileanCurrency(subtotal + deliveryFee)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={3}>
                    <span style={{ fontStyle: "italic" }}>
                      *Envíos gratis por pedidos sobre los $100.000
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            component={Link}
            to={"/checkout"}
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mb: 4,
            }}
          >
            Comprar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
