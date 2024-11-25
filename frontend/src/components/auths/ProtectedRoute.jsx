import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        console.log('useEffectの中');
        const checkAuth = async () => {
            const response = await fetch('http://localhost:3000/api/auth_check', {
                credentials: 'include', // セッション情報を送信
            });
            const data = await response.json();
            console.log('data: ', data);
            setIsAuthenticated(data.authenticated);
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // 認証状態が判明するまでローディング表示
    }
    console.log('isAuthenticated: ', isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
