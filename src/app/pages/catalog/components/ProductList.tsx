import { Grid } from "@mui/material";
import { Product } from "../../../models/product";
import { useAppSelector } from "../../../store/configureStore";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

export const ProductList = ({ products }: Props) => {
  const { productsLoaded } = useAppSelector((state) => state.product);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};
