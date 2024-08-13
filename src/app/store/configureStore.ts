import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { productSlice } from "./slices/productSlice";
import { basketSlice } from "./slices/basketSlice";
import { accountSlice } from "./slices/accountSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    basket: basketSlice.reducer,
    account: accountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
