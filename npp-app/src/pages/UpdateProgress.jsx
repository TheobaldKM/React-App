import React, { useState, useEffect } from 'react';
import { Container, Button, Input } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faCrow, faLeaf } from '@fortawesome/free-solid-svg-icons';

export default function UpdateProgress() {

    const [nickname, setNickname] = useState('');

    // Information coming from parameters
    const { userPlantsID } = useParams();
    const UserID = localStorage.getItem('userId');

    // Fetch plant details including nickname
    useEffect(() => {
        const fetchPlantDetails = async () => {
            try {
                const { nickname } = await fetchUserPlants(userPlantsID);
                setNickname(nickname);
            } catch (error) {
                console.error('Error fetching plant details:', error.message);
            }
        };

        fetchPlantDetails();
    }, [userPlantsID]);

    const [comment, setComment] = useState(''); 
    const [PlantPhoto, setPlantPhoto] = useState(null); 
    const [isPublic, setIsPublic] = useState(false); 
    const [showWildlifeSection, setShowWildlifeSection] = useState(false);
    const [showGrowthSection, setShowGrowthSection] = useState(false);
    const [error, setError] = useState(null);

    const handleWildlifeClick = () => {
        setShowWildlifeSection(true);
        setShowGrowthSection(false); // Hide growth section when wildlife section is clicked
    };

    const handleGrowthClick = () => {
        setShowGrowthSection(true);
        setShowWildlifeSection(false); // Hide wildlife section when growth section is clicked
    };


    const handleUpdate = async () => {
        try {
            // Get UserID from local storage
            const userId = localStorage.getItem('userId');
            const { plantID, plantSuburb } = await fetchUserPlants(userPlantsID);
            const UsernamePromise = fetchUsername();
            const {species} = await fetchPlantSpecies(plantID)
            const Username = await UsernamePromise;

            // Create form data, 
            const formData = new FormData();
            formData.append('UserID', userId);
            formData.append('UserPlantsID', userPlantsID);
            formData.append('PlantID', plantID);
            formData.append('UpdateType', showWildlifeSection ? 'Wildlife' : 'Growth');
            formData.append('Comment', comment);
            formData.append('Date', new Date().toISOString());
            formData.append('Suburb', plantSuburb);
            formData.append('Username', Username);
            formData.append('IsPublic', isPublic.toString()); 
            formData.append('PlantSpecies', species); 
            formData.append('PlantPhoto', PlantPhoto);

            // Send POST request to backend API
            const response = await fetch('/api/plantUpdate', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error adding plant update');
            }

            console.log('Plant update added successfully');
            // Redirect to the plant details page
            window.location.href = `/plant/${userPlantsID}`;

        } catch (error) {
            console.error('Error adding plant update:', error.message);
            // Handle error: show error message to user, retry, etc.
        }
    };
    
    const fetchUsername = async () => {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const users = await response.json();
            const foundUser = users.find(user => user.UserID === parseInt(UserID));
            if (foundUser) {
                return foundUser.Username;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error fetching username:', error.message);
        }
    };

    const fetchUserPlants = async (userPlantsID) => {
        try {
            // Get UserID from local storage
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found');
            }
    
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/userPlants`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch plant details');
            }
    
            const userPlants = await response.json();
            const foundPlant = userPlants.find(plant => plant.UserPlantsID === parseInt(userPlantsID));
            if (foundPlant) {
                return {
                    plantID: foundPlant.PlantID,
                    plantSuburb: foundPlant.Suburb,
                    nickname: foundPlant.Nickname
                }
            }
            else{
                throw new Error('Plant not found');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchPlantSpecies = async (plantID) => {
        try {
            const response = await fetch(`/api/plants/${plantID}`, {
            });
            if (!response.ok) {
                throw new Error('Failed to fetch plant species');
            }
            const foundPlant = await response.json();
            if (foundPlant) {
                return{
                species: foundPlant.Name
                }
            }
            else{
                throw new Error('Plant not found');
            }
        } catch (error) {
            console.error('Error fetching plant species:', error.message);
            return null; 
        }
    };
    

    return (
        <main className="has-menu">
            <Container className="pt-4">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="px-3"></div>
                    <div className="text-center">
                        <h1 className="mb-0">{nickname}</h1>
                        <p>Update Your Plants Profile</p>
                    </div>
                    <Link to={`/plant/${userPlantsID}`} className="green-icon">
                        <FontAwesomeIcon icon={faRemove} className="icon" />
                    </Link>
                </div>
            </Container>
            <Container>
                <div className="update-list-container pt-3">
                    <h2 className="mb-4 text-center">Update Profile</h2>
                </div>
                <div className="py-2 d-flex justify-content-center">
                    <div className="px-5">
                        <button onClick={handleWildlifeClick} className="darkgreen-circle-icon-L">
                            <FontAwesomeIcon icon={faCrow} className="icon" />
                        </button>
                        <div className="py-2 text-center">
                            <p>Wildlife</p>
                        </div>
                    </div>
                    <div className="px-5">
                        <button onClick={handleGrowthClick} className="darkgreen-circle-icon-L">
                            <FontAwesomeIcon icon={faLeaf} className="icon" />
                        </button>
                        <div className="py-2 text-center">
                            <p>Growth</p>
                        </div>
                    </div>
                </div>
            </Container>
            {showWildlifeSection && (
    <UpdateProgressSection
        title="Wildlife"
        handleUpdate={handleUpdate}
        setComment={setComment}
        setPlantPhoto={setPlantPhoto}
        setIsPublic={setIsPublic} 
        comment={comment} 
        PlantPhoto={PlantPhoto} 
        isPublic={isPublic} 
    />
        )}
        {showGrowthSection && (
            <UpdateProgressSection
            title="Growth"
            handleUpdate={handleUpdate}
            setComment={setComment}
            setPlantPhoto={setPlantPhoto}
            setIsPublic={setIsPublic} 
            comment={comment} 
            PlantPhoto={PlantPhoto} 
            isPublic={isPublic} 
            />
        )}
        </main>
    );
}


function UpdateProgressSection({ title, handleUpdate, setComment, setPlantPhoto, setIsPublic, comment, PlantPhoto, isPublic }) {

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Selected image:', file);
            setPlantPhoto(file);
        }
    };

    const handleCommentChange = (e) => {
        const value = e.target.value;
        setComment(value);
    };
    
    const handleIsPublicChange = () => {
        const newValue = !isPublic;
        setIsPublic(newValue);
    };

    return (
        <Container>
            <h1 className="py-3 text-center">{title}</h1>
            <div className="py-3 px-3">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {PlantPhoto && (
                    <div>
                        <h2>Preview</h2>
                        <img
                            src={URL.createObjectURL(PlantPhoto)}
                            alt="Selected"
                            style={{ maxWidth: '100%' }}
                        />
                    </div>
                )}
            </div>
            <Input
                className="py-5"
                type="comment"
                id="comment"
                name="comment"
                placeholder="Add comment here"
                value={comment}
                onChange={handleCommentChange}
            />
            <div className="text-center pt-5">
                <Button className="btn btn-green" onClick={handleUpdate}>Update</Button>
            </div>
            <div className="py-5 d-flex align-items-center justify-content-between">
                <div className="pt-2"></div>
                <div>
                    <div className="px-0">
                        <input type="checkbox" id="to-do-1" checked={isPublic} onChange={handleIsPublicChange} />
                    </div>
                </div>
                <div className="text-center pt-3">
                    <p>Make this update public</p>
                </div>
                <div className="pt-2"></div>
            </div>
        </Container>
    );
}
