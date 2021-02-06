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
    return "flex-1 flex flex-col space-y-2";
  };

  const formElementClass = () => {
    return "flex-1 text-md";
  };

  const formInputClass = () => {
    return "flex-1 text-md rounded shadow p-2";
  };

  return (
    <form
      onSubmit={onSubmit}
      className="my-4 mx-40 p-10 flex flex-col space-y-4 border-2 border-blue-200 shadow-sm font-playfair italic rounded"
    >
      <div className={formGroupClass()}>
        <label className={formElementClass()}>Job Title</label>
        <input
          type="text"
          className={formInputClass()}
          onChange={onChange}
          name="title"
          value={formValues.title}
        />
      </div>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>Employer</label>
        <input
          type="text"
          className={formInputClass()}
          onChange={onChange}
          name="employer"
          value={formValues.employer}
        />
      </div>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>Apply Date</label>
        <input
          type="date"
          className={formInputClass()}
          onChange={onChange}
          name="apply_date"
          value={formValues.apply_date}
        />
      </div>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>Description</label>
        <textarea
          className={formInputClass()}
          onChange={onChange}
          name="description"
          value={formValues.description}
        />
      </div>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>City</label>
        <input
          type="text"
          className={formInputClass()}
          onChange={onChange}
          name="city"
          value={formValues.city}
        />
      </div>
      <div className={formGroupClass()}>
        <label className={formElementClass()}>State</label>
        <input
          type="text"
          className={formInputClass()}
          onChange={onChange}
          name="state"
          value={formValues.state}
        />
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
