import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addJob } from "../../../actions/jobs";

export class Form extends Component {
  state = this.getInitialState();

  static propTypes = {
    addJob: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      employer,
      apply_date,
      description,
      city,
      state,
    } = this.state;
    const job = { title, employer, apply_date, description, city, state };
    this.props.addJob(job);
    this.setState(this.getInitialState());
  };

  getInitialState() {
    return {
      title: "",
      employer: "",
      apply_date: "",
      description: "",
      city: "",
      state: "",
    };
  }

  render() {
    const {
      title,
      employer,
      apply_date,
      description,
      city,
      state,
    } = this.state;
    return (
      <div className="card">
        <form onSubmit={this.onSubmit} className="m-4">
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChange}
              name="title"
              value={title}
            />
          </div>
          <div className="form-group">
            <label>Employer</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChange}
              name="employer"
              value={employer}
            />
          </div>
          <div className="form-group">
            <label>Apply Date</label>
            <input
              type="date"
              className="form-control"
              onChange={this.onChange}
              name="apply_date"
              value={apply_date}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              onChange={this.onChange}
              name="description"
              value={description}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChange}
              name="city"
              value={city}
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChange}
              name="state"
              value={state}
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
}

export default connect(null, { addJob })(Form);
