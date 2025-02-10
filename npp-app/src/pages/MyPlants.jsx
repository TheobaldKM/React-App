import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MainMenu from '../components/MainMenu';
import logo from "../img/Logo.png";

export default function MyPlants() {
  const [plants, setPlants] = useState([]);
  const [plantNames, setPlantNames] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPlants = useCallback(() => {
    const token = localStorage.getItem('token');

    return fetch('/api/userPlants', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch plants');
        }
        return response.json();
      })
      .then((data) => {
        setPlants(data);
      })
      .catch((error) => setError(error.message));
  }, []);

  const fetchPlantNames = useCallback(() => {
    return fetch('/api/plants')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch plant names');
        }
        return response.json();
      })
      .then((data) => {
        const nameLookup = {};
        data.forEach((plant) => {
          nameLookup[plant.PlantID] = plant.Name;
        });
        setPlantNames(nameLookup);
      })
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    Promise.all([fetchPlants(), fetchPlantNames()])
      .then(() => setLoading(false))
      .catch((error) => setError(error.message));
  }, [fetchPlants, fetchPlantNames]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.Nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Container className="gradient py-5 text-center">
        <div className="py-5"></div>
        <div className="pt-5 d-flex align-items-center justify-content-center">
          <img width="auto" height="100" src={logo} alt="" />
        </div>
        <div className="pt-2 d-flex align-items-center justify-content-center">
          <p>Loading...</p>
        </div>
      </Container>
    );
  }

  return (
    <main className="has-menu">
      <MainMenu />
      <Container className="pt-4">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="mb-0">My Plants</h1>
          <Link to="/new-plant">
            <Button className="btn btn-green">
              Add New <FontAwesomeIcon icon={faPlus} className="icon" />
            </Button>
          </Link>
        </div>
        <div className="mt-4 search-bar">
          <Input type="text" placeholder="Search..." className="me-2" value={searchQuery} onChange={handleSearchChange} />
        </div>

        <div className="row plant-list pt-5">
          {filteredPlants.map((plant) => (
            <div key={plant.UserPlantsID} className="col-lg-6 py-3">
              <div className="plant-item">
                <Link className="d-block" to={`/plant/${plant.UserPlantsID}`}>
                  {plant.PlantPhoto ? (
                    <img src={`data:image/jpeg;base64,${encodeArrayToBase64(plant.PlantPhoto.data)}`} alt="" style={{ width: '100%', height: '150' }} />
                  ) : (
                    <div>No Photo Available</div>
                  )}
                </Link>
                <div className="px-4 py-3">
                  <h3>{plant.Nickname}</h3>
                  <p>{plantNames[plant.PlantID]}</p>
                </div>
              </div>
            </div>
          ))}
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
