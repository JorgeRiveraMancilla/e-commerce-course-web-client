import { Grid, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
  setProductParams,
  setPageNumber,
} from "../../store/slices/productSlice";
import { ProductList } from "./components/ProductList";
import { RadioButtonGroup } from "../../components/RadioButtonGroup";
import { CheckboxButtons } from "../../components/CheckboxButtons";
import { Loading } from "../../components/Loading";
import { AppPagination } from "../../components/AppPagination";
import { useProducts } from "./hooks/useProducts";
import { ProductSearch } from "./components/ProductSearch";

const sortOptions = [
  { value: "name", label: "Alfabético" },
  { value: "price-desc", label: "Precio de mayor a menor" },
  { value: "price-asc", label: "Precio de menor a mayor" },
];

export const CatalogPage = () => {
  const { products, filtersLoaded, brands, types, metaData } = useProducts();
  const { productParams } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  if (!filtersLoaded) return <Loading message="Cargando productos..." />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>

        <Paper sx={{ p: 2, mb: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Paper>

        <Paper sx={{ p: 2, mb: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>

      <Grid item xs={3} />

      <Grid item xs={9} sx={{ mb: 2 }}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
};
