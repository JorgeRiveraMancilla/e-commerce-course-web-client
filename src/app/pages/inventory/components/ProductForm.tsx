import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import agent from "../../../api/agent";
import { AppDropzone } from "../../../components/AppDropzone";
import { AppSelectList } from "../../../components/AppSelectList";
import { AppTextInput } from "../../../components/AppTextInput";
import { Product } from "../../../models/product";
import { useAppDispatch } from "../../../store/configureStore";
import { useProducts } from "../../catalog/hooks/useProducts";
import { validationSchema } from "../validations/productValidation";
import { setProduct } from "../../../store/slices/productSlice";

interface Props {
  product?: Product;
  cancelEdit: () => void;
}

export const ProductForm = ({ product, cancelEdit }: Props) => {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: "onTouched",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver<any>(validationSchema),
  });
  const { brands, types } = useProducts();
  const watchFile = watch("file", null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product && !watchFile && !isDirty) reset(product);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [product, reset, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Product;
      if (product) {
        response = await agent.Admin.updateProduct(data);
      } else {
        response = await agent.Admin.createProduct(data);
      }
      dispatch(setProduct(response));
      cancelEdit();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Detalles del Producto
      </Typography>

      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="name" label="Nombre" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AppSelectList
              items={brands}
              control={control}
              name="brand"
              label="Marca"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AppSelectList
              items={types}
              control={control}
              name="type"
              label="Tipo"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="number"
              control={control}
              name="price"
              label="Precio"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="number"
              control={control}
              name="stock"
              label="Stock"
            />
          </Grid>

          <Grid item xs={12}>
            <AppTextInput
              multiline={true}
              rows={4}
              control={control}
              name="description"
              label="Descripción"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <AppDropzone control={control} name="file" />
              {watchFile ? (
                <img
                  src={watchFile.preview}
                  alt="preview"
                  style={{ maxHeight: 200 }}
                />
              ) : (
                <img
                  alt={product?.name}
                  src={product?.imageUrl}
                  style={{ maxHeight: 200 }}
                />
              )}
            </Box>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button onClick={cancelEdit} variant="contained" color="inherit">
            Cancelar
          </Button>

          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="success"
          >
            Enviar
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};
