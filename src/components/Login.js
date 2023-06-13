import React, { Component } from "react";
import "./Home.css";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import {login} from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { loginUser } from "../actions/loginAction";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const history = useNavigate();

  const users = useSelector((state) => state.signup.users);
  console.log("user is undefined: "+ users);

  const onSubmit = (userData) => {
    // // const key = email;

    // // const getuserArr = localStorage.getItem(key);

    // // dispatch(
    // //   login({
    // //     email: email,
    // //     password: password
    // //   })
    // // );
    
    // // if(getuserArr && getuserArr.length){
    // //     const userdata = JSON.parse(getuserArr);
    // //     const userlogin = userdata.filter((el, k) => {
    // //         return el.email === email && el.password === password
    // //     });
    // //     if(userlogin.length === 0) {
    // //         alert("invalid login");
    // //     }else{
    // //         console.log("user login successful");
    // //         localStorage.setItem("user_login", JSON.stringify(userlogin));
    // //         history("/details")
    // //     }
    // // }
    // const {email, password} = data;
    // // dispatch(loginUser(data, history));

    // // axios
    // //   .get('https://reqres.in/api/users?email=' + email)
    // //   .then((response) => {
    // //     // Handle successful login
    // //     console.log("user found");
    // //     const users = response.data.data;
    // //     console.log(users);
    // //     dispatch(loginUserSuccess(response.data));
    // //     const matchingUser = users.find((user) => user.email === email);
        
    // //     if (matchingUser && matchingUser.password === password) {
    // //       // Login successful
    // //       dispatch(loginUserSuccess(matchingUser));
    // //       console.log('User logged in successfully:', matchingUser);
    // //       history('/details');
    // //     } else {
    // //       // Invalid credentials
    // //       dispatch(loginUserFailure('Invalid email or password'));
    // //     }
    // //   })
    // //   .catch((error) => {
    // //     console.log("user not found")
    // //     // Handle login error
    // //     dispatch(loginUserFailure(error.message));
    // //   });
    
    const matchedUser = users.find(
      (user) => user.email === userData.email && user.password === userData.password
    );
    if(matchedUser){
      dispatch(loginUser([matchedUser.firstname, matchedUser.lastname, matchedUser.email, matchedUser.password]));
      history('/details');
    }else{
      console.log('invalid user');
    }
  }
  
  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login Here</h1>
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
          name="password"
          className={classNames("form-control", {
            "is-invalid": errors.password,
          })}
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 20,
          })}
          //   ref={register}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
        <button type="submit" className="submit__btn">
          Login
        </button>
        <span className="existing_user">
          Dont have an account? <NavLink to="/">Register</NavLink>
        </span>
      </form>
    </div>
  );
};

export default Login;
