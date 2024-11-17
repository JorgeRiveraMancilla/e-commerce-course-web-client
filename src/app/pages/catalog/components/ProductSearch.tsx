import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/configureStore";
import { setProductParams } from "../../../store/slices/productSlice";

export const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <TextField
      label="Buscar producto"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
};
