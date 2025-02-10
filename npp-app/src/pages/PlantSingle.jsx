import React, { useState, useEffect } from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faPencil, faRuler, faCrow, faLeaf, faFan, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import MainMenu from '../components/MainMenu';
import sun from "../img/sun.svg";
import raindrop from "../img/raindrop.svg";

export default function MyPlants() {

    // Set the updates that the user has made to their plants
    const [recentUpdates, setRecentUpdates] = useState([]);
    
    const { userPlantsID } = useParams();
    const [plantID, setPlantID] = useState();
    const [plantSuburb, setPlantSuburb] = useState('');

    const [plantNickname, setPlantNickname] = useState('');
    const [plantName, setPlantName] = useState('');
    const [plantDescription, setPlantDescription] = useState('');
    const [plantAttracts, setPlantAttracts] = useState('');

    const [plantType, setPlantType] = useState('');
    const [plantOtherInstruction, setPlantOtherInstruction] = useState('');
    const [plantHeight, setPlantHeight] = useState('');
    const [plantLightRequirement, setPlantLightRequirement] = useState('');
    const [plantWaterFrequency, setWaterFrequency] = useState('');
    const [plantSeason, setPlantSeason] = useState('');

    const [plantSuburbCode, setPlantSuburbCode] = useState('');
    const [suburbSoil, setSuburbSoil] = useState('');
    const [userPlantImage, setUserPlantImage] = useState(null);


    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const UserID = localStorage.getItem('userId');
    

    const [activeTab, setActiveTab] = useState('tab2');

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    useEffect(() => {
        const fetchUserPlants = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/userPlants', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user plants');
                }

                const userPlants = await response.json();
                const foundPlant = userPlants.find(plant => plant.UserPlantsID === parseInt(userPlantsID));
                if (!foundPlant) {
                    throw new Error('Plant not found');
                }

                setPlantID(foundPlant.PlantID);
                setPlantNickname(foundPlant.Nickname);
                setPlantSuburb(foundPlant.Suburb);
                setLoading(false);
                setUserPlantImage(foundPlant.PlantPhoto);

                // Fetch recent updates after setting userPlantID
                fetchRecentUpdates();

            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserPlants();
    }, [userPlantsID]);

    // Fetch plant data whenever plantID changes
    useEffect(() => {
        const fetchPlants = async () => {
            try {
                if (!plantID) return; // Skip fetching if plantID is not defined

                const token = localStorage.getItem('token');
                const response = await fetch(`/api/Plants/${plantID}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch plants');
                }

                const foundPlantData = await response.json();
                if (!foundPlantData) {
                    throw new Error('Plant Data not found');
                }

                setPlantName(foundPlantData.Name);
                setPlantDescription(foundPlantData.Description);
                setPlantAttracts(foundPlantData.Attracts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPlants();
    }, [plantID]);

// Fetch plant care data whenever plantID changes
useEffect(() => {
    const fetchPlantCare = async () => {
        try {
            if (!plantID) return; // Skip fetching if plantID is not defined

            const token = localStorage.getItem('token');
            const response = await fetch(`/api/plants/${plantID}/plantcare`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch plant care');
            }

            const foundPlantCare = await response.json();
            if (!foundPlantCare) {
                throw new Error('Plant Care not found');
            }

            setPlantType(foundPlantCare.PlantType);
            setPlantOtherInstruction(foundPlantCare.OtherInstructions);
            setPlantHeight(foundPlantCare.PlantHeight);
            setPlantLightRequirement(foundPlantCare.LightRequirement);
            setWaterFrequency(foundPlantCare.WaterFrequency);
            setPlantSeason(foundPlantCare.Season);

            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    fetchPlantCare();
}, [plantID]);

    useEffect(() => {
        const fetchSuburbs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/suburbs', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch Suburb');
                }

                const suburb = await response.json();
                const foundSuburb = suburb.find(suburb => suburb.SuburbName === plantSuburb);
                if (!foundSuburb) {
                    throw new Error('Suburb not found');
                }

                setPlantSuburbCode(foundSuburb.SuburbCode);
                setSuburbSoil(foundSuburb.SuburbSoil);
                
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchSuburbs();
    }, [plantSuburb]);
    
    // Get the Updates that the user has made to their Plants
    const fetchRecentUpdates = async () => {
        try {
            const response = await fetch(`/api/plantUpdate?userPlantsID=${userPlantsID}&userID=${UserID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch recent updates');
            }
            const updates = await response.json();
            console.log(updates)
            setRecentUpdates(updates);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    
    
    return (
        <main className="has-menu">
            <MainMenu></MainMenu>

            <Container className="pt-4">
                <div className="d-flex align-items-center justify-content-between">
                    <Link to="/plants" className="green-icon"><FontAwesomeIcon icon={faArrowLeft} className="icon" /></Link>
                    <div className="text-center">
                        <h1 className="mb-0">{plantNickname}</h1>
                        <p>{plantName}</p>
                    </div>
                    <Link to={`/updatePlant/${userPlantsID}`} className="green-circle-icon"><FontAwesomeIcon icon={faPlus} className="icon" /></Link>
                </div>
            </Container>

            <Container className="pt-4">
                <Nav tabs className="flex-wrap">
                    <NavItem className="col-6">
                        <NavLink
                            className={activeTab === 'tab1' ? 'active' : ''}
                            onClick={() => { toggle('tab1'); }}
                        >
                            <div className={activeTab === 'tab1' ? 'btn btn-green' : 'btn btn-outline'}>Updates</div>
                        </NavLink>
                    </NavItem>
                    <NavItem className="col-6">
                        <NavLink
                            className={activeTab === 'tab2' ? 'active' : ''}
                            onClick={() => { toggle('tab2'); }}
                        >
                            <div className={activeTab === 'tab2' ? 'btn btn-green' : 'btn btn-outline'}>Details</div>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Container>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="tab1">
                    <Container className="pt-4">
                    <div className="plant-update-container pt-3">
                                <h2 className="mb-4 text-center">Plant Updates</h2>
                                {recentUpdates.map(update => (
                                    <div key={update.UpdateID}>
                                            <div className="to-do-item">
                                                <img src={`data:image/jpeg;base64,${encodeArrayToBase64(update.Image.data)}`} alt="" />
                                                <div className="ps-4">
                                                    <h4>{update.UpdateType} {'Update'}</h4>
                                                    <h5>{update.Comment}</h5>
                                                    <p className="m-0">{new Date(update.Date).toISOString().split('T')[0]}</p>
                                                </div>
                                            </div>
                                    </div>
                                ))}
                            </div>
                    </Container>
                </TabPane>
                <TabPane tabId="tab2">
                    <Container className="pt-5">
                        <div className="plant-thumbnail mb-4">
                            {userPlantImage ? (
                                <img src={`data:image/jpeg;base64,${encodeArrayToBase64(userPlantImage.data)}`} alt="" />
                            ) : (
                                <div>No Photo Available</div>
                            )}
                            <div className="type-label">{plantType}</div>
                            <Link to={`/updatePlant/${userPlantsID}`}>
                                <Button className="circle-link"><FontAwesomeIcon icon={faPencil} className="icon" /></Button>
                            </Link>
                        </div>
                        <div className="pb-4">
                            <p>{plantDescription}</p>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="bg_pale-blue p-4 plant-stats">
                                    <p>Light</p>
                                    <div>
                                        {[...Array(5)].map((_, index) => (
                                            <img
                                                key={index}
                                                src={sun}
                                                alt="sun icon"
                                                className={index < parseInt(plantLightRequirement) ? "active" : "not-active"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="bg_pale-yellow p-4 plant-stats">
                                    <p>Water</p>
                                    <div>
                                        {[...Array(5)].map((_, index) => (
                                            <img
                                                key={index}
                                                src={raindrop}
                                                alt="raindrop icon"
                                                className={index < parseInt(plantWaterFrequency) ? "active" : "not-active"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row plant-care-details pt-5">
                            <div className="col-6 d-flex align-items-center py-3">
                                <FontAwesomeIcon icon={faRuler} className="icon" />
                                <p>{plantHeight}</p>
                            </div>
                            <div className="col-6 d-flex align-items-center py-3">
                                <FontAwesomeIcon icon={faLeaf} className="icon" />
                                <p>{plantOtherInstruction}</p>
                            </div>
                            <div className="col-6 d-flex align-items-center py-3">
                                <FontAwesomeIcon icon={faCrow} className="icon" />
                                <p>{plantAttracts}</p>
                            </div>
                            <div className="col-6 d-flex align-items-center py-3">
                                <FontAwesomeIcon icon={faFan} className="icon" />
                                <p>{plantSeason}</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pt-5">
                            <div className="circle-label">{plantSuburbCode}</div>
                            <p class="m-0">{suburbSoil}</p>
                        </div>

                        <div className="text-center pt-5">
                            <Link to={`/AllPlants/${plantID}`} className="d-inline-block">
                                <Button className="btn btn-green">Learn more about species</Button>
                                
                            </Link>
                            <div className = "pt-3">
                            <a href='https://www.brisbane.qld.gov.au/clean-and-green/green-home-and-community/sustainable-gardening/free-native-plants-program/participating-nurseries/native-plant-species-for-residents' atrget="_blank">Brisbane Native Species <FontAwesomeIcon icon={faUpRightFromSquare} className="icon" /></a>
                            </div>
                            
                        </div>

                    </Container>
                </TabPane>
            </TabContent>

        </main>
    );
    
}

// Function to encode array of integers to base64
function encodeArrayToBase64(array) {
    const binaryString = array.map(byte => String.fromCharCode(byte)).join('');
    return btoa(binaryString);

}
