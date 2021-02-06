import React from "react";
import Header from "../Common/Header";
import PropTypes from "prop-types";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <div className="min-h-full flex flex-col bg-blue-50 justify-end">
      <Header />
      <div className="flex-grow min-h-full container m-auto p-10 w-6/12">
        {<props.Body />}
      </div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  Body: PropTypes.func,
};
