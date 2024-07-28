import React, { useState } from 'react';
import axiosInstance from '../AxiosInstance'
import toast,{Toaster} from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/UserSlice';
import { useNavigate } from 'react-router';
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate=useNavigate()
const dispatch=useDispatch()
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
      axiosInstance.get('/client/login',{params:formData})
      .then((res)=>{
        console.log(res)
        if(res.data.message==="login success")
        {
          toast.success(res.data.message);
          localStorage.setItem('token', res.data.token);
          dispatch(setUser(res.data.data));
          navigate('/');
        }else{
          toast.error(res.data.message);
        }
      
      }).catch((error)=>{
        toast.error(error.message)
      })
      
    } catch (error) {
      toast.error(error.message);
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto mt-20 flex items-center justify-center ">
      <Toaster/>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
