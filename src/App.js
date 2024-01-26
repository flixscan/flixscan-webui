import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/pages/Dashboard';
import Epaper from './components/pages/Epaper';
import Organization from './components/pages/Organization';
import Store from './components/pages/Store';
import Rack from './components/pages/Rack';
import Area from './components/pages/Area';
import Template from './components/pages/Template/Template';
import Product from './components/pages/Product';
import User from './components/pages/User';
import Role from './components/pages/Role';
import Login from './components/pages/Auth/Login';
import Main from './components/common/Main';
import Register from './components/pages/Auth/Register';
import Setting from './components/pages/Setting';
import NotFound from './components/pages/NotFound';
import "./style.css"

const App = () => {
  // Check if there is a value in local storage for 'isLoggedIn'
  const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
  const [isLoggedIn, setLoggedIn] = useState(initialLoggedInState);
 
  // Update local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    // Set the isLoggedIn state to true upon successful login
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Simulate a logout action
    setLoggedIn(false);
    // Remove the login status from localStorage
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <BrowserRouter>
      {isLoggedIn ? (<Main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/epaper" element={<Epaper />} />
          <Route path="/template" element={<Template />} />
          <Route path="/product" element={<Product />} />
          <Route path="/rack" element={<Rack />} />
          <Route path="/area" element={<Area />} />
          <Route path="/store" element={<Store />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/user" element={<User />} />
          <Route path="/role" element={<Role />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>) : (<Routes>
        <Route>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>)}
      
    </BrowserRouter>
  );
}

export default App;
