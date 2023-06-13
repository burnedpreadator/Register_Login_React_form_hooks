import React, { useState, useRef } from "react";
import "./Home.css";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { signupUser } from "../actions/signUpActions";

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = useRef({});
  password.current = watch("password", "");

  // const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();

  const onSubmit = (data) => {

    const userData = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password
    }

    // localStorage.setItem(key, JSON.stringify([...userData, data]));
    // console.log(data);
    // axios
    //   .post('https://reqres.in/api/users', data)
    //   .then((response) => {
    //     console.log('User registered successfully:', response.data);
    //     dispatch(registerUserSuccess(response.data));
    //   })
    //   .catch((error) => {
    //     console.log('error');
    //     dispatch(registerUserFailure(error.message));
    //   });
    console.log(userData);
    dispatch(signupUser(userData));
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Register Here</h1>
        <input
          type="name"
          placeholder="first name"
          className={classNames("form-control", {
            "is-invalid": errors.firstname,
          })}
          name="firstname"
          {...register("firstname", {
            required: "this feild is required",
            maxLength: 20,
            minLength: { value: 4, message: "min 4 characters required" },
          })}
          //   ref={register}
        />
        {errors.firstname && (
          <div className="invalid-feedback">{errors.firstname.message}</div>
        )}
        <input
          type="name"
          placeholder="last name"
          name="lastname"
          {...register("lastname")}
          //   ref={register}
        />
        
        <input
          type="text"
          placeholder="Email"
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
          // ref={register}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
        
        <input
          type="password"
          placeholder="Password"
          className={classNames("form-control", {
            "is-invalid": errors.password,
          })}
          name="password"
          {...register("password", {
            required: "you must specify a password",
            minLength: {
              value: 8,
              message: "password must have atleast 8 characters"
            }
          })}
          //   ref={register}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
        
        <input
          type="password"
          className={classNames("form-control", {
            "is-invalid": errors.confirmpwd,
          })}
          placeholder="confirm password"
          name="confirmpwd"
          {...register("confirmpwd", {
            validate: value => value === password.current || "the password do not match"
          })}
          //   ref={register}
        />
        {errors.confirmpwd && (
          <div className="invalid-feedback">{errors.confirmpwd.message}</div>
        )}
        <button type="submit" className="submit__btn">
          Submit
        </button>
        <span className="existing_user">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </span>
      </form>
    </div>
  );
};

export default Home;

// onSubmit={(e) => handleSubmit(e)}
// onChange={(e) => setName(e.target.value)}  value={name}
// onChange={(e) => setEmail(e.target.value)} value={email}
// value={password} onChange={(e) => setPassword(e.target.value)}
