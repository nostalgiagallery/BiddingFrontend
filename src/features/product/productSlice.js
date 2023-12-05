import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  EditProduct,
  addProduct,
  fetchAllProducts,
  fetchProductById,
  addTicket,
} from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  error: null,
  selectedProduct: null,
  tickets: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();

    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);

    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await addProduct(product);

    return response.data;
  }
);

export const addTicketAsync = createAsyncThunk(
  "products/addTicket",
  async (ticket) => {
    const response = await addTicket(ticket);

    return response.data;
  }
);

export const EditProductAsync = createAsyncThunk(
  "products/EditProduct",
  async (product) => {
    const response = await EditProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(EditProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(EditProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products[index] = action.payload;
      })
      .addCase(addTicketAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTicketAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.tickets=action.payload;
      })
      .addCase(addTicketAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.products.products;
export const selectedProduct = (state) => state.products.selectedProduct;
export const selectStatus = (state) => state.products.status;

export default productSlice.reducer;
