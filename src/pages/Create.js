/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axiosInstance from "../AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { storage } from "../firebase";

function Create() {
  const [formData, setFormData] = useState({
    url: "",
    user: "",
    type: "",
    title: "", // Added title to the form data
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [file, setFile] = useState();

  function getRandom(min, max) {
    const floatRandom = Math.random();
    const difference = max - min;
    const random = Math.round(difference * floatRandom);
    const randomWithinRange = random + min;
    return randomWithinRange;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        user: user._id,
      }));
    }
  }, [user]);

  const uploadImage = async () => {
    const storageRef = ref(storage, "uploads/" + getRandom(10000, 5000000));
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage();
    setFormData((prevData) => ({
      ...prevData,
      url: imageUrl,
    }));

    try {
      const res = await axiosInstance.post("/image/upload", {
        ...formData,
        url: imageUrl,
      });
      if (res.data.message === "image uploaded") {
        toast.success(res.data.message);
        setTimeout(() => navigate("/"), 3000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred during the upload.");
    }
  };

  return (
    <div className="flex justify-center items-center h-[400px] bg-gray-100">
      <Toaster />
      {formData.user ? (
        <form
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Create Image</h2>

          <div className="mb-4">
            <label
              htmlFor="url"
              className="block text-gray-700 font-medium mb-2"
            >
              Image
            </label>
            <input
              type="file"
              id="url"
              name="url"
              accept=".png,.jpeg"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-medium mb-2"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="default">Default</option>
              <option value="entertainment">Entertainment</option>
              <option value="education">Education</option>
              <option value="nature">Nature</option>
              <option value="technology">Technology</option>
              <option value="culture">Culture</option>
              <option value="medical">Medical</option>
              <option value="others">Others</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      ) : (
        <h1>Must be logged in</h1>
      )}
    </div>
  );
}

export default Create;
