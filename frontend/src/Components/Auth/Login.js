import { Link, Redirect } from "react-router-dom";
import { login } from "./authAPI";
import React, { useState, useContext } from "react";
import { AppContext } from "../Common/AppContext";

const defaultAuth = {
  username: "",
  password: "",
};

export default function Login() {
  const [auth, setAuth] = useState(defaultAuth);
  const { token, storeAuth } = useContext(AppContext);

  async function onSubmit(e) {
    e.preventDefault();
    const APIresponse = await login(auth);
    const { success, token, error } = APIresponse;
    if (success) {
      storeAuth({ user: null, token });
    } else if (error) {
      console.log("Error logging in");
    }
  }

  function onChange(e) {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  }

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={onChange}
              value={auth.username}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={onChange}
              value={auth.password}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
