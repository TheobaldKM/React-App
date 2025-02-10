import React, { useState, useEffect } from 'react';
import { Container, Button } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRuler, faCrow, faLeaf, faFan } from '@fortawesome/free-solid-svg-icons';
import sun from '../img/sun.svg';
import raindrop from '../img/raindrop.svg';

export default function AllPlants() {
    const { PlantID } = useParams();

    const [plantName, setPlantName] = useState('');
    const [plantDescription, setPlantDescription] = useState('');
    const [plantAttracts, setPlantAttracts] = useState('');
    const [plantImage, setPlantImage] = useState('');

    const [plantType, setPlantType] = useState('');
    const [plantOtherInstruction, setPlantOtherInstruction] = useState('');
    const [plantHeight, setPlantHeight] = useState('');
    const [plantLightRequirement, setPlantLightRequirement] = useState('');
    const [plantWaterFrequency, setWaterFrequency] = useState('');
    const [plantSeason, setPlantSeason] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const plantResponse = await fetch(`/api/plants/${PlantID}`);
                const plantData = await plantResponse.json();
                console.log("plant data:", plantData);

                setPlantName(plantData.Name);
                setPlantDescription(plantData.Description);
                setPlantAttracts(plantData.Attracts);
                setPlantImage(plantData.PlantPicture);

                const careResponse = await fetch(`/api/plants/${PlantID}/plantcare`);
                const careData = await careResponse.json();
                console.log("care data:", careData);

                setPlantType(careData.PlantType);
                setPlantOtherInstruction(careData.OtherInstructions);
                setPlantHeight(careData.PlantHeight);
                setPlantLightRequirement(careData.LightRequirement);
                setWaterFrequency(careData.WaterFrequency);
                setPlantSeason(careData.Season);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [PlantID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main className="has-menu">
            <Container className="pt-4">
                <div className="align-items-center">
                    <Link to="/AllPlants" className="green-icon">
                        <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                    </Link>
                    <div className="text-center">
                        <h1>{plantName}</h1>
                    </div>
                </div>
            </Container>

            <Container className="pt-4">
                <div className="plant-thumbnail mb-4">
                    {plantImage ? (
                        <img src={`data:image/jpeg;base64,${plantImage}`} alt="" style={{ width: '100%', height: '150' }} />
                    ) : (
                        <div>No Photo Available</div>
                    )}
                    <div className="type-label">{plantType}</div>
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
                                        className={index < parseInt(plantLightRequirement) ? 'active' : 'not-active'}
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
                                        className={index < parseInt(plantWaterFrequency) ? 'active' : 'not-active'}
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
            </Container>
        </main>
    );
}
