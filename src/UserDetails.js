// src/UserDetails.js
import './UserDetails.css';

import React, { useState, useEffect } from 'react';

function UserDetails({ userData, editedUserData, onEdit, onLogout, setEditedUserData, message }) {
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Set editedUserData to userData when component mounts to fill the form with initial data
        setEditedUserData(userData);
    }, [userData, setEditedUserData]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        onEdit();
        setIsEditing(false);
    };

    const handleLogoutClick = () => {
        onLogout();
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <div className="user-details">
            <h2>User Details</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Username:</td>
                        <td>{userData.username}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{userData.email}</td>
                    </tr>
                    <tr>
                        <td>Age:</td>
                        <td>{userData.age}</td>
                    </tr>
                    <tr>
                        <td>Date of Birth:</td>
                        <td>{userData.dob}</td>
                    </tr>
                    <tr>
                        <td>Contact:</td>
                        <td>{userData.contact}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>{userData.address}</td>
                    </tr>
                </tbody>
            </table>
            <div className="button-container">
                {isEditing ? (
                    <>
                        <h2>Edit User Details</h2>
                        <form onSubmit={handleEditSubmit}>
                            <input type="text" name="username" placeholder="New Username" value={editedUserData.username} onChange={(e) => setEditedUserData({ ...editedUserData, username: e.target.value })} />
                            <input type="email" name="email" placeholder="New Email" value={editedUserData.email} onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })} />
                            <input type="number" name="age" placeholder="New Age" value={editedUserData.age} onChange={(e) => setEditedUserData({ ...editedUserData, age: e.target.value })} />
                            <input type="date" name="dob" placeholder="New Date of Birth" value={editedUserData.dob} onChange={(e) => setEditedUserData({ ...editedUserData, dob: e.target.value })} />
                            <input type="text" name="contact" placeholder="New Contact" value={editedUserData.contact} onChange={(e) => setEditedUserData({ ...editedUserData, contact: e.target.value })} />
                            <textarea name="address" placeholder="New Address" value={editedUserData.address} onChange={(e) => setEditedUserData({ ...editedUserData, address: e.target.value })}></textarea>
                            <button type="submit">Save Changes</button>
                        </form>
                    </>
                ) : (
                    <button onClick={handleEditClick}>Edit</button>
                )}
                <button onClick={handleLogoutClick}>Logout</button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UserDetails;
