import React from "react";
import Header from "../Common/Header";
import PropTypes from "prop-types";

export default function Layout(props) {
  return (
    <div>
      <Header />
      {<props.Body />}
    </div>
  );
}

Layout.propTypes = {
  Body: PropTypes.func,
};
