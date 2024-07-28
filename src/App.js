import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import { Routes,Route } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Explore from './pages/Explore';
import Create from './pages/Create';
import Profile from './pages/Profile';
import { Suspense,lazy } from 'react';
function App() {
  const Home = lazy(() => import('./pages/Home'));
  return (
    <div className="App">
      <Header/>
      <Suspense fallback={<div className="text-gray-700">Loading...</div>}>
      <Routes>
        
        <Route element={<Home/>} path='/'></Route>
        <Route element={<Explore/>} path='/explore'></Route>
        <Route element={<Create/>} path='/create'></Route>
        <Route element={<Profile/>} path='/profile'></Route>
        <Route element={<Login/>} path='/login'></Route>
        <Route element={<Register/>} path='/register'></Route>
       
      </Routes>
       </Suspense>
    </div>
  );
}

export default App;
