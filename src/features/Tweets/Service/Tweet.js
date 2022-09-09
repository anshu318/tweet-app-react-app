import axios from "axios";

import * as dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.REACT_APP_API_BASE_URl;

export const getUserTweets = async (username) => {
  return axios.get(API_URL + "/api/v1.0/tweets/" + username, {
    headers: {
      loggedInUser: username,
    },
  });
};

export const updateUserTweet = async (username, payload) => {
  return axios.put(
    API_URL + "/api/v1.0/tweets/" + username + "/update",
    payload
  );
};

export const deleteUserTweet = async (username, id) => {
  return axios.delete(
    API_URL + "/api/v1.0/tweets/" + username + "/delete/" + id
  );
};
