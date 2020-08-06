import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "./Header.css";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav mt-2 mt-lg-0 auth-nav">
        <Link to="/login" onClick={this.props.logout} className="nav-link mr-4">
          Logout
        </Link>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav mt-2 mt-lg-0 auth-nav">
        <Link to="/register" className="nav-link mr-4">
          Register
        </Link>
        <Link to="/login" className="nav-link mr-4">
          Login
        </Link>
      </ul>
    );

    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a class="navbar-brand" href="#">
            Job Tracker
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link to="/" className="nav-link mr-4">
                Home
              </Link>
              <Link to="/new-job" className="nav-link mr-4">
                Add Job
              </Link>
              <Link to="/jobs" className="nav-link mr-4">
                Jobs List
              </Link>
              <a
                className="nav-link mr-4"
                href="http://jobtracker-django.herokuapp.com/"
              >
                Django Frontend Version
              </a>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </div>
      </nav>

      /*  <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              Job Tracker
            </a>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/new-job" className="nav-link">
                  Add Job
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/jobs" className="nav-link">
                  Jobs List
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://jobtracker-django.herokuapp.com/"
                >
                  Job Tracker - Django Frontend
                </a>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav> */
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
