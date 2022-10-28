import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { HTTP_STATUS, API_URL } from "../../../utils/constants";

const namespace = "user";

const initialState = {
  loading: null,
  userBlogs: [],
};

// const http = axios.create({
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${user.token}`,
//   },
// });

export const fetchUserBlogs = createAsyncThunk(
  `/${namespace}`,
  async (user) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    const response = await axios.get(`${API_URL}/user/${user.userId}/blogs`, {
      headers,
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserBlogs.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchUserBlogs.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.userBlogs = payload.blogs;
      return state;
    },
    [fetchUserBlogs.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
      return state;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
