import './App.css';
import Weather from './components/Weather';
// import Header from './components/Header';
// import Charts from './components/Charts';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/profile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { auth } from './components/firebase';
import ParallaxComp from './components/ParallaxComp';


function App() {
  const [user, setUser] =useState("");
  useEffect(() =>
  {
    auth.onAuthStateChanged((user) => setUser(user))
  })

  return (
    <Router>
      <div className="min-h-screen bg-blue-100 flex flex-col justify-centre">
        <div className='aut-wrapper'>
          <div className='auth-inner'>
          <Routes>
            <Route path="/" element ={ user ? <Navigate to={"/home"}/> :  <Login/>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Weather />} />
            <Route path='/profile' element={<Profile />}/>
            <Route path='/parallax' element={<ParallaxComp />}/>
          </Routes>
            
          </div>
        </div>
    </div>
    </Router>
  );
}

export default App;
