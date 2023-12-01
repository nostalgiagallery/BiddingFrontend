import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  loginUser,
  signOut,
  checkAuth,
  updateUser,
  resetPasswordRequest,
  resetPassword,
} from "./authAPI";

const initialState = {
  LoggedInUser: null,
  status: "idle",
  error: null,
  mailSent: false,
  passwordReset: false,
  authLoading: true,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async ({ loginInfo, alert }, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      alert.success("login successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const resetPasswordRequestAsync = createAsyncThunk(
  "auth/resetPasswordRequest",
  async (emailInfo) => {
    try {
      const response = await resetPasswordRequest(emailInfo);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (password) => {
    try {
      const response = await resetPassword(password);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signOutAsync = createAsyncThunk("auth/signOut", async (alert) => {
  const response = await signOut();
  alert.success("logout successfully");
  return response.data;
});

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async ({ user, alert }) => {
    const response = await updateUser(user);
    alert.success("user data updated successfully");
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    errorhandler: (state) => {
      state.error = null;
    },
    mailsentreset: (state) => {
      state.mailSent = false;
    },
    passwordstatusreset: (state) => {
      state.passwordReset = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = null;
      })
      .addCase(checkAuthAsync.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.authLoading = false;
        state.LoggedInUser = action.payload;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.LoggedInUser = null;
        state.authLoading = false;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
        state.mailSent = false;
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
      });
  },
});

export const selectLoggedinUser = (state) => state.auth.LoggedInUser;
export const selectError = (state) => state.auth.error;
export const selectStatus = (state) => state.auth.status;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectpasswordReset = (state) => state.auth.passwordReset;
export const selectauthLoading = (state) => state.auth.authLoading;

export const { errorhandler } = authSlice.actions;
export const { mailsentreset } = authSlice.actions;
export const { passwordstatusreset } = authSlice.actions;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default authSlice.reducer;
