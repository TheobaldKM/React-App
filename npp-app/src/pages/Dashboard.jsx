import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Link } from "react-router-dom";
import MainMenu from '../components/MainMenu';

export default function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [recentUpdates, setRecentUpdates] = useState([]);

    const handleViewAllPlants = () => {
        // Redirect to the page where users can view all plants
        navigate('/AllPlants');
    };

    const UserID = localStorage.getItem('userId');
    const [badgeIds, setBadgeIds] = useState([]);
    const token = localStorage.getItem('token');

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

    useEffect(() => {
        const fetchUserBadges = async () => {
            try {
                const response = await fetch(`/api/badges/${UserID}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the authorization token in the request headers
                        'Content-Type': 'application/json' // Set content type to JSON
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user badges');
                }
                const data = await response.json();
                setBadgeIds(data); // Set the entire array of badges
            } catch (error) {
                console.error('Error fetching user badges:', error);
            }
        };

        if (UserID && token) {
            fetchUserBadges(); // Fetch user badges when both userID and token are available
            fetchPublicUpdates();
        }
    }, [UserID, token]);

    // Get the public updates
    const fetchPublicUpdates = async () => {
        try {
            const response = await fetch(`/api/plantUpdate/public`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch public updates');
            }
            const publicUpdates = await response.json();
            console.log(publicUpdates);
            setRecentUpdates(publicUpdates);
        } catch (error) {
            console.error('Error fetching user badges:', error);
        }
    };


    return (
        <main className="has-menu">
            <MainMenu></MainMenu>
            <Container className="py-5">
                <h2>Hello {username}!</h2>
                <div className="badge-count-container py-4">
                    <h2 className="mb-4">My Progress</h2>
                    <div className="row gx-2">
                        {badgeIds != 0 ? badgeIds.map(badge => (
                            <div key={badge.BadgeID} className="col-4 py-1">
                                <div className="badge-count">
                                    <i class={badge.BadgeIcon}></i>
                                    <span>{badge.BadgeName}</span>
                                </div>
                            </div>
                        )) : 'No badges yet. Add plants to earn badges!'}
                    </div>
                </div>

                <div className="my-community py-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h2 className="mb-0">My Community</h2>
                        <div className="blue-badge">Annerley</div>
                    </div>
                    <div className="community-item">
                        <div className="plant-update-container pt-3">
                            {recentUpdates != 0 ? recentUpdates.map(update => (
                                <div key={update.UpdateID}>
                                    <div className="to-do-item">
                                        <img src={`data:image/jpeg;base64,${encodeArrayToBase64(update.Image.data)}`} alt="" />
                                        <div className="ps-4">
                                            <h4>{update.UpdateType} {'Update'} - {update.UserName} in {update.Suburb}</h4>
                                            <h5>{update.Comment}</h5>
                                            <p className="m-0">{new Date(update.Date).toISOString().split('T')[0]}</p>
                                        </div>
                                    </div>
                                </div>
                            )) : 'No updates yet!'}
                        </div>
                    </div>
                </div>

                {/* Link to view all plants from BCC free native plants program */}
                <div className="text-center py-4">
                    <Link to="/AllPlants" className="btn btn-green" onClick={handleViewAllPlants}>View All Available Plants</Link>
                </div>
            </Container>
        </main>
    );
}

// Function to encode array of integers to base64
function encodeArrayToBase64(array) {
    const binaryString = array.map(byte => String.fromCharCode(byte)).join('');
    return btoa(binaryString);

}

