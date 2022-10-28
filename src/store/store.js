import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./features/blog/blogSlice";
// import rootReducer from "./rootReducer";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: { blog: blogReducer, auth: authReducer, user: userReducer },
});

export default store;
