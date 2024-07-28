import React, { useState } from 'react';
import { getDownloadURL, getStorage,ref } from 'firebase/storage';
import { getApp } from 'firebase/app';
import { uploadBytes } from 'firebase/storage';
import {storage} from '../firebase'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axiosInstance from '../AxiosInstance';
import toast, { Toaster } from 'react-hot-toast';
function Register() {
  const [formData, setFormData] = useState({
    profile:String,
    name: String,
    email: String,
    password: String,
    phone: String
  });
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [file,setFile]=useState()
  const StorageRef=ref(storage,"profiles/"+formData.email)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Handle file upload
    const snapshot = await uploadBytes(StorageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    
    // Set the profile URL in formData
    const updatedFormData = { ...formData, profile: url };
    
    // Call the API with the updated formData
    const res = await axiosInstance.post('/client/register', updatedFormData);
    
    if (res.data.message === "User Registered") {
      toast.success(res.data.message);
      navigate('/login');
    } else {
      toast.error(res.data.message);
    }
    
    console.log('Form submitted:', updatedFormData);
  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error('An error occurred while submitting the form');
  }
};


  return (
    <div className="max-w-md mx-auto mt-10">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Profile Image
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept='.png,.jpeg'
            onChange={e=>setFile(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
