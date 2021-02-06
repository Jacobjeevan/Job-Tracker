import { Link, Redirect } from "react-router-dom";
import { login } from "./authAPI";
import React, { useState, useContext } from "react";
import { AppContext } from "../Common/AppContext";
import {
  formGroupClass,
  formElementClass,
  formInputClass,
  formClass,
  submitBtnClass,
} from "./formCSS";

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
    <form onSubmit={onSubmit} className={formClass()}>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>Username</label>
        <input
          type="text"
          className={formInputClass()}
          name="username"
          onChange={onChange}
          value={auth.username}
        />
      </div>

      <div className={formGroupClass()}>
        <label className={formElementClass()}>Password</label>
        <input
          type="password"
          className={formInputClass()}
          name="password"
          onChange={onChange}
          value={auth.password}
        />
      </div>

      <div className={formGroupClass()}>
        <button type="submit" className={submitBtnClass()}>
          Login
        </button>
      </div>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
