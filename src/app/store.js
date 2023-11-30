import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import registersSlice from "../features/register/registerSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products:productReducer,
    registers:registersSlice
  },
});
