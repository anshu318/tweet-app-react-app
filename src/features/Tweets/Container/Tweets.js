import React, { useEffect, useState } from "react";
import ls from "local-storage";
import "../Style/Tweet.css";
import {
  getUserTweets,
  deleteUserTweet,
  updateUserTweet,
} from "../Service/Tweet";
import userProfile from "../../../images/userProfile.png";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Tweets() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");

  const [userTweets, setUserTweets] = useState([]);
  const [editTweet, setEditTweet] = useState("");

  const [changeInput, setChangeInput] = useState(false);

  const fetchData = () => {
    getUserTweets(userName)
      .then((res) => {
        setUserTweets(res.data);
      })
      .catch((err) => {
        console.error("No Tweets available for this user ", userName, err);
        setUserTweets([]);
      });
  };

  useEffect(() => {
    setName(ls.get("name"));
    setUsername(ls.get("username"));
    getUserTweets(ls.get("username"))
      .then((res) => {
        setUserTweets(res.data);
      })
      .catch((err) => {
        console.error("No Tweets available for this user ", userName, err);
        setUserTweets([]);
      });
  }, [userName]);

  const setPutEditData = (event) => {
    event.preventDefault();
    const eventTarget = event.target;
    setEditTweet(eventTarget.value);
  };

  const reset = () => {
    setEditTweet("");
    setChangeInput(false);
  };

  const editNewUserTweet = (event) => {
    event.preventDefault();
    const payload = {
      tweetId: ls.get("editId"),
      tweetText: editTweet,
    };
    updateUserTweet(userName, payload)
      .then(() => {
        fetchData();
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteTweet = (event, id) => {
    event.preventDefault();
    deleteUserTweet(userName, id)
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.error("Unable to delete tweet for user", userName, err);
      });
  };

  const editUserTweet = (event, id, text) => {
    event.preventDefault();
    setChangeInput(true);
    ls.set("editId", id);
    setEditTweet(text);
  };
  return (
    <div className="container_user_tweet">
      <div className="screen_user_tweet">
        <div className="screen__content_user_tweet">
          <form className="user_tweet">
            <div className="user_tweet-txt" aria-label="tweet-txt">
              <span className="user_tweet_name">{name}'s</span> Tweets
            </div>
            {changeInput ? (
              <div className="user_tweet__field">
                <i className="user_tweet__icon fas fa-edit"></i>
                <input
                  type="text"
                  className="user_tweet__input"
                  placeholder="Edit Tweet..."
                  value={editTweet}
                  onChange={(e) => setPutEditData(e)}
                />
                <button className="button tweet__submit" onClick={reset}>
                  <span className="tweet__text">Reset</span>
                </button>
                <button
                  className="button tweet__submit"
                  onClick={
                    editTweet !== "" ? (e) => editNewUserTweet(e) : undefined
                  }
                >
                  <span className="tweet__text">Update</span>
                </button>
              </div>
            ) : (
              ""
            )}

            {userTweets.length === 0 ? (
              <div className="user_tweet_wrap_no_tweet">
                <span className="no_tweet">No Tweets Available</span>
                <span className="no_tweet">
                  Go to home page and post new tweet !
                </span>
              </div>
            ) : (
              <div
                className={
                  changeInput ? "user_tweet_edit_wrap" : "user_tweet_wrap"
                }
              >
                {userTweets
                  .sort(function (obj1, obj2) {
                    return new Date(obj2.tweetDate) - new Date(obj1.tweetDate);
                  })
                  .map((curElem, key) => {
                    return (
                      <div className="posts" key={key}>
                        <div className="user_tweet__list">
                          <div className="profile_user_tweet_image">
                            <img
                              src={userProfile}
                              alt="person"
                              className="user_tweet__icon_profile"
                              height="42"
                              width="42"
                            />
                          </div>
                          <div className="user_tweet_data">
                            <span className="name">{curElem.name}</span>
                            <span className="username">
                              @{curElem.username}
                            </span>
                          </div>
                        </div>
                        <div className="user_tweet__list_tweetText">
                          <span className="user_tweetText">
                            {curElem.tweetText}
                          </span>
                          <div className="new_icons">
                            <div className="like">
                              <DeleteIcon
                                className="user_tweet__icon_delete"
                                onClick={(e) => deleteTweet(e, curElem.tweetId)}
                              />
                            </div>
                            <div className="comment">
                              <EditIcon
                                className="user_tweet__icon_update"
                                onClick={(e) =>
                                  editUserTweet(
                                    e,
                                    curElem.tweetId,
                                    curElem.tweetText
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
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

export default Tweets;
