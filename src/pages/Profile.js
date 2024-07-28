/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../reducers/UserSlice";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="text-center">
      <img
        src={user.profile}
        className="w-32 mx-auto border-2 border-gray-300 shadow-lg rounded-full"
        alt="User Profile"
      />
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <p>{user?.phone}</p>
      <p>Followers: {user?.followers?.length}</p>
      <p>Following: {user?.following?.length}</p>
    </div>
  );
}

export default Profile;
