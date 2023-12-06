import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UpdateRegister,
  addRegister,
  fetchallmessages,
  fetchtopBidders,
  findRegister,
  findallRegister,
} from "./registerAPI";

const initialState = {
  registers: [],
  topbidders:[],
  selectedRegister: null,
  status: "idle",
  error: null,
  messages: [],
  registersStatus:false
};

export const addRegisterAsync = createAsyncThunk(
  "registers/fetchCount",
  async (register) => {
    const response = await addRegister(register);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const findRegisterAsync = createAsyncThunk(
  "registers/findRegister",
  async (userProduct) => {
    const response = await findRegister(userProduct);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const UpdateRegisterAsync = createAsyncThunk(
  "registers/UpdateRegister",
  async (register) => {
    const response = await UpdateRegister(register);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchtopBiddersAsync = createAsyncThunk(
  "registers/fetchtopBidders",
  async (id) => {
    const response = await fetchtopBidders(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchallmessagesAsync = createAsyncThunk(
  "registers/fetchallmessages",
  async (id) => {
    const response = await fetchallmessages(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const findallRegisterAsync = createAsyncThunk(
  "registers/findallRegister",
  async (user) => {
    const response = await findallRegister(user);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const registersSlice = createSlice({
  name: "registers",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRegisterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRegisterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.registers.push(action.payload);
      })
      .addCase(addRegisterAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(findallRegisterAsync.pending, (state) => {
        state.status = "loading";
        state.registersStatus=true;
      })
      .addCase(findallRegisterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.registers = action.payload;
        state.registersStatus=false;
      })
      .addCase(findallRegisterAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.registersStatus=false;
      })
      .addCase(findRegisterAsync.pending, (state) => {
        state.status = "loading";
        state.selectedRegister =null;
      })
      .addCase(findRegisterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedRegister = action.payload;
      })
      .addCase(findRegisterAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(UpdateRegisterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateRegisterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.registers.findIndex(
          (item) => item.id === action.payload.id
        );
        state.registers[index] = action.payload;
        state.selectedRegister = action.payload;
      })
      .addCase(fetchtopBiddersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchtopBiddersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.topbidders = action.payload;
      })
      .addCase(fetchtopBiddersAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchallmessagesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchallmessagesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.messages = action.payload;
      })
      .addCase(fetchallmessagesAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectedregister = (state) => state.registers.selectedRegister;
export const selectedTopBidders = (state) => state.registers.topbidders;
export const selectedallregisters = (state) => state.registers.registers;
export const Registerstatus = (state) => state.registers.status;
export const selectedallmessages = (state) => state.registers.messages;
export const selectedregistersStatus=(state) => state.registers.registersStatus;
export default registersSlice.reducer;
