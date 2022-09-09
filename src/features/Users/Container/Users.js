import React, { useState, useEffect } from "react";
import "../Style/Users.css";
import userProfile from "../../../images/userProfile.png";
import { getAllUsers, searchLikeUsers } from "../Service/Users";

function Users() {
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = () => {
    getAllUsers()
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.error("Users list is not able to retrive", err.response.data);
        setUserList([]);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setSearchData = (event) => {
    event.preventDefault();
    const eventTarget = event.target;
    setSearch(eventTarget.value);
  };

  const searchUsers = (event) => {
    event.preventDefault();
    searchLikeUsers(search)
      .then((res) => {
        const users = res.data;
        setUserList(users);
      })
      .catch((err) => {
        console.error("No user with username ", search, err.response.data);
      });
  };

  return (
    <div className="container_user">
      <div className="screen_user">
        <div className="screen__content_user">
          <form className="user">
            <div className="user-txt" aria-label="user-txt">Users List</div>
            <div className="user__field">
              <i className="user__icon fas fa-search"></i>
              <input
                type="text"
                className="user__input"
                placeholder="Search Users using Username..."
                value={search}
                onChange={(e) => setSearchData(e)}
              />
              <button
                className="button user__submit"
                onClick={search === "" ? () => fetchData() : undefined}
              >
                <span className="user__text">Reset</span>
              </button>
              <button
                className="button user__submit"
                onClick={search ? (e) => searchUsers(e) : undefined}
              >
                <span className="user__text">Search</span>
              </button>
            </div>
            <div className="user_wrap">
              {userList.map((curElem, key) => {
                return (
                  <div className="user__list" key={key}>
                    <div className="profile_image">
                      <img
                        src={userProfile}
                        alt="person"
                        className="user__icon_profile"
                      />
                    </div>
                    <div className="user_data">
                      <span className="name">{curElem.name}</span>
                      <span className="username">@{curElem.username}</span>
                      <span className="contact">+91-{curElem.contactNum}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Users;
