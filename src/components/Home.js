import React, { Component, useRef } from "react";
import "./Home.css";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signupUser } from "../actions/signUpActions";

const fetchDetails = () => {
  return {
    type: "FETCH_DETAILS",
  };
};

const RegisterForm = ({ onSubmit }) => {
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

  return (
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
      />
      {errors.firstname && (
        <div className="invalid-feedback">{errors.firstname.message}</div>
      )}
      <input
        type="name"
        placeholder="last name"
        name="lastname"
        {...register("lastname")}
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
            message: "password must have atleast 8 characters",
          },
        })}
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
          validate: (value) =>
            value === password.current || "the password do not match",
        })}
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
  );
};

class Home extends Component {
  componentDidMount() {
    this.props.fetchDetails();
  }

  handleSubmit = (data) => {
    const userData = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    };
    this.props.signupUser(userData);
    this.props.navigate("/login");
  };
  render() {
    return (
      <div className="login">
        <RegisterForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetails: () => dispatch(fetchDetails()),
    signupUser: (Credentials) => dispatch(signupUser(Credentials)),
  };
};

export default connect(null, mapDispatchToProps)(function (props) {
  const navigate = useNavigate();
  return <Home {...props} navigate={navigate} />;
});
