import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChatPage from '../pages/chat-page';
import LoginPage from '../pages/login-page';
import NotFoundPage from '../pages/not-found-page';
import PrivateRoute from './private-route';
import PublicRoute from './public-route';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PublicRoute element={<LoginPage/>} />} />
                <Route path="/chat-page" element={<PrivateRoute element={<ChatPage/>} />} />
                <Route path="*" element={<PublicRoute element={<NotFoundPage/>} />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;