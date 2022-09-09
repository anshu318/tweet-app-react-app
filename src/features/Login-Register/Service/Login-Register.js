import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.REACT_APP_API_BASE_URl;

export const login = async (userName, password) => {
  return axios.post(API_URL + "/api/v1.0/tweets/login", {
    username: userName,
    password: password,
  });
};

export const register = async (payload) => {
  return axios.post(API_URL + "/api/v1.0/tweets/register", payload);
};

export const forgotPass = async (username, payload) => {
  return axios.put(
    API_URL + "/api/v1.0/tweets/" + username + "/forgot",
    payload
  );
};
