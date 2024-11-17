import { Edit, Delete } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import agent from "../../api/agent";
import { Product } from "../../models/product";
import { useProducts } from "../catalog/hooks/useProducts";
import { useState } from "react";
import { useAppDispatch } from "../../store/configureStore";
import { ProductForm } from "./components/ProductForm";
import { formatChileanCurrency } from "../../utils/util";
import { removeProduct, setPageNumber } from "../../store/slices/productSlice";
import { AppPagination } from "../../components/AppPagination";

export const InventoryPage = () => {
  const { products, metaData } = useProducts();
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    setEditMode(true);
  }

  function cancelEdit() {
    if (selectedProduct) setSelectedProduct(undefined);
    setEditMode(false);
  }

  function handleDeleteProduct(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteProduct(id)
      .then(() => dispatch(removeProduct(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  if (editMode)
    return <ProductForm cancelEdit={cancelEdit} product={selectedProduct} />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Inventario
        </Typography>

        <Button
          sx={{ m: 2 }}
          size="large"
          variant="contained"
          onClick={() => setEditMode(true)}
        >
          Crear
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Producto</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="center">Tipo</TableCell>
              <TableCell align="center">Marca</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>

                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {formatChileanCurrency(product.price)}
                </TableCell>
                <TableCell align="center">{product.type}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.stock}</TableCell>
                <TableCell align="right">
                  <Button
                    startIcon={<Edit />}
                    onClick={() => handleSelectProduct(product)}
                  />
                  <LoadingButton
                    loading={loading && target === product.id}
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {metaData && (
        <Box sx={{ pt: 2 }}>
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        </Box>
      )}
    </>
  );
};
