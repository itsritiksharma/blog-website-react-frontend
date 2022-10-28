import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useNavigate } from "react-router";

import { HTTP_STATUS, API_URL } from "../../../utils/constants";
import localDb from "../../../utils/localDb";

const namespace = "auth";

const initialState = {
  loading: null,
  isAuthenticated: false,
  token: null,
  userData: [],
};

export const authSignup = createAsyncThunk(
  `/${namespace}/signup `,
  async (userData) => {
    const newUser = JSON.stringify({
      userName: userData.name,
      userEmail: userData.email,
      password: userData.password,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(`${API_URL}/auth/signup`, newUser, {
      headers,
    });
    console.log(response);
    return response.data;
  }
);

export const authLogin = createAsyncThunk(
  `/${namespace}/login`,
  async (data) => {
    const user = JSON.stringify({
      userEmail: data.email,
      password: data.password,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(`${API_URL}/auth/login`, user, {
      headers: headers,
    });
    return response.data;
  }
);

export const authLogout = createAsyncThunk(`/${namespace}/logout`, async () => {
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
});

export const getUser = createAsyncThunk(
  `/${namespace}/get-user`,
  async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${API_URL}/user`, { headers });
    return response.data;
  }
);

const authSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    // loggedIn(state) {
    //   state.isAuthenticated = true;
    // },
  },
  extraReducers: {
    [authSignup.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [authSignup.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      return state;
    },
    [authSignup.rejected](state, { error }) {
      state.loading = HTTP_STATUS.REJECTED;
      return state;
    },

    [authLogin.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [authLogin.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.isAuthenticated = !!payload.token;
      state.token = payload.token;
      // state.message = payload.message;
      state.userData.push({ id: payload.userId, email: payload.userEmail });
      return state;
    },
    [authLogin.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
      return state;
    },

    [authLogout.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [authLogout.fulfilled](state) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.isAuthenticated = false;
      state.token = null;
      state.userData = [];
      return state;
    },
    [authLogout.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
      return state;
    },
    [getUser.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [getUser.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.isAuthenticated = !!payload.user;

      // const token = localDb
      //   .collection("user")
      //   .limit(1)
      //   .orderBy("keys", "desc")
      //   .get({ keys: true })
      //   .then((user) => {
      //     console.log(user[0].data.token);
      //   });

      state.token = payload.token;
      state.userData = [
        {
          id: payload.user._id,
          email: payload.user.userEmail,
        },
      ];
      return state;
    },
    [getUser.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
      return state;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
