// src/reducers/UserSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance";

const initialState = {
  _id: "",
  profile: "",
  name: "",
  email: "",
  phone: "",
  followers: [],
  following: [],
};

export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (userId) => {
    const response = await axiosInstance.get(`/client/get`, {
      params: { id: userId },
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.profile = action.payload.profile;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
    },
    getUser: (state) => state,
    logOut: (state) => {
      state.email = "";
      // additional logic for clearing user state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
    });
  },
});

export const { setUser, getUser, logOut } = userSlice.actions;
export default userSlice.reducer;
