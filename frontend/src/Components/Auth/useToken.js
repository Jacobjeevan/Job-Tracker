import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    let foundToken = JSON.parse(localStorage.getItem("token"));
    return foundToken ? foundToken : null;
  };

  const [token, set] = useState(getToken());

  const setToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    set(token);
  };

  return [token, setToken];
}
