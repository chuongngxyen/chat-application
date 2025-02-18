import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { USER } from '../enums/user';

interface IPublicRoute {
    element: ReactNode;
}

const PublicRoute = ({ element }: IPublicRoute) => {
    const userId = sessionStorage.getItem(USER.USER);

    return userId ? <Navigate to="/" /> : <>{element}</>;

}

export default PublicRoute;