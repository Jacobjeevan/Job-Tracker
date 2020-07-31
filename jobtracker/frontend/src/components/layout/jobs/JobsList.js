import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getJobs, deleteJob } from "../../../actions/jobs";

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
        <h1>Jobs List</h1>
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
          <tbody>
            {this.props.jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.employer}</td>
                <td>{job.apply_date}</td>
                <td>{job.description}</td>
                <td>{job.city}</td>
                <td>{job.state}</td>
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
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
  auth: state.auth,
});

export default connect(mapStateToProps, { getJobs, deleteJob })(JobsList);
