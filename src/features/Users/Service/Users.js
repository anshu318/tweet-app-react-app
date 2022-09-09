import axios from "axios";

import * as dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.REACT_APP_API_BASE_URl;

export const getAllUsers = async () => {
  return axios.get(API_URL + "/api/v1.0/tweets/users/all");
};

export const searchLikeUsers = async (username) => {
  return axios.get(API_URL + "/api/v1.0/tweets/user/search/" + username);
};
