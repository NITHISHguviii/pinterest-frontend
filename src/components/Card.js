import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../reducers/postSlice";
import { fetchUserById } from "../reducers/UserSlice";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const Card = ({ post }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const Like = (postId, user) => {
    try {
      axiosInstance
        .post("/image/like", { id: postId, user: user })
        .then((res) => {
          console.log(res.data);
          dispatch(fetchPosts());
        });
    } catch (error) {
      console.error(error);
    }
  };

  const Follow = (id, follower) => {
    try {
      axiosInstance
        .post("/client/follow", { id: id, follower: follower })
        .then((res) => {
          dispatch(fetchUserById(user._id));
          dispatch(fetchPosts());
        });
    } catch (error) {
      console.error(error);
    }
  };

  const downloadImage = async (url) => {
    try {
      const storageRef = ref(storage, url);
      const downloadURL = await getDownloadURL(storageRef);
      const a = document.createElement("a");
      a.href = downloadURL;
      a.download = url.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  useEffect(() => {
    console.log(
      user?.following?.some(
        (users) => users.toString() === post.user._id.toString()
      )
    );
  }, [user, post.user._id]);

  return (
    <div className="p-2">
      <div className="bg-cover w-full flex justify-center items-center">
        <div className="w-full bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
          <div className="w-full mx-auto rounded-2xl bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
            <div className="text-center px-2 mx-auto">
              <article className="bg-white p-6 mb-6 shadow transition duration-300 group transform rounded-2xl border">
                <div className="relative mb-4 rounded-2xl">
                  <img
                    className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform"
                    src={post.url}
                    alt=""
                  />
                </div>
                <div className="flex justify-between items-center w-full pb-4 mb-auto">
                  <div className="flex items-center">
                    <div className="pr-3">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={post.user.profile}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-1">
                      <div>
                        <p className="text-sm font-semibold">
                          {post.user?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="text-sm flex items-center text-gray-500">
                      {post.createdAt}
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-xl leading-8">{post?.title}</h3>
                <div className="flex md:space-x-72 space-x-48">
                  <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                    <button
                      onClick={() => Like(post._id, user?._id)}
                      className="flex"
                    >
                      {post.likes?.some((like) => like === user?._id) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 text-red-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      )}
                      <span className="ml-1 text-sm text-slate-400">
                        {post.likes?.length}
                      </span>
                    </button>
                  </div>
                  <div>
                    {user.email !== "" && user?._id !== post.user._id ? (
                      user?.following?.some(
                        (followedUser) =>
                          followedUser.toString() === post.user._id.toString()
                      ) ? (
                        <button
                          className="text-green-300"
                          onClick={() => Follow(post?.user?._id, user?._id)}
                        >
                          Followed
                        </button>
                      ) : (
                        <button
                          className="text-blue-300"
                          onClick={() => Follow(post?.user?._id, user?._id)}
                        >
                          Follow
                        </button>
                      )
                    ) : null}
                  </div>
                </div>
                <a className="" href={post.url} target="_blank">
                  Download
                </a>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
