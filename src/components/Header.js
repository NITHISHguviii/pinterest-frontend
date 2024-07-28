import React, { useState, useEffect } from "react";
import Icon from "../images/pinterest_PNG63.png";
import Search from "../images/image.png";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../reducers/postSlice";
import { logOut } from "../reducers/UserSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    navigate("/");
    dispatch(fetchPosts({ title: searchTerm }));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logging out...");
    dispatch(logOut());
    toast.success("Logout Success");
    navigate("/");
  };

  useEffect(() => {
    console.log("User selector:", selector);
  }, [selector]);

  return (
    <div className="md:flex items-center md:justify-around p-4 flex-wrap">
      <Toaster />
      <div>
        <img src={Icon} className="h-10 w-10" alt="Icon" />
      </div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/explore">Explore</Link>
      </div>
      <div>
        {selector.email === "" ? null : <Link to="/create">Create</Link>}
      </div>
      <div className="flex">
        <img src={Search} className="h-10 w-10 absolute ml-1" alt="Search" />
        <form onSubmit={handleSearch} className="w-full flex">
          <input
            placeholder="search"
            className="w-auto px-10 py-2 rounded-xl bg-slate-200 border-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-xl"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex gap-10">
        {selector.email === "" ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="p-4">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-700 border-2 p-3 rounded-md hover:bg-orange-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
