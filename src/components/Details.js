import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Error.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/loginAction";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { LoginApi, RegisterApi } from "../actions/ApiCalls";

const Details = () => {
  const [logindata, setLoginData] = useState([]);
  const [registerSubmited, setRegisterSubmitted] = useState(false);
  const [loginSubmited, setLoginSubmitted] = useState(false);
  const [showRegister, SetRegister] = useState(false);
  const [showLogin, SetLogin] = useState(false);
  const history = useNavigate();

  const ShowRegister = () => {
    SetRegister(true);
    SetLogin(false);
  };
  const ShowLogin = () => {
    SetLogin(true);
    SetRegister(false);
  };

  // const data =
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const isloggedin = () => {
    const getuser = localStorage.getItem("user_login");
    if (getuser && getuser.length) {
      const user = JSON.parse(getuser);
      setLoginData(user);
    }
  };

  const onRegisterCall = (data) => {
    const email = data.registeremail;
    const password = data.registerpassword;
    console.log(data);

    console.log(email, password);
    axios
      .post("https://reqres.in/api/register", {
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch(RegisterApi(response.data));
        setRegisterSubmitted(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onLoginCall = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("https://reqres.in/api/login", data)
      .then((response) => {
        dispatch(LoginApi(response.data));
        setLoginSubmitted(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    isloggedin();
  }, []);

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.login.isLoggedIn);
  const userDetails = useSelector((state) => state.login.currentUser);
  const registerDetails = useSelector(
    (state) => state.RegisterApiCall.userRegistered
  );
  const loginDetails = useSelector((state) => state.LoginApiCall.userLogin);

  const userlogout = () => {
    dispatch(logoutUser());
    // localStorage.removeItem("user_login");
    history("/login");
  };
  const registerpassword = useRef({});
  registerpassword.current = watch("registerpassword", "");
  let ShowApi;
  if (showRegister) {
    ShowApi = 
    <div className="api_call">
    {registerSubmited ? (
      <div>
        <h1>Register Api Called</h1>
        <h1>ID: {registerDetails.id}</h1>
        <h1>TOKEN: {registerDetails.token}</h1>
      </div>
    ) : (
      <form
        className="login__form"
        onSubmit={handleSubmit(onRegisterCall)}
      >
        <button type="submit" className="api__btn">
          Register api
        </button>
        <input
          type="text"
          placeholder="Email"
          className={classNames("form-control", {
            "is-invalid": errors.registeremail,
          })}
          name="registeremail"
          value="eve.holt@reqres.in"
          {...register("registeremail", {
            required: "this feild is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "please enter a valid email",
            },
          })}
        />
        {errors.registeremail && (
          <div className="invalid-feedback">
            {errors.registeremail.message}
          </div>
        )}

        <input
          type="password"
          placeholder="Password"
          className={classNames("form-control", {
            "is-invalid": errors.registerpassword,
          })}
          value="pistol"
          name="registerpassword"
          {...register("registerpassword", {
            required: "you must specify a password",
            minLength: {
              value: 3,
              message: "password must have atleast 8 characters",
            },
          })}
        />
        {errors.registerpassword && (
          <div className="invalid-feedback">
            {errors.registerpassword.message}
          </div>
        )}

        <input
          type="password"
          className={classNames("form-control", {
            "is-invalid": errors.confirmregisterpwd,
          })}
          placeholder="confirm password"
          name="confirmregisterpwd"
          // value="pistol"
          {...register("confirmregisterpwd", {
            validate: (value) =>
              value === registerpassword.current ||
              "the password do not match",
          })}
        />
        {errors.confirmregisterpwd && (
          <div className="invalid-feedback">
            {errors.confirmregisterpwd.message}
          </div>
        )}
      </form>
    )}
    </div>;
  } else if(showLogin) {
    ShowApi = 
    <div className="api_call">
    {loginSubmited ? (
      <div>
        <h1>Login api called</h1>
        <h1>TOKEN:{loginDetails.token}</h1>
      </div>
    ) : (
      <form
        className="login__form"
        onSubmit={handleSubmit(onLoginCall)}
        errors={errors}
      >
        <button onClick={onLoginCall} className="api__btn">
          Login api
        </button>
        <input
          type="text"
          placeholder="Email"
          value="eve.holt@reqres.in"
          className={classNames("form-control", {
            "is-invalid": errors.email,
          })}
          name="email"
          {...register("email", {
            required: "this feild is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "please enter a valid email",
            },
          })}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value="cityslicka"
          className={classNames("form-control", {
            "is-invalid": errors.password,
          })}
          {...register("password", {
            required: true,
            minLength: 4,
            maxLength: 20,
          })}
        />
        {errors.password && (
          <div className="invalid-feedback">
            {errors.password.message}
          </div>
        )}
      </form>
    )}
    </div>;
  }

  if (loggedIn) {
    return (
      <div className="details">
        <h1>HI! {userDetails[0].toUpperCase()}</h1>
        <h2>YOU CAN MAKE REGISTER AND LOGIN API CALLS HERE</h2>
        <FontAwesomeIcon icon={faAngleDown} size="6x" />
        <div className="api_call">
          <button type="submit" className="api__btn" onClick={ShowRegister}>
            Register api
          </button>
          <button type="submit" className="api__btn" onClick={ShowLogin}>
            Login api
          </button>
        </div>
        {ShowApi}
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <p>
          <span>404</span>Oops, Sorry
        </p>
      </div>
    );
  }
};

export default Details;
