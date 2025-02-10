import React, { useState, useEffect } from 'react';
import { Container, Button, Input } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import MainMenu from '../components/MainMenu';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUser } from '../UserContext';

export default function NewPlant() {
    const { userId } = useUser();
    const [badgeId, setBadgeId] = useState(1);
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();
    const [plantOptions, setPlantOptions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSuburb, setSelectedSuburb] = useState(null);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [suburbs, setSuburbs] = useState([]);
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        // Fetch plant names from the backend
        const fetchPlantNames = async () => {
            try {
                const response = await fetch('/api/plants/names');
                if (response.ok) {
                    const data = await response.json();
                    console.log('Raw plant data:', data);
                    if (Array.isArray(data)) {
                        const plantOptionsArray = data.map(plant => ({ value: plant.PlantID, label: plant.Name }));
                        setPlantOptions(plantOptionsArray);
                    } else {
                        console.error('Expected an array but got:', typeof data);
                    }
                } else {
                    console.error('Failed to fetch plant names');
                }
            } catch (error) {
                console.error('Error occurred while fetching plant names:', error.message);
            }
        };
    
        // Fetch suburbs from the backend
        const fetchSuburbs = async () => {
            try {
                const response = await fetch('/api/suburbs');
                if (response.ok) {
                    const data = await response.json();
                    // Map the suburbs array to the format expected by the Select component
                    const formattedSuburbs = data.map(suburb => ({ value: suburb.SuburbID, label: suburb.SuburbName }));
                    setSuburbs(formattedSuburbs);
                } else {
                    console.error('Failed to fetch suburbs data');
                }
            } catch (error) {
                console.error('Error occurred while fetching suburbs data:', error.message);
            }
        };
    
        fetchPlantNames();
        fetchSuburbs();
    }, []);
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');

            const headers = {
                'Authorization': `Bearer ${token}`
            };

            const formData = new FormData();
            formData.append('PlantName', selectedPlant.value);
            formData.append('Nickname', nickname);
            formData.append('Date', selectedDate);
            formData.append('Suburb', selectedSuburb.label);
            formData.append('PlantPhoto', selectedImage);

            const response = await fetch('/api/userPlants', {
                method: 'POST',
                headers: headers,
                body: formData
            });

            // Get all user plants
            const userPlants = await fetch('/api/userPlants', {
                method: 'GET',
                headers: headers
            });

            if (response.ok) {
                console.log('Plant added successfully\n');

                const responseData = await userPlants.json(); // Parse the response body as JSON
                const numberOfObjects = responseData.length;

                // Check if the user has added their 5th plant
                if (numberOfObjects === 5) {
                    alert("Congratulations! You've added 5 plants and earned a Green Thumb badge!");
                    // Make a POST request to add a badge to UserBadges
                    const badgeResponse = await fetch('/api/badges/user-badges', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json' // Ensure that the Content-Type header is set to application/json
                        },
                        body: JSON.stringify({ userID: userId, badgeID: badgeId })
                    });

                    if (badgeResponse.ok) {
                        console.log('Badge added successfully');
                    } else {
                        console.error('Failed to add badge:', badgeResponse.statusText);
                    }
                }
            } else {
                console.error('Failed to add plant:', response.statusText);
            }
            setRedirect(true);
        } catch (error) {
            console.error('Error occurred while adding plant:', error.message);
        }
    };

    useEffect(() => {
        if (redirect) {
            navigate('/plants');
        }
    }, [redirect]);

    return (
        <main className="has-menu">
            <MainMenu />

            <Container className="pt-4">
                <div className="d-flex align-items-center justify-content-between">
                    <Link to="/plants" className="green-icon">
                        <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                    </Link>
                    <div className="text-center">
                        <h1 className="mb-0">Add New Plant</h1>
                    </div>
                    <div></div>
                </div>
            </Container>

            <Container className="pt-4">
                <div className="py-3">
                    <Select
                        className="select-container"
                        options={plantOptions}
                        placeholder={<div>Plant Species</div>}
                        value={selectedPlant}
                        onChange={(selectedOption) => setSelectedPlant(selectedOption)}
                    />
                </div>
                <div className="py-3">
                    <Input placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
                <div className="py-3">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select a date"
                    />
                </div>
                <div className="py-3">
                    <Select
                        className="select-container"
                        options={suburbs}
                        placeholder={<div>Suburb</div>}
                        value={selectedSuburb}
                        onChange={(selectedOption) => setSelectedSuburb(selectedOption)}
                    />
                </div>
                <div className="py-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {selectedImage && (
                        <div>
                            <h2>Preview</h2>
                            <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '100%' }} />
                        </div>
                    )}
                </div>

                <div className="pt-5">
                    <div className="py-3 text-center">
                        <Button className="btn btn-green" onClick={handleSubmit}>Add</Button>
                    </div>

                    <div className="py-3 text-center">
                        <Link to="/plants" className="d-block">
                            <Button className="btn btn-outline">Cancel</Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </main>
    );
}
