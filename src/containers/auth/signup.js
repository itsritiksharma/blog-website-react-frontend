import { useDispatch, useSelector } from "react-redux";
import { authSignup } from "../../store/features/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import classes from "../../public/css/auth.module.css";
import globalClasses from "../../public/css/global.module.css";

const Signup = () => {
  const [inputUsername, setInputUsername] = useState(null);
  const [inputEmail, setInputEmail] = useState(null);
  const [inputPassword, setInputPassword] = useState(null);

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const inputs = inputUsername && inputEmail && inputPassword;

  const usernameInputHandler = (event) => {
    event.preventDefault();
    setInputUsername(event.target.value);
  };
  const emailInputHandler = (event) => {
    event.preventDefault();
    setInputEmail(event.target.value);
  };
  const passwordInputHandler = (event) => {
    event.preventDefault();
    setInputPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    dispatch(authSignup({ name, email, password })).then((response) => {
      console.log(response.error);
      if (!response.error) {
        navigate("/auth/login");
      }
    });
  };

  useEffect(() => {
    isLoggedIn && navigate("/");
    // navigate("/");
  }, [isLoggedIn, navigate]);
  return (
    <main className={classes.container}>
      <div className={classes.dashboard}>
        <div className={classes.auth}>
          <div className={classes.heading}>
            <h1>Signup</h1>
          </div>
          <hr></hr>
          {!isLoggedIn ? (
            <div className={classes.auth_form}>
              <form onSubmit={submitHandler}>
                {/* <label for="name">User name:</label> */}
                <input
                  ref={nameRef}
                  name="name"
                  type="text"
                  placeholder="Username"
                  onChange={usernameInputHandler}
                />

                {/* <label for="email">Email:</label> */}
                <input
                  ref={emailRef}
                  name="email"
                  type="text"
                  placeholder="Email"
                  onChange={emailInputHandler}
                  // onChange={onEmailChangeHandler}
                />

                {/* <label for="password">Password:</label> */}
                <input
                  ref={passwordRef}
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={passwordInputHandler}
                  // onChange={onPasswordChangeHandler}
                />
                <button
                  className={
                    inputs ? globalClasses.btn : globalClasses.disabled
                  }
                  type="submit"
                >
                  Signup
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h1> You are already logged in!</h1>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Signup;
