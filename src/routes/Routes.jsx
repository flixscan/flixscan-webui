import React, { useState } from 'react';
import LoginRoute from './LoginRoutes'
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const Routes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <> 
        {isLoggedIn ? <MainRoutes /> : <LoginRoute/>}
        </>
    );
  };
  
  export default  Routes;