import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "./authAPI";
import { AppContext } from "../Common/AppContext";

const defaultAuth = {
  email: "",
  password: "",
  password2: "",
};

export default function Register() {
  const [auth, setAuth] = useState(defaultAuth);
  const { isAuthenticated, storeAuth } = useContext(AppContext);

  async function onSubmit(e) {
    e.preventDefault();
    let APIresponse = await register(auth);
    const { success, token, error } = APIresponse;
    if (success) {
      storeAuth({ user: null, token });
    } else if (error) {
      console.log("Error registering user");
    }
  }

  function onChange(e) {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  }

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={onChange}
              value={auth.email}
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
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              onChange={onChange}
              value={auth.password2}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
