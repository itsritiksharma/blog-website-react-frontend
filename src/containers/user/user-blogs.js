import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBlogs } from "../../store/features/user/userSlice";
import localDb from "../../utils/localDb";

const UserBlogs = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.user.userBlogs);
  const user = useSelector((state) => state.auth.userData[0]);
  const [userBlogs, setUserBlogs] = useState(blogs);
  const userId = user ? user.id : null;

  // console.log("token", token, "userId", userId);

  useEffect(() => {
    localDb
      .collection("user")
      .get()
      .then((user) => {
        if (!user) {
          return;
        }
        return user[0].token;
      })
      .then((token) => {
        if (!token) {
          return setUserBlogs(blogs);
        }
        dispatch(fetchUserBlogs({ userId, token })).then((data) => {
          setUserBlogs(data.payload.blogs);
        });
      });
  }, [dispatch]);

  return (
    <Fragment>
      <div>
        {userBlogs &&
          userBlogs.map((userBlog) => {
            return (
              <div key={userBlog._id}>
                <header>{userBlog.title}</header>
                {/* <main>
                  <p>{userBlog.imageUrl}</p>
                  <p>{userBlog.blogContent}</p>
                </main> */}
              </div>
            );
          })}
        {!userBlogs && <h1>No blogs to show!</h1>}
      </div>
    </Fragment>
  );
};

export default UserBlogs;
