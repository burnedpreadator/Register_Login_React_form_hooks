import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const history = useNavigate();
  return (
    <div class="wrapper">
      <p>
        <span>404</span>Oops, Sorry
      </p>
    </div>
  );
};

export default Error;
