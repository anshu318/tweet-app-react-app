import React, { useEffect, useState } from "react";
import ls from "local-storage";
import "../Style/Home.css";
import {
  getAllTweets,
  postTweet,
  postLikeTweet,
  postDislikeTweet,
  postReplyTweet,
} from "../Service/Home";
import userProfile from "../../../images/userProfile.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ForumIcon from "@mui/icons-material/Forum";

function Home() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");

  const [tweets, setTweets] = useState([]);
  const [addTweet, setAddTweet] = useState("");
  const [replyTweet, setReplyTweet] = useState("");

  const [changeInput, setChangeInput] = useState(false);

  const fetchData = () => {
    getAllTweets()
      .then((res) => {
        setTweets(res.data);
      })
      .catch((err) => {
        console.error("No Tweets available", err.response.data);
        setTweets([]);
      });
  };

  useEffect(() => {
    setName(ls.get("name"));
    setUsername(ls.get("username"));
    getAllTweets()
      .then((res) => {
        setTweets(res.data);
      })
      .catch((err) => {
        console.error("No Tweets available", err.response.data);
        setTweets([]);
      });
  }, [userName]);

  const setPostData = (event) => {
    event.preventDefault();
    const eventTarget = event.target;
    setAddTweet(eventTarget.value);
  };

  const setPostReplyData = (event) => {
    event.preventDefault();
    const eventTarget = event.target;
    setReplyTweet(eventTarget.value);
  };

  const reset = () => {
    setAddTweet("");
  };

  const resetReply = () => {
    setReplyTweet("");
    setChangeInput(false);
  };

  const addNewTweet = (event) => {
    event.preventDefault();
    const payload = {
      tweetText: addTweet,
      name: name,
    };
    postTweet(userName, payload)
      .then((res) => {
        tweets.push(res.data);
        fetchData();
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const replyNewTweet = (event) => {
    event.preventDefault();
    const payload = {
      comment: replyTweet,
    };
    postReplyTweet(userName, ls.get("replyId"), payload)
      .then(() => {
        fetchData();
        resetReply();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const likeTweet = (event, id) => {
    event.preventDefault();
    postLikeTweet(userName, id)
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const dislikeTweet = (event, id) => {
    event.preventDefault();
    postDislikeTweet(userName, id)
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const comment = (event, id) => {
    event.preventDefault();
    setChangeInput(true);
    ls.set("replyId", id);
  };

  return (
    <div className="container_tweet">
      <div className="screen_tweet">
        <div className="screen__content_tweet">
          <form className="tweet">
            <div className="tweet-txt" aria-label="tweet-txt">
              Hi <span className="tweet_name">{name}</span>
            </div>
            {changeInput ? (
              <div className="tweet__field">
                <i className="tweet__icon fas fa-plus"></i>
                <input
                  type="text"
                  className="tweet__input"
                  placeholder="Reply Tweet..."
                  value={replyTweet}
                  onChange={(e) => setPostReplyData(e)}
                />
                <button className="button tweet__submit" onClick={resetReply}>
                  <span className="tweet__text">Reset</span>
                </button>
                <button
                  className="button tweet__submit"
                  onClick={
                    replyTweet !== "" ? (e) => replyNewTweet(e) : undefined
                  }
                >
                  <span className="tweet__text">Reply</span>
                </button>
              </div>
            ) : (
              <div className="tweet__field">
                <i className="tweet__icon fas fa-plus"></i>
                <input
                  type="text"
                  className="tweet__input"
                  placeholder="Post Tweet..."
                  value={addTweet}
                  onChange={(e) => setPostData(e)}
                />
                <button className="button tweet__submit" onClick={reset}>
                  <span className="tweet__text">Reset</span>
                </button>
                <button
                  className="button tweet__submit"
                  onClick={addTweet !== "" ? (e) => addNewTweet(e) : undefined}
                >
                  <span className="tweet__text">Post</span>
                </button>
              </div>
            )}

            {tweets.length === 0 ? (
              <div className="tweet_wrap_no_tweet">
                <span className="no_tweet">No Tweets Available</span>
              </div>
            ) : (
              <div className="tweet_wrap">
                {tweets
                  .sort(function (obj1, obj2) {
                    return new Date(obj2.tweetDate) - new Date(obj1.tweetDate);
                  })
                  .map((curElem, key) => {
                    return (
                      <div className="posts" key={key}>
                        <div className="tweet__list">
                          <div className="profile_tweet_image">
                            <img
                              src={userProfile}
                              alt="person"
                              className="tweet__icon_profile"
                              height="42"
                              width="42"
                            />
                          </div>
                          <div className="tweet_data">
                            <span className="name">{curElem.name}</span>
                            <span className="username">
                              @{curElem.username}
                            </span>
                          </div>
                        </div>
                        <div className="tweet__list_tweetText">
                          <span className="tweetText">{curElem.tweetText}</span>
                          <div className="new_icons">
                            <div className="like">
                              {curElem.likes.length === 0 ||
                              !curElem.likes.includes(userName) ? (
                                <FavoriteBorderIcon
                                  className="tweet__icon_heart"
                                  onClick={(e) => likeTweet(e, curElem.tweetId)}
                                />
                              ) : (
                                <>
                                  {curElem.likes.length}{" "}
                                  <FavoriteIcon
                                    className="tweet__icon_heart_liked"
                                    onClick={(e) =>
                                      dislikeTweet(e, curElem.tweetId)
                                    }
                                  />
                                </>
                              )}
                            </div>
                            <div className="comment">
                              {curElem.comments.length === 0 ? (
                                <ForumIcon
                                  className="tweet__icon_reply"
                                  onClick={(e) => comment(e, curElem.tweetId)}
                                />
                              ) : (
                                <>
                                  {curElem.comments.length}{" "}
                                  <ForumIcon
                                    className="tweet__icon_replied"
                                    onClick={(e) => comment(e, curElem.tweetId)}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {curElem.comments.length === 0 ? (
                          ""
                        ) : (
                          <>
                            {curElem.comments.map((option, key) => {
                              return (
                                <div className="tweet__list_reply" key={key}>
                                  <div className="profile_tweet_image">
                                    <img
                                      src={userProfile}
                                      alt="person"
                                      className="tweet__icon_profile_reply"
                                      height="42"
                                      width="42"
                                    />
                                  </div>
                                  <div className="tweet_data">
                                    <span className="username">
                                      @{option.username}
                                    </span>
                                    <span className="tweetText">
                                      {option.comment}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
