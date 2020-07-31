import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      for (const [key, value] of Object.entries(error.message)) {
        alert.error(`${key}: ${value}`);
      }
    }

    if (message !== prevProps.message) {
      if (message.passwordDoNotMatch) {
        alert.error(message.passwordDoNotMatch);
      } else {
        for (const [key, value] of Object.entries(message)) {
          alert.success(`${value}`);
        }
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
