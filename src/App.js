import React, {useState, useEffect} from 'react';
import Lists from './components/Lists';
import Home from './components/Home';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Settings from './components/Settings';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Signup from './components/Signup';
import {NotificationContainer} from 'react-notifications';
function App() {

  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setHasLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <NotificationContainer />
        <Nav hasLoggedIn = {hasLoggedIn} setHasLoggedIn = {setHasLoggedIn}/>
          <Routes>
            <Route path="/home" element={<Home hasLoggedIn = {hasLoggedIn} />} />
            <Route path = "/" element = {<Login hasLoggedIn = {hasLoggedIn} setHasLoggedIn = {setHasLoggedIn}/>}/>
            <Route path = "/lists/:id" element = {<Lists hasLoggedIn = {hasLoggedIn} /> }/>
            <Route path = '/settings' element = {<Settings/>}/>
            <Route path = '/forgotPassword' element = {<ResetPassword hasLoggedIn = {hasLoggedIn} setHasLoggedIn = {setHasLoggedIn} />}/>
            <Route path = '/signup' element = {<Signup hasLoggedIn = {hasLoggedIn} setHasLoggedIn = {setHasLoggedIn}/>}/>
          </Routes>
      </div>
    </Router>
  )
}

export default App
