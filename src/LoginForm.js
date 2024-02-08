// src/LoginForm.js
import './signup.css';
import React, { useState } from 'react';

function LoginForm({ onLogin, onSignup, message }) {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ 
        username: '', 
        email: '', 
        password: '', 
        age: '', 
        dob: '', 
        contact: '', 
        address: '' 
    });
    const [showLogin, setShowLogin] = useState(true); // State variable to track which form to display

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        onLogin(loginData);
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        onSignup(signupData);
    };

    const toggleForm = () => {
        setShowLogin(!showLogin); // Toggle between login and signup forms
    };

    return (
        <div className="login-form">
            {showLogin ? (
                <>
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                        <button type="submit">Login</button>
                    </form>
                    <p>Don't have an account? <button onClick={toggleForm}>Signup</button></p>
                </>
            ) : (
                <>
                    <h2>Signup</h2>
                    {message && <p>{message}</p>}
                    <form onSubmit={handleSignupSubmit}>
                        <input type="text" name="username" placeholder="Username" value={signupData.username} onChange={(e) => setSignupData({ ...signupData, username: e.target.value })} />
                        <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
                        <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
                        <input type="number" name="age" placeholder="Age" value={signupData.age} onChange={(e) => setSignupData({ ...signupData, age: e.target.value })} />
                        <input type="date" name="dob" placeholder="Date of Birth" value={signupData.dob} onChange={(e) => setSignupData({ ...signupData, dob: e.target.value })} />
                        <input type="text" name="contact" placeholder="Contact" value={signupData.contact} onChange={(e) => setSignupData({ ...signupData, contact: e.target.value })} />
                        <textarea name="address" placeholder="Address" value={signupData.address} onChange={(e) => setSignupData({ ...signupData, address: e.target.value })}></textarea>
                        <button type="submit">Signup</button>
                    </form>
                    <p>Already have an account? <button onClick={toggleForm}>Login</button></p>
                </>
            )}
          
        </div>
    );
}

export default LoginForm;
