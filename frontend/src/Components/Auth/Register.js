import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { register as registerUser } from "./authAPI";
import { AppContext } from "../Common/AppContext";
import {
  formGroupClass,
  formElementClass,
  formInputClass,
  formClass,
  submitBtnClass,
} from "../Common/formCSS";
import { useForm } from "react-hook-form";
import { registerResolver } from "./authHelper";

export default function Register() {
  const { token, storeAuth } = useContext(AppContext);
  const { register, handleSubmit, errors } = useForm({
    resolver: registerResolver,
  });

  const onSubmit = async (auth) => {
    let APIresponse = await registerUser(auth);
    const { success, token, error } = APIresponse;
    if (success) {
      storeAuth({ user: null, token });
    } else if (error) {
      console.log("Error registering user");
    }
  };

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClass()}>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>Email</label>
        <input
          className={formInputClass()}
          name="email"
          ref={register}
          placeholder="Email/Username"
        />
        <p className="text-sm text-gray-400">{errors.email?.message}</p>
      </div>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>Password</label>
        <input
          type="password"
          className={formInputClass()}
          name="password"
          ref={register}
        />
        <p className="text-sm text-gray-400">{errors.password?.message}</p>
      </div>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>Confirm Password</label>
        <input
          type="password"
          className={formInputClass()}
          name="passwordConfirm"
          ref={register}
        />
        <p className="text-sm text-gray-400">
          {errors.passwordConfirm?.message}
        </p>
      </div>
      <div className={formGroupClass()}>
        <button type="submit" className={submitBtnClass()}>
          Register
        </button>
      </div>
      <div>
        Already have an account?{" "}
        <Link to="/login">
          <div className="underline">Login</div>
        </Link>
      </div>
    </form>
  );
}
