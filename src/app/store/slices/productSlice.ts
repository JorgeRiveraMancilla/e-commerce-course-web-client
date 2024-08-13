import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { MetaData } from "../../models/metaData";
import { Product } from "../../models/product";
import { ProductParams } from "../../models/productParams";
import { RootState } from "../configureStore";
import { AxiosError, AxiosResponse } from "axios";

export interface ProductState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: ProductParams;
  metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
  const params = new URLSearchParams();

  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy);

  if (productParams.searchTerm)
    params.append("searchTerm", productParams.searchTerm);

  if (0 < productParams.types.length)
    params.append("types", productParams.types.toString());

  if (0 < productParams.brands.length)
    params.append("brands", productParams.brands.toString());

  return params;
}

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("product/fetchProductsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().product.productParams);

  try {
    const response = await agent.Product.getAll(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const { data } = axiosError.response as AxiosResponse;
    return thunkAPI.rejectWithValue(data);
  }
});

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "product/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      const product = await agent.Product.getOne(productId);
      return product;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { data } = axiosError.response as AxiosResponse;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const fetchFiltersAsync = createAsyncThunk(
  "product/fetchFilters",
  async (_, thunkAPI) => {
    try {
      return agent.Product.getFilters();
    } catch (error: unknown) {
      console.log(error);
      const axiosError = error as AxiosError;
      const { data } = axiosError.response as AxiosResponse;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

function initParams(): ProductParams {
  return {
    pageNumber: 1,
    pageSize: 6,
    orderBy: "name",
    brands: [],
    types: [],
  };
}

export const productSlice = createSlice({
  name: "product",
  initialState: productsAdapter.getInitialState<ProductState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
    setProduct: (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.productsLoaded = false;
    },
    removeProduct: (state, action) => {
      productsAdapter.removeOne(state, action.payload);
      state.productsLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      (state.status = "idle"), (state.productsLoaded = true);
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.status = "idle";
      state.filtersLoaded = true;
    });
    builder.addCase(fetchFiltersAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
} = productSlice.actions;

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.product
);
