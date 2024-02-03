import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loadable from '../components/Loadable';


const Dashboard = Loadable(lazy(() => import('../pages/Dashboard/Dashboard')));
const Epaper = Loadable(lazy(() => import('../pages/Epaper/Epaper')));
const Template = Loadable(lazy(() => import('../pages/Template/Template')));
const Product = Loadable(lazy(() => import('../pages/Product/Product')));
const Rack = Loadable(lazy(() => import('../pages/Rack/Rack')));
const Area = Loadable(lazy(() => import('../pages/Area/Area')));
const Store = Loadable(lazy(() => import('../pages/Store/Store')));
const Organization = Loadable(lazy(() => import('../pages/Organization/Organization')));
const User = Loadable(lazy(() => import('../pages/User/User')));
const Role = Loadable(lazy(() => import('../pages/User/Role')));
const Setting = Loadable(lazy(() => import('../pages/Setting/Setting')));
const NotFound = Loadable(lazy(() => import('../pages/NotFound')));

const Main = Loadable(lazy(() => import('../common/Main'))); // Make sure you have a Main component

const MainRoute = () => {
  //  // Check if there is a value in local storage for 'isLoggedIn'
  // //  const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
  // //  const [isLoggedIn, setLoggedIn] = useState(initialLoggedInState);

  //  // Update local storage whenever the state changes
  // //  useEffect(() => {
  // //    localStorage.setItem('isLoggedIn', isLoggedIn);
  // //  }, [isLoggedIn]);

  //  const handleLogin = () => {
  //    // Set the isLoggedIn state to true upon successful login
  //   //  setLoggedIn(true);
  //  };

  //  const handleLogout = () => {
  //    // Simulate a logout action
  //   //  setLoggedIn(false);
  //   //  // Remove the login status from localStorage
  //   //  localStorage.removeItem('isLoggedIn');
  //  };

  return (
    <Main>
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
    </Main>
  );
};

export default MainRoute;