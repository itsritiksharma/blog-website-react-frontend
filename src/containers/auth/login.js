import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../store/features/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import localDb from "../../utils/localDb";
import classes from "../../public/css/auth.module.css";
import globalClasses from "../../public/css/global.module.css";

const Login = () => {
  const [inputEmail, setInputEmail] = useState(null);
  const [inputPassword, setInputPassword] = useState(null);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const emailInputHandler = (event) => {
    event.preventDefault();
    setInputEmail(event.target.value);
  };
  const passwordInputHandler = (event) => {
    event.preventDefault();
    setInputPassword(event.target.value);
  };

  const inputs = inputEmail && inputPassword;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (inputs) {
      // setInputEmai(inputEmail) =
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const user = await dispatch(
        authLogin({ email: email, password: password })
      );
      if (user.payload) {
        localDb.collection("user").add({
          userId: user.payload.userId,
          userEmail: user.payload.userEmail,
          token: user.payload.token,
        });
      }
      // dispatch(authLogin({ email: email, password: password })).then((data) => {
      //   console.log(data);
      //   localDb.collection("user").add({
      //     userId: data.payload.userId,
      //     userEmail: data.payload.userEmail,
      //     token: data.payload.token,
      //   });
      // });
    } else {
      return false;
    }
    // dispatch(authActions.loggedIn());
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
            <h1>Login</h1>
          </div>
          <hr></hr>
          {!isLoggedIn ? (
            <div className={classes.auth_form}>
              <form onSubmit={submitHandler} noValidate>
                <input
                  ref={emailRef}
                  onChange={emailInputHandler}
                  name="email"
                  type="email"
                  placeholder="Email"
                  // onChange={onEmailChangeHandler}
                />
                <input
                  ref={passwordRef}
                  name="password"
                  type="password"
                  onChange={passwordInputHandler}
                  placeholder="Password"
                  // onChange={onPasswordChangeHandler}
                />
                <button
                  className={
                    inputs ? globalClasses.btn : globalClasses.disabled
                  }
                  type="submit"
                >
                  Login
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

export default Login;
