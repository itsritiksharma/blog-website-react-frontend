import { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Markup } from "interweave";
import isEqual from "react-fast-compare";

import blogSlice, {
  fetchBlogs,
  getBlogDetails,
} from "../../store/features/blog/blogSlice";

import globalClass from "../../public/css/global.module.css";
import blogClasses from "../../public/css/blogs.module.css";
import { Link } from "react-router-dom";
import Spinner from "../../components/Loader";

const Blogs = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs[0], shallowEqual);
  const isLoading = useSelector((state) => state.blog.loading);
  // const token = useSelector((state) => state.auth.token);
  const [allBlogs, setAllBlogs] = useState(blogs);
  // const userData = useSelector((state) => state.auth.userData);
  // const fetchBlogs = useCallback(())
  console.log(allBlogs);
  const fetchAllBlogs = useCallback(async () => {
    await dispatch(fetchBlogs()).then((result) => {
      setAllBlogs(result.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <main className={globalClass.container}>
      <div className={blogClasses.blog}>
        {allBlogs &&
          allBlogs.map((blog) => {
            return (
              <div className={blogClasses.card} key={blog._id}>
                <div className={blogClasses.card_content}>
                  <section className={blogClasses.blog_image}>
                    <img src={blog.imageUrl} alt={blog.title} />
                  </section>
                  <section className={blogClasses.blog_content}>
                    <h1>{blog.title}</h1>
                    <Markup content={blog.blogContent} />
                  </section>
                  <Link to={`/blog-detail?blog=${blog._id}`}>Detail</Link>
                  {/* <form onSubmit={onSubmitHandler}>
                    <input type="hidden" value={blog._id} />
                    <button type="submit" className={globalClass.btn}>
                      Details
                    </button>
                  </form> */}
                </div>
              </div>
            );
          })}
        {/* <header>{blogs[0].title ? blogs[0].title : "no data"}</header> */}
        {/* <header>{blogs.title}</header>
      <main>
        {blogs.imageUrl}
        {blogs.blogContent}
      </main> */}
      </div>
    </main>
  );
};

export default Blogs;
