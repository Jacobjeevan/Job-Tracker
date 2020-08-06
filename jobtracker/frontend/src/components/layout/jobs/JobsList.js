import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getJobs, deleteJob } from "../../../actions/jobs";
import { Link } from "react-router-dom";
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
        {/* <h1>Jobs List</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Employer</th>
              <th>Apply Date</th>
              <th>Description</th>
              <th>City</th>
              <th>State</th>
              <th />
            </tr>
          </thead>
          <tbody> */}
        <div className="d-flex flex-wrap justify-content-between">
          {this.props.jobs.map((job) => (
            <div key={job.id} className="card mb-4" style={{ width: "18rem" }}>
              <div className="container pr-0 pl-0">
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

        {/* <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.employer}</td>
                <td>{job.apply_date}</td>
                <td>{job.description}</td>
                <td>{job.city}</td>
                <td>{job.state}</td>
                <td>
                  <button className="btn btn-info btn-sm">
                    <Link to={`/job/${job.id}`}>View Job Detail</Link>
                  </button>
                </td>
                {isAuthenticated == true && (
                  <td>
                    <button
                      onClick={this.props.deleteJob.bind(this, job.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table> */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
  auth: state.auth,
});

export default connect(mapStateToProps, { getJobs, deleteJob })(JobsList);
