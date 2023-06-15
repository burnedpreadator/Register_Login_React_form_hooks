import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import "./Error.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/loginAction";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const userlogout = () => {
    dispatch(logoutUser());
    history("/login");
  };

  const user = useSelector((state)=>state.signup.users)
  const username = useSelector((state)=>state.login.currentuser);

  let button;
  let Title;
  if(window.location.pathname === '/' && user){
    button = 
    <NavLink to="/login" className="navlinks">Login</NavLink>
    Title = <>Register</>;
  }
  else if(window.location.pathname === '/details' && user){
    button = 
    <button onClick={userlogout} className="navlinks">Logout</button>
    Title = <>Details page</>;
  }else if (window.location.pathname === '/login' && user){
    Title = <>Login</>;
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            {Title}
          </Navbar.Brand>
          {button}
        </Container>
        <Form className="d-flex">
          {/* <Button onClick={userlogout} variant="outline-success" className="button-nav">
            LogOut
          </Button> */}
        </Form>
      </Navbar>
    </>
  );
};

export default Header;
