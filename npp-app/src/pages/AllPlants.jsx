import React, { useState, useEffect } from 'react';
import { Container, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import MainMenu from '../components/MainMenu';
import logo from "../img/Logo.png";

export default function MyPlants() {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPlants(page);
  }, [page]);

  const fetchPlants = (page) => {
    console.log('Fetching plants...');
    return fetch(`/api/plants?page=${page}&limit=10`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch plants');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Plants data:', data);
        setPlants((prevPlants) => [...prevPlants, ...data.plants]);
        setHasMore(data.hasMore);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching plants:', error);
        setError(error.message);
        setLoading(false);
      }); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const loadMorePlants = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && page === 1) {
    return(
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
          <h1 className="mb-0">All Plants Available Through the BCC Free Native Plants Program</h1>
        </div>
        <div className="mt-4 search-bar">
          <Input type="text" placeholder="Search..." className="me-2" value={searchQuery} onChange={handleSearchChange} />
        </div>

        <InfiniteScroll
          dataLength={filteredPlants.length}
          next={loadMorePlants}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more plants to load</p>}
        >
          <div className="row plant-list pt-5">
            {filteredPlants.map((plant) => (
              <div key={plant.PlantID} className="col-lg-6 py-3">
                <div className="plant-item">
                  <Link className="d-block" to={`/AllPlants/${plant.PlantID}`}>
                    {plant.PlantPicture ? (
                      <img src={`data:image/${plant.ImageFormat};base64,${plant.PlantPicture}`} alt="" style={{ width: '100%', height: '150' }} />
                    ) : (
                      <div>No Photo Available</div>
                    )}
                  </Link>
                  <div className="px-4 py-3">
                    <h3>{plant.Name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
            <Button onClick={() => fetchPlants(page)}>Retry</Button>
          </div>
        )}
      </Container>
    </main>
  );
}
