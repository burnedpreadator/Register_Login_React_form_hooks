import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/loginAction";

const Details = () => {
  // const [logindata, setLoginData] = useState([]);
  const history = useNavigate();

  // const isloggedin = () => {
  //   const getuser = localStorage.getItem("user_login");
  //   if (getuser && getuser.length) {
  //     const user = JSON.parse(getuser);
  //     setLoginData(user);
  //   }
  // };
  // useEffect(() => {
  //   isloggedin();
  // }, []);

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.login.isLoggedIn);
  const userDetails = useSelector((state) => state.login.currentUser);

  const userlogout = () => {
    dispatch(logoutUser());
    // localStorage.removeItem("user_login");
    history("/login");
  };

  if (loggedIn) {
    return (
      <div className="details">
        <h1>HI! {userDetails[0]}!  YOU CAN MAKE REGISTER AND LOGIN API CALLS HERE</h1>
        
        <button onClick={userlogout} className="submit__btn">
          LogOut
        </button>
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
