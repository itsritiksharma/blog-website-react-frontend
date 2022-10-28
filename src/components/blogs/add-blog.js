import { useDispatch, useSelector } from "react-redux";

import { useRef } from "react";

import { addBlog } from "../../store/features/blog/blogSlice";

const AddBlog = () => {
  const titleRef = useRef("");
  const contentRef = useRef("");
  const imageUrlRef = useRef("");

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const submitHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const imageUrl = imageUrlRef.current.value;
    dispatch(addBlog({ title: title, content: content, imageUrl: imageUrl }));
  };

  return (
    <div>
      {!isLoggedIn ? (
        <form onSubmit={submitHandler}>
          <input
            ref={titleRef}
            name="title"
            type="text"
            // onChange={onEmailChangeHandler}
          />
          <textarea
            ref={contentRef}
            name="blogContent"
            // onChange={onPasswordChangeHandler}
          ></textarea>
          <input ref={imageUrlRef} name="imageUrl" type="text" />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h1> You are already logged in!</h1>
        </div>
      )}
    </div>
  );
};

export default AddBlog;
