import React, { useContext, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../Common/AppContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useContext(AppContext);
  return (
    <Fragment>
      {isAuthenticated ? (
        <Route
          {...rest}
          render={(routeProps) => <Component {...routeProps} />}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </Fragment>
  );
}
