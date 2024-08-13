import {
  Box,
  debounce,
  Grid,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
  setProductParams,
  fetchFiltersAsync,
  fetchProductsAsync,
  setPageNumber,
  productSelectors,
} from "../../store/slices/productSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "../../models/product";
import { ProductList } from "./components/ProductList";
import { RadioButtonGroup } from "../../components/RadioButtonGroup";
import { CheckboxButtons } from "../../components/CheckboxButtons";
import { Loading } from "../../components/Loading";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

export const CatalogPage = () => {
  const products: Product[] = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) return <Loading />;

  const debouncedSearch = debounce(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setProductParams({ searchTerm: event.target.value }));
    },
    1000
  );

  const handlePageChange = (page: number) => {
    dispatch(setPageNumber(page));
  };

  const handleSearchProducts = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(event.target.value);
    debouncedSearch(event);
  };

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <TextField
            label="Buscar productos"
            variant="outlined"
            fullWidth
            value={searchTerm || ""}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleSearchProducts(event)}
          />
        </Paper>

        <Paper sx={{ p: 2, mb: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(event) =>
              dispatch(setProductParams({ orderBy: event.target.value }))
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: 3 }}
          >
            <Typography variant="body1">
              Mostrando {(metaData.currentPage - 1) * metaData.pageSize + 1}-
              {metaData.currentPage * metaData.pageSize > metaData.totalCount
                ? metaData.totalCount
                : metaData.currentPage * metaData.pageSize}{" "}
              de {metaData.totalCount} ítems
            </Typography>

            <Pagination
              color="secondary"
              size="large"
              count={metaData.totalPages}
              page={metaData.currentPage}
              onChange={(_e, page) => handlePageChange(page)}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
