import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { router } from "../../router/Routes";
import { setBasket } from "./basketSlice";
import { User } from "../../models/user";

export interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const loginAsync = createAsyncThunk<User, FieldValues>(
  "account/login",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDto = await agent.Account.getCurrentUser();
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      router.navigate("/");
    },
    setUser: (state, action) => {
      const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
      const roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("Sesión expirada - Inicia sesión de nuevo.");
      router.navigate("/");
    });
    builder.addMatcher(
      isAnyOf(loginAsync.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
        const roles =
          claims[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        state.user = {
          ...action.payload,
          roles: typeof roles === "string" ? [roles] : roles,
        };
      }
    );
    builder.addMatcher(isAnyOf(loginAsync.rejected), (_state, action) => {
      throw action.payload;
    });
  },
});

export const { logout, setUser } = accountSlice.actions;
