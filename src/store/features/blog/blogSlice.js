import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { HTTP_STATUS, API_URL } from "../../../utils/constants";

const namespace = "blogs";

const initialState = {
  loading: null,
  blogs: [],
};

export const addBlog = createAsyncThunk(`/${namespace}`, async (blogData) => {
  const userId = blogData.userId;
  const blog = JSON.stringify({
    title: blogData.title,
    blogContent: blogData.content,
    imageUrl: blogData.imageUrl,
    token: blogData.token,
  });
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${blogData.token}`,
  };
  const response = await axios.post(`${API_URL}/${userId}/add-blog`, blog, {
    headers,
  });

  return response.data;
});

export const fetchBlogs = createAsyncThunk(`/${namespace}`, async () => {
  console.log("fetching blogs...");
  const response = await axios.get(`${API_URL}`);
  return response.data.blogs;
});

export const getBlogDetails = createAsyncThunk(
  `/${namespace}`,
  async ({ blogId }) => {
    const response = await axios.get(`${API_URL}/blog-detail?blog=${blogId}`);
    return response.data;
  }
);

const blogSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    // addBlog(state, action) {
    //   state.blogs = action.blog;
    //   return state;
    // },
    // fetchBlogs(state) {},
    // deleteBlog(state, action) {
    //   state.blogs = state.blogs.filter((blog) => {
    //     return blog !== action.blog;
    //   });
    //   return state;
    // },
    // editBlog(state, action) {},
  },
  extraReducers: {
    [addBlog.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [addBlog.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.blogs.push(payload);
    },
    [addBlog.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
    [fetchBlogs.pending](state) {
      state.loading = true;
      // state.loading = HTTP_STATUS.PENDING;
    },
    [fetchBlogs.fulfilled](state, { payload }) {
      // state.loading = HTTP_STATUS.FULFILLED;
      state.loading = false;
      console.log(payload);
      if (payload) {
        state.blogs.push(payload);
        // state.blogs.push([...state.blogs, ...payload]);
        return state;
      }
      state.blogs = [];
    },
    [fetchBlogs.rejected](state) {
      // state.loading = HTTP_STATUS.REJECTED;
      state.loading = false;
    },
    [getBlogDetails.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [getBlogDetails.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      if (payload) {
        state.blogs.push(payload);
        return state;
      }
      state.blogs = [];
    },
    [getBlogDetails.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
  },
});

export default blogSlice.reducer;
