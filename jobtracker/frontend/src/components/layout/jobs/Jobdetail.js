import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getJob } from "../../../actions/jobDetail";
import "./Jobdetail.css";

class Jobdetail extends Component {
  static propTypes = {
    jobDetail: PropTypes.array.isRequired,
    getJob: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getJob(this.props.match.params.jobid);
  }

  render() {
    let job = this.props.jobDetail.pop();
    return (
      <div>
        {job ? (
          <div className="container detail-container">
            <div className="card-detail">
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
          </div>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  jobDetail: state.jobDetail.jobDetail,
});

export default connect(mapStateToProps, { getJob })(Jobdetail);
