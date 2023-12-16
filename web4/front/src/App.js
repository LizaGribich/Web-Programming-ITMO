import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [loginProcessed, setLoginProcessed] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setIsLoggedIn(true);
            setLoginProcessed(true);
            setToken(storedToken);
        }
    }, []);

    const handleLogin = (success, token) => {
        setIsLoggedIn(success);
        if (success) {
            setToken(token);
            localStorage.setItem('token', token);
            setLoginProcessed(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setToken(null);
        setLoginProcessed(false);
    };

    return (
        <Router basename="/web4">
            <Routes>
                <Route path="/login" element={isLoggedIn ? <Navigate to="/"/> : <LoginPage onLogin={handleLogin}/>}/>
                <Route path="/" element={loginProcessed ? <MainPage token={token} onLogout={handleLogout}/> :
                    <Navigate to="/login"/>}/>
            </Routes>
        </Router>
    );
};

export default App;
