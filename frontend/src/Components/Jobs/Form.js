import React, { useContext } from "react";
import { addJob } from "./jobsAPI";
import { mutate } from "swr";
import { AppContext } from "../Common/AppContext";
import { useForm } from "react-hook-form";
import { addFormResolver } from "./jobHelper";
import {
  formGroupClass,
  formElementClass,
  formInputClass,
  formClass,
} from "../Common/formCSS";

export default function Form() {
  const { token } = useContext(AppContext);

  const { register, handleSubmit, errors } = useForm({
    resolver: addFormResolver,
  });

  const onSubmit = async (formValues) => {
    await addJob(formValues, token);
    mutate("jobsData");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClass()}>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>Job Title</label>
        <input
          type="text"
          className={formInputClass()}
          name="title"
          ref={register}
        />
        <p className="p-2 text-sm text-gray-400">{errors.title?.message}</p>
      </div>

      <div className={formGroupClass()}>
        <label className={formElementClass()}>Employer</label>
        <input
          type="text"
          className={formInputClass()}
          ref={register}
          name="employer"
        />
        <p className="p-2 text-sm text-gray-400">{errors.employer?.message}</p>
      </div>

      <div className={formGroupClass()}>
        <label className={formElementClass()}>Apply Date</label>
        <input
          type="date"
          className={formInputClass()}
          ref={register}
          name="apply_date"
        />
        <p className="p-2 text-sm text-gray-400">
          {errors.apply_date?.message}
        </p>
      </div>

      <div className={formGroupClass()}>
        <label className={formElementClass()}>Description</label>
        <textarea
          className={formInputClass()}
          ref={register}
          name="description"
        />
        <p className="p-2 text-sm text-gray-400">
          {errors.description?.message}
        </p>
      </div>

      <div className={formGroupClass()}>
        <label className={formElementClass()}>City</label>
        <input
          type="text"
          className={formInputClass()}
          ref={register}
          name="city"
        />
        <p className="p-2 text-sm text-gray-400">{errors.city?.message}</p>
      </div>

      <div className={formGroupClass()}>
        <label className={formElementClass()}>State</label>
        <input
          type="text"
          className={formInputClass()}
          ref={register}
          name="state"
        />
        <p className="p-2 text-sm text-gray-400">{errors.state?.message}</p>
      </div>

      <div className={formGroupClass()}>
        <button
          type="submit"
          className="bg-blue-200 hover:bg-blue-300 p-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
