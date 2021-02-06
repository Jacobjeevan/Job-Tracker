import { Link, Redirect } from "react-router-dom";
import { login } from "./authAPI";
import React, { useContext } from "react";
import { AppContext } from "../Common/AppContext";
import {
  formGroupClass,
  formElementClass,
  formInputClass,
  formClass,
  submitBtnClass,
} from "./formCSS";
import { useForm } from "react-hook-form";
import { loginResolver } from "./authHelper";

export default function Login() {
  const { token, storeAuth } = useContext(AppContext);

  const { register, handleSubmit, errors } = useForm({
    resolver: loginResolver,
  });

  const onSubmit = async (auth) => {
    const APIresponse = await login(auth);
    const { success, token, error } = APIresponse;
    if (success) {
      storeAuth({ user: null, token });
    } else if (error) {
      console.log("Error logging in");
    }
  };

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClass()}>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>Username</label>
        <input
          name="email"
          ref={register}
          placeholder="Email/Username"
          className={formInputClass()}
        />
        <p className="p-2 text-sm text-gray-400">{errors.email?.message}</p>
      </div>

      <div className={formGroupClass()}>
        <label className={formElementClass()}>Password</label>
        <input
          name="password"
          ref={register}
          placeholder="Password"
          type="password"
          className={formInputClass()}
        />
        <p className="p-2 text-sm text-gray-400">{errors.password?.message}</p>
      </div>

      <div className={formGroupClass()}>
        <button type="submit" className={submitBtnClass()}>
          Login
        </button>
      </div>
      <div>
        Don't have an account?{" "}
        <Link to="/register">
          <div className="underline">Register</div>
        </Link>
      </div>
    </form>
  );
}
