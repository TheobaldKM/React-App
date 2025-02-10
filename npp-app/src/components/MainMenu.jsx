import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLeaf, faCompass, faBars } from '@fortawesome/free-solid-svg-icons';
import userProfile from "../img/user-profile.png";

// The menu
export default function MainMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const UserID = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/login');
    };

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const users = await response.json();
                const foundUser = users.find(user => user.UserID === parseInt(UserID));
                if (foundUser) {
                    setUsername(foundUser.Username);
                } else {
                    throw new Error('User not found');
                }
            } catch (error) {
                console.error('Error fetching username:', error.message);
            }
        };

        if (UserID && token) {
            fetchUsername();
        }
    }, [UserID, token]);

    return (
        <div>
            <div className={`overlay-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="container pt-5">
                    <div className="d-flex align-items-center menu-profile">
                        <img className="me-3" src={userProfile} alt="User profile" />
                        <h3>{username}</h3>
                    </div>
                    <div className="pt-3">
                        <h2>Account</h2>
                        <hr className="green" />
                        <div className="pt-3">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    <div className="pt-4">
                        <h2>The Program</h2>
                        <hr className="green" />
                        <div className="pt-3">
                            <Link to="/how-it-works">How it works</Link>
                            <Link to="/nurseries">Participating nurseries</Link>
                            <Link to="/eligibility">Eligibility</Link>
                            <Link to="/vouchers">Vouchers</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-menu d-flex justify-content-between">
                <Link to="/dashboard"><FontAwesomeIcon icon={faHouse} className="icon" /></Link>
                <Link to="/plants"><FontAwesomeIcon icon={faLeaf} className="icon" /></Link>
                <Link to="/community-map"><FontAwesomeIcon icon={faCompass} className="icon" /></Link>
                <div id="nav-icon" className={isOpen ? 'open' : ''} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
}
