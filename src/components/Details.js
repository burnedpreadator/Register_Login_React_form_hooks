import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css"
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

const Details = () => {
  const [logindata, setLoginData] = useState([]);
  const history = useNavigate();

  const isloggedin = () => {
    const getuser = localStorage.getItem("user_login");
    if (getuser && getuser.length) {
      const user = JSON.parse(getuser);
      setLoginData(user);
    }
  };
  useEffect(() => {
    isloggedin();
  }, []);
  
  const dispatch = useDispatch();

  const userlogout = () => {
    dispatch(logout());
    localStorage.removeItem("user_login");
    history("/");
  };

  return (
    <>
      {logindata.length === 0 ? (
        <div className="wrapper">
          <p>
            <span>404</span>Oops, Sorry
          </p>
        </div>
      ) : (
        <div className="details">
          <h1>HI! {logindata[0].firstname.toUpperCase()}</h1>
          <button onClick={userlogout} className="submit__btn">LogOut</button>
        </div>
      )}
    </>
  );
};

export default Details;
