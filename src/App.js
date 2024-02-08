// src/App.js

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import UserDetails from './UserDetails';
import './App.css';



function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [editedUserData, setEditedUserData] = useState({});
    const [message, setMessage] = useState('');

    // src/App.js

    const handleLogin = async (loginData) => {
        try {
            console.log(loginData);
            const response = await fetch('api/login', { // Correct the backend URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
    
            // Parse the response JSON directly using response.json() method
            const data = await response.json();
    
            if (data.success) {
                setIsLoggedIn(true);
                setUserData(data.user);
            }
    
            setMessage(data.message);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
    
    
    const handleSignup = async (signupData) => {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupData)
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`/api/user/${userData.email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedUserData)
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Error editing user details:', error);
        }
    };
    

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData({});
        setEditedUserData({});
        setMessage('');
    };

    return (
        <div className="App">
            {!isLoggedIn ? (
                <LoginForm onLogin={handleLogin} onSignup={handleSignup} message={message} />
            ) : (
                <UserDetails
                    userData={userData}
                    editedUserData={editedUserData}
                    onEdit={handleEdit}
                    onLogout={handleLogout}
                    setEditedUserData={setEditedUserData}
                    message={message}
                />
            )}
        </div>
    );
}

export default App;
