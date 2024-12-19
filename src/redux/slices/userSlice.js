import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
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

// Thunk để tạo người dùng mới
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk để lấy thông tin chi tiết người dùng
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
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

// Thunk để xóa người dùng
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userDetail: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu lỗi vào state
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu lỗi vào state
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu lỗi vào state
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu lỗi vào state
      });
  },
});

// Thunk để tạo người dùng mới
export const createUserAdmin = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        userData,
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

export default userSlice.reducer;
