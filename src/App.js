import "./App.css";
import { Fragment } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import blogActions from "./store/actions/blogActions";
// import { fetchBlogs } from "./store/features/blog/blogSlice";
// import { useNavigate } from "react-router-dom";

import Blogs from "./containers/blogs/blogs";

const App = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/user/login");
  // });
  return (
    <Fragment>
      <Blogs />
    </Fragment>
  );
};

export default App;
