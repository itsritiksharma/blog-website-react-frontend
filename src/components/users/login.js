import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../store/features/auth/authSlice";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(authUser({ email: email, password: password }));
    // dispatch(authActions.loggedIn());
  };

  useEffect(() => {
    isLoggedIn && navigate("/");
    // navigate("/");
  }, [isLoggedIn, navigate]);
  return (
    <div>
      {!isLoggedIn ? (
        <form onSubmit={submitHandler}>
          <input
            ref={emailRef}
            name="email"
            type="email"
            // onChange={onEmailChangeHandler}
          />
          <input
            ref={passwordRef}
            name="password"
            type="password"
            // onChange={onPasswordChangeHandler}
          />
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

export default Login;
