import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "./authAPI";
import { AppContext } from "../Common/AppContext";
import {
  formGroupClass,
  formElementClass,
  formInputClass,
  formClass,
  submitBtnClass,
} from "./formCSS";

const defaultAuth = {
  email: "",
  password: "",
  password2: "",
};

export default function Register() {
  const [auth, setAuth] = useState(defaultAuth);
  const { token, storeAuth } = useContext(AppContext);

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

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSubmit} className={formClass()}>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>Email</label>
        <input
          type="email"
          className={formInputClass()}
          name="email"
          onChange={onChange}
          value={auth.email}
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
        <label className={formElementClass()}>Confirm Password</label>
        <input
          type="password"
          className={formInputClass()}
          name="password2"
          onChange={onChange}
          value={auth.password2}
        />
      </div>
      <div className={formGroupClass()}>
        <button type="submit" className={submitBtnClass()}>
          Register
        </button>
      </div>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
