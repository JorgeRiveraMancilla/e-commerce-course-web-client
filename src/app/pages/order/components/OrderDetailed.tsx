import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Order } from "../../../models/order";
import { formatChileanCurrency } from "../../../utils/util";

const translateOrderStatusText = (text: string) => {
  switch (text) {
    case "Pending":
      return "Pendiente";
    case "PaymentReceived":
      return "Pago recibido";
    case "PaymentFailed":
      return "Pago fallido";
    default:
      return text;
  }
};

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

export const OrderDetailed = ({ order, setSelectedOrder }: Props) => {
  const subtotal =
    order.orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ) ?? 0;

  const deliveryFee = 100000 < subtotal ? 0 : 5000;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} gutterBottom variant="h4">
          Pedido # {order.id} -{" "}
          {translateOrderStatusText(order.orderStatus.name)}
        </Typography>

        <Button
          onClick={() => setSelectedOrder(0)}
          sx={{ my: 3 }}
          size="large"
          variant="contained"
        >
          Volver a mis pedidos
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          mb: 4,
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>

              <TableCell align="right">Precio</TableCell>

              <TableCell align="center">Cantidad</TableCell>

              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {order.orderItems.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>

                <TableCell align="right">
                  {formatChileanCurrency(item.price)}
                </TableCell>

                <TableCell align="center">{item.quantity}</TableCell>

                <TableCell align="right">
                  {formatChileanCurrency(item.price * item.quantity)}
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
                  <TableCell colSpan={2}>Delivery fee*</TableCell>

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
                  <TableCell>
                    <span style={{ fontStyle: "italic" }}>
                      *Envíos gratis por pedidos sobre los $100.000
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
