import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function onChange(e) {
    const id = e.target.id;
    const value = e.target.value;
    setFormValue({ ...formValue, [id]: value });
  }

  return (
    <div className="container login-container mt-5" >
      <div>
        <http><img className="loginImg" src="https://wallpapers.com/images/hd/free-travel-wallpaper-1080p-6wuqvdkljh7mz54r.jpg"/></http>
      </div>
      <form className="row g-3 border border-lightgray bg-light">
        <div className="py-2 bg-light border-bottom border-lightgray mt-0 text-center">
          <h2>Login</h2>
        </div>
        <div className="col-md-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={onChange}
            value={formValue.email}
            type="email"
            className="form-control"
            placeholder="Enter email"
            id="email"
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={formValue.password}
            type="password"
            className="form-control"
            placeholder="Enter password"
            id="password"
          />
        </div>
        <div className="col-md-12">
          {/* Link to the forgotpassword page */}
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
        <br />
        <br />
        <button
          type="button"
          // Assuming 'actions' is defined elsewhere in your code
          // and contains the 'login' function
          onClick={() => actions.login(formValue, navigate)}
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
