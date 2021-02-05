import { hot } from "react-hot-loader/root";
import React from "react";
import Dashboard from "./Components/Main/Dashboard";
import { AppContext } from "./Components/Common/AppContext";
import "./App.css";
import useToken from "./Components/Auth/useToken";
import useUser from "./Components/Auth/useUser";

function App() {
  const [token, setToken] = useToken();
  const [user, setUser] = useUser(token);

  function storeAuth(authData) {
    let { user, token } = authData;
    setToken(token);
    setUser(user);
  }

  function clearUser() {
    setToken(null);
    setUser(null);
  }

  return (
    <div className="bg-blue-50 h-screen">
      <AppContext.Provider value={{ token, clearUser, storeAuth, user }}>
        <Dashboard />
      </AppContext.Provider>
    </div>
  );
}

export default hot(App);
