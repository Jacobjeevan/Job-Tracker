import { useState, useEffect } from "react";
import { loadUser } from "./authAPI";
import useToken from "./useToken";

export default function useUser() {
  const [token, setToken] = useToken();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserFromSession() {
      if (!user && token) {
        const APIresponse = await loadUser(token);
        const { success, user, error } = APIresponse;
        if (success) {
          setUser(user);
        } else if (error.includes("Token could not be validated")) {
          setToken(null);
        } else if (error) {
          console.log("Error loading user");
        }
      }
    }
    getUserFromSession();
  }, [token, user, setToken]);

  return [user, setUser];
}
