import axios from "axios";

import * as dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.REACT_APP_API_BASE_URl;

export const getAllTweets = async () => {
  return axios.get(API_URL + "/api/v1.0/tweets/all");
};

export const postTweet = async (username, payload) => {
  return axios.post(API_URL + "/api/v1.0/tweets/" + username + "/add", payload);
};

export const postLikeTweet = async (username, id) => {
  return axios.post(API_URL + "/api/v1.0/tweets/" + username + "/like/" + id);
};

export const postDislikeTweet = async (username, id) => {
  return axios.post(
    API_URL + "/api/v1.0/tweets/" + username + "/dislike/" + id
  );
};

export const postReplyTweet = async (username, id, payload) => {
  return axios.post(
    API_URL + "/api/v1.0/tweets/" + username + "/reply/" + id,
    payload
  );
};
