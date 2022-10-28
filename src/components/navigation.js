import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { authLogout } from "../store/features/auth/authSlice";
import localDb from "../utils/localDb";
import "../public/css/navbar.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const user = useSelector((state) => state.auth.userData[0]);
  const userId = user ? user.id : null;

  const logoutHandler = async (e) => {
    e.preventDefault();
    dispatch(authLogout()).then(() => {
      localDb.collection("user").doc({ userId: userId }).delete();
      setLoggedIn(!loggedIn);
      navigate("/");
    });
  };
  return (
    <nav className="main-navbar">
      <div className="main-navbar__div">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to={`${userId}/add-blog`}>Add blog</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to={`/user/${userId}/blogs`}>My blogs</NavLink>
            </li>
          )}
        </ul>
        <div className="profile-actions">
          {isLoggedIn && (
            <form onSubmit={logoutHandler}>
              <button className="btn btn-logout">Logout</button>
            </form>
          )}
          {!isLoggedIn && (
            <button className="btn">
              <Link to="/auth/login">Login</Link>
            </button>
          )}
          {!isLoggedIn && (
            <button className="btn">
              <Link to="/auth/signup">Signup</Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
