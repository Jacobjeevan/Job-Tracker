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

  console.log(token);

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

  return (
    <div className="card">
      <form onSubmit={onSubmit} className="m-4">
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            name="title"
            value={formValues.title}
          />
        </div>
        <div className="form-group">
          <label>Employer</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            name="employer"
            value={formValues.employer}
          />
        </div>
        <div className="form-group">
          <label>Apply Date</label>
          <input
            type="date"
            className="form-control"
            onChange={onChange}
            name="apply_date"
            value={formValues.apply_date}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            onChange={onChange}
            name="description"
            value={formValues.description}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            name="city"
            value={formValues.city}
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            name="state"
            value={formValues.state}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
