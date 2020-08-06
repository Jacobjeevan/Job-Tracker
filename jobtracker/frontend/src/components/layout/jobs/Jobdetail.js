import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getJob } from "../../../actions/jobs";

class Jobdetail extends Component {
  static propTypes = {
    jobs: PropTypes.array.isRequired,
    getJob: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getJob(this.props.match.params.jobid);
  }

  render() {
    let job = this.props.jobs.pop();
    return (
      <div>
        {job ? (
          <div className="container">
            <h2>{job.title}</h2>
            <br></br>
            <p>{job.description}</p>
            <br></br>
            <p>{job.employer}</p>
            <br></br>
            <p>
              {job.city}, {job.state}
            </p>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs,
});

export default connect(mapStateToProps, { getJob })(Jobdetail);
