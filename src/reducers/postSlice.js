// src/reducers/postSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../AxiosInstance';

const initialState = {
  entity: null,
  loading: false,
  error: null,
};

// Updated fetchPosts to accept filter parameters
export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (filters = {}) => {
    try {
      const response = await axiosInstance.get('/image/get', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
