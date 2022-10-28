import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getBlogDetails } from "../../store/features/blog/blogSlice";
import { Markup } from "interweave";

import globalClass from "../../public/css/global.module.css";
import blogDetailClasses from "../../public/css/blogDetails.module.css";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const [blog, setBlog] = useState({});
  const [searchParams, setSearchParams] = useSearchParams({});
  const blogId = searchParams.get("blog");

  useEffect(() => {
    dispatch(getBlogDetails({ blogId })).then(({ payload }) => {
      setBlog(payload.blog);
    });
  }, [blogId]);
  return (
    <main className={globalClass.container}>
      <div>
        <div className={blogDetailClasses.image}>
          <img src={blog.imageUrl} alt={blog.title} />
        </div>
        <h1>{blog.title}</h1>
        <Markup content={blog.blogContent} />
      </div>
    </main>
  );
};

export default BlogDetail;
