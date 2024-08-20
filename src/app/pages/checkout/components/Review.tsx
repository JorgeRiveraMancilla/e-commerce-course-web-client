import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { useAppSelector } from "../../../store/configureStore";
import { formatChileanCurrency } from "../../../utils/util";

export const Review = () => {
  const { basket } = useAppSelector((state) => state.basket);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>

            <TableCell align="right">Precio</TableCell>

            <TableCell align="center">Cantidad</TableCell>

            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {basket?.items.map((item) => (
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
                ${(item.price / 100).toFixed(2)}
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
  );
};
