import { useState, useEffect } from "react";
import { loadUser } from "./authAPI";

export default function useUser(token) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserFromSession() {
      if (!user && token) {
        const APIresponse = await loadUser(token);
        const { success, user, error } = APIresponse;
        if (success) {
          setUser(user);
        } else if (error) {
          console.log("Error loading user");
        }
      }
    }
    getUserFromSession();
  }, [token, user]);

  return [user, setUser];
}
