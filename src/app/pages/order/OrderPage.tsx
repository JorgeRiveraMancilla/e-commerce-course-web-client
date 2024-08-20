import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../api/agent";
import { Order } from "../../models/order";
import { Loading } from "../../components/Loading";
import { OrderDetailed } from "./components/OrderDetailed";
import { formatChileanCurrency } from "../../utils/util";

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

export const OrderPage = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

  useEffect(() => {
    setLoading(true);
    agent.Order.getAll()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Cargando mis pedidos..." />;

  if (selectedOrderNumber > 0 && orders)
    return (
      <OrderDetailed
        order={orders.find((o) => o.id === selectedOrderNumber)!}
        setSelectedOrder={setSelectedOrderNumber}
      />
    );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Número del pedido</TableCell>

            <TableCell align="right">Total</TableCell>

            <TableCell align="right">Fecha</TableCell>

            <TableCell align="right">Estado</TableCell>

            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>

              <TableCell align="right">
                {formatChileanCurrency(order.total)}
              </TableCell>

              <TableCell align="right">
                {order.orderDate.toString().split("T")[0]}
              </TableCell>

              <TableCell align="right">
                {translateOrderStatusText(order.orderStatus)}
              </TableCell>

              <TableCell align="right">
                <Button onClick={() => setSelectedOrderNumber(order.id)}>
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
