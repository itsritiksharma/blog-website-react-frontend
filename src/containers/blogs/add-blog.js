import { useDispatch, useSelector } from "react-redux";

import { useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router";

import { addBlog, fetchBlogs } from "../../store/features/blog/blogSlice";
import Editor from "../../components/TextEditor";

import globalClasses from "../../public/css/global.module.css";
import formClasses from "../../public/css/forms.module.css";

const AddBlog = () => {
  const [textInput, setTextInput] = useState("");
  const titleRef = useRef("");
  // const contentRef = useRef("");
  const imageUrlRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.userData[0]);
  const userId = user ? user.id : null;

  const editorHandler = useCallback((editorData) => {
    setTextInput(editorData);
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const content = textInput;
    const imageUrl = imageUrlRef.current.value;
    dispatch(
      addBlog({
        title: title,
        content: content,
        imageUrl: imageUrl,
        userId: userId,
        token,
      })
    )
      .then(dispatch(fetchBlogs()))
      .then(() => {
        navigate("/");
      });
  };

  return (
    <main className={globalClasses.container + " " + formClasses.main}>
      <div className={formClasses.form}>
        {isLoggedIn ? (
          <form onSubmit={submitHandler}>
            <label for="title">Title:</label>
            <input
              ref={titleRef}
              name="title"
              type="text"
              // onChange={onEmailChangeHandler}
            />
            <label for="blogContent">Content:</label>
            <div className={formClasses.textarea}>
              <Editor onInput={editorHandler} name="blogContent" />
            </div>
            {/* <textarea
            ref={contentRef}
            name="blogContent"
            // onChange={onPasswordChangeHandler}
          ></textarea> */}
            <label for="imageUrl">Image:</label>
            <input ref={imageUrlRef} name="imageUrl" type="text" />
            <button type="submit">Add Blog</button>
          </form>
        ) : (
          <div>
            <h1> You are not logged in!</h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default AddBlog;
