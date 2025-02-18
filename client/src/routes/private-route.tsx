import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { USER } from '../enums/user';

interface TPrivateRoute {
    element:ReactNode;
}

const PrivateRoute = ({ element }:TPrivateRoute) => {
    const userId = sessionStorage.getItem(USER.USER);
  
    return userId ? <>{element}</> : <Navigate to="/" />;
  };

export default PrivateRoute;