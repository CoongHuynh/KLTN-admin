import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Thêm các async thunk mới vào đầu file
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePostOffice = createAsyncThunk(
    "orders/updatePostOffice",
    async ({ id, post_office }, { rejectWithValue, getState }) => {
      try {
        const state = getState();
        const token = state.auth.user.token;
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/orders/${id}/post_office`,
            { post_office },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
);

export const updateOrderItems = createAsyncThunk(
    "orders/updateOrderItems",
    async ({ id, status }, { rejectWithValue, getState }) => {
      try {
        const state = getState();
        const token = state.auth.user.token;
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/orders/${id}/items`,
            { status },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Async thunk để lấy orders theo user ID
export const fetchOrdersByUserId = createAsyncThunk(
  "orders/fetchOrdersByUserId",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/orders/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu lỗi vào state
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
