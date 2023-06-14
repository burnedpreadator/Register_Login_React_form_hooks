import React, { Component } from "react";
import "./Home.css";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/loginAction";
import classNames from "classnames";

const fetchDetails = () => {
  return {
    type: "FETCH_DETAILS",
  };
};

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <form
      className="login__form"
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
    >
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
  );
};

class Login extends Component {
  componentDidMount() {
    this.props.fetchDetails();
  }
  handleSubmit = (userData) => {
    const { loginCredentials } = this.props;
    const matchedUser = loginCredentials.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    if (matchedUser) {
      this.props.loginUser([
        matchedUser.firstname,
        matchedUser.lastname,
        matchedUser.email,
      ]);
      const navigate = this.props.navigate;
      navigate("/details");
    } else {
      alert("invalid email or password");
      console.log("invalid user");
    }
  };
  render() {
    return (
      <div className="login">
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginCredentials: state.signup.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetails: () => dispatch(fetchDetails()),
    loginUser: (Credentials) => dispatch(loginUser(Credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(function (props){
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
});
