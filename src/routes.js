import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes as Switch, Route } from "react-router-dom";
import App from "./App";

import "./public/css/navbar.css";

import { getUser } from "./store/features/auth/authSlice";

import Signup from "./containers/auth/signup";
import Login from "./containers/auth/login";
import ErrorPage from "./pages/errorPage";
import Navigation from "./components/navigation";
import AddBlog from "./containers/blogs/add-blog";
import UserBlogs from "./containers/user/user-blogs";
import localDb from "./utils/localDb";
import BlogDetail from "./containers/blogs/blog-detail";

const Routes = () => {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  localDb
    .collection("user")
    .limit(1)
    .orderBy("key", "desc")
    .get({ keys: true })
    .then((user) => {
      if (user[0]) {
        setToken(user[0].data.token);
      }
    });

  if (token) {
    dispatch(getUser(token)).then(() => {
      setIsLoggedIn(true);
    });
  }

  return (
    <Fragment>
      <Navigation />
      <Switch>
        <Route path="/" exact element={<App />} />
        <Route path="/blog-detail" exact element={<BlogDetail />} />

        {/* AUTH ROUTES */}
        <Route path="/auth/signup" exact element={<Signup />} />
        <Route path="/auth/login" exact element={<Login />} />
        {/* //////////////////// */}

        {/* USER ROUTES */}
        {isLoggedIn && !!token && (
          <Route path="/:userId/add-blog" exact element={<AddBlog />} />
        )}
        {isLoggedIn && !!token && (
          <Route path="/user/:userId/blogs" exact element={<UserBlogs />} />
        )}
        {/* //////////////////// */}

        <Route path="*" exact element={<ErrorPage />} />
        {/* <Route path="/login" exact render={(props) => <Login {...props} />} /> */}
        {/* <PrivateRoute path="/about" exact component={About} />
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/practices" exact component={Practices} />
      <PrivateRoute path="/solutions" exact component={Solutions} />
      <PrivateRoute path="/explore" exact component={Explore} />
      <PrivateRoute path="/videos" exact component={Videos} />
      <PrivateRoute path="/quiz" exact component={Quiz} /> */}
        {/* <Route
        path="/404"
        exact
        render={(props) => <FourZeroFour {...props} />}
      />
      <Route
        path="/403"
        exact
        render={(props) => <FourZeroThree {...props} />}
      /> */}
        {/* <PrivateRoute path="/recommendation" exact component={Recommendation} />
      <PrivateRoute path="/downloads" exact component={Downloads} />
      <PrivateRoute path="/supports" exact component={Supports} />
      <PrivateRoute path="/joiners" exact component={Joiners} />
      <PrivateRoute path="/tadkashow" exact component={TadkaShow} />
      <PrivateRoute path="/tadkapoints" exact component={TadkaPoints} />
      <PrivateRoute path="/iad" exact component={Iad} /> */}
      </Switch>
    </Fragment>
  );
};

export default Routes;
