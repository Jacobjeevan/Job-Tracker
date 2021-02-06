import { axiosInstance } from "../../axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function loadUser(token) {
  if (token !== null) {
    let response;
    try {
      response = await axiosInstance.get("/auth/user", tokenConfig(token));
    } catch (error) {
      response = error.response;
    }
    return response.data;
  }
}
export async function loadDefaultUser() {
  let response;
  try {
    response = await axiosInstance.get("/auth/defaultUser");
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function login(body) {
  let response;
  try {
    response = await axiosInstance.post("/auth/login", body, config);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function register(body) {
  let response;
  try {
    response = await axiosInstance.post("/auth/register", body, config);
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function logout(token) {
  let response;
  try {
    response = await axiosInstance.get(
      "/auth/logout/",
      null,
      tokenConfig(token)
    );
  } catch (error) {
    response = error.response;
  }
  return response.data;
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
