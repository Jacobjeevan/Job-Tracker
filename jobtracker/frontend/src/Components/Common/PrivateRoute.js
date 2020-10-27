import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../Common/AppContext";

export default function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/Login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
