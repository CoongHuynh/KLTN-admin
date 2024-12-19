import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch the list of brands
export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/brands`,
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

// Async thunk to add a new brand
export const addBrand = createAsyncThunk(
  "brands/addBrand",
  async (brandData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/brands`,
        brandData,
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

// Async thunk to update an existing brand
export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async ({ id, brandData }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/brands/${id}`,
        brandData,
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

// Async thunk to delete a brand
export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/brands/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch brands by category
export const fetchBrandsByCategory = createAsyncThunk(
  "brands/fetchBrandsByCategory",
  async (categoryId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.user.token;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/brands/category/${categoryId}`,
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

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands.push(action.payload);
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.brands.findIndex(
          (brand) => brand._id === action.payload._id
        );
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload
        );
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBrandsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrandsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brandSlice.reducer;
