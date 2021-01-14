import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function loadUser(token) {
  if (token !== null) {
    try {
      let response = await axios.get("/auth/user", tokenConfig(token));
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function login(body) {
  try {
    let response = await axios.post("/auth/login", body, config);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function register(body) {
  try {
    let response = await axios.post("/auth/register", body, config);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function logout(token) {
  try {
    let response = await axios.post("/auth/logout/", null, tokenConfig(token));
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const tokenConfig = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
