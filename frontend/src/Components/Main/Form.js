import React, { useState, useContext } from "react";
import { addJob } from "../Jobs/jobsAPI";
import { mutate } from "swr";
import { AppContext } from "../Common/AppContext";

const defaultValues = {
  title: "",
  employer: "",
  apply_date: "",
  description: "",
  city: "",
  state: "",
};

export default function Form() {
  const [formValues, setFormValues] = useState(defaultValues);
  const { token } = useContext(AppContext);

  function onChange(e) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    await addJob(formValues, token);
    mutate("jobsData");
  }

  const formGroupClass = () => {
    return "flex-1 flex flex-col space-y-1";
  };

  const formElementClass = () => {
    return "flex-1 text-md";
  };

  return (
    <div className="">
      <form
        onSubmit={onSubmit}
        className="m-4 p-5 flex flex-col space-y-2 border-2 border-black"
      >
        <div className={formGroupClass()}>
          <label className={formElementClass()}>Job Title</label>
          <input
            type="text"
            className={formElementClass()}
            onChange={onChange}
            name="title"
            value={formValues.title}
          />
        </div>
        <div className={formGroupClass()}>
          <label className={formElementClass()}>Employer</label>
          <input
            type="text"
            className={formElementClass()}
            onChange={onChange}
            name="employer"
            value={formValues.employer}
          />
        </div>
        <div className={formGroupClass()}>
          <label className={formElementClass()}>Apply Date</label>
          <input
            type="date"
            className={formElementClass()}
            onChange={onChange}
            name="apply_date"
            value={formValues.apply_date}
          />
        </div>
        <div className={formGroupClass()}>
          <label className={formElementClass()}>Description</label>
          <textarea
            className={formElementClass()}
            onChange={onChange}
            name="description"
            value={formValues.description}
          />
        </div>
        <div className={formGroupClass()}>
          <label className={formElementClass()}>City</label>
          <input
            type="text"
            className={formElementClass()}
            onChange={onChange}
            name="city"
            value={formValues.city}
          />
        </div>
        <div className={formGroupClass()}>
          <label className={formElementClass()}>State</label>
          <input
            type="text"
            className={formElementClass()}
            onChange={onChange}
            name="state"
            value={formValues.state}
          />
        </div>
        <div className={formGroupClass()}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
