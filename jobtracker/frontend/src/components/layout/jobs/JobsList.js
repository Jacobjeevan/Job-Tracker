import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getJobs, deleteJob } from "../../../actions/jobs";
import LinkButton from "./LinkButton";
import "./JobsList.css";

export class JobsList extends Component {
  static propTypes = {
    jobs: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    getJobs: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Fragment>
        <div className="d-flex flex-wrap justify-content-flex-start">
          {this.props.jobs.map((job) => (
            <div
              key={job.id}
              className="card mb-4 mr-5 ml-5"
              style={{ width: "18rem" }}
            >
              <div className="container card-container">
                <div className="row card-info">
                  <div className="col">
                    <p>{job.employer}</p>
                  </div>
                  <div className="col">
                    <p>
                      {job.city}, {job.state}
                    </p>
                  </div>
                </div>
                <h5 className="card-title card-info">{job.title}</h5>
                {isAuthenticated ? (
                  <div className="card-btn-container">
                    <LinkButton
                      to={`/job/${job.id}`}
                      className="card-btn view-btn"
                    >
                      View Details
                    </LinkButton>
                    <button
                      className="card-btn dlt-btn"
                      onClick={this.props.deleteJob.bind(this, job.id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <LinkButton
                    to={`/job/${job.id}`}
                    className="card-btn view-btn"
                  >
                    View Details
                  </LinkButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
  auth: state.auth,
});

export default connect(mapStateToProps, { getJobs, deleteJob })(JobsList);
