import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers/UserSlice';
import userReducer from './reducers/UserSlice'
import postReducer from './reducers/postSlice'
const store = configureStore({
  reducer:{
    user:userReducer,
    posts:postReducer
  }
});

export default store;
