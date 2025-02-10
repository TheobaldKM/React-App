import React, { useEffect, useState } from 'react';
import { Container, Button } from 'reactstrap';
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faAward, faTrophy, faSeedling } from '@fortawesome/free-solid-svg-icons';
import 'leaflet/dist/leaflet.css';

function SuburbDetails() {
    const [suburbData, setSuburbData] = useState(null);
    const [ranking, setRanking] = useState(null);
    const [loading, setLoading] = useState(true);
    const { suburbSlug } = useParams();

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchSuburbData = async () => {
            try {
                // Fetch individual suburb data
                const response = await fetch(`/api/suburbs/${suburbSlug}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch suburb data');
                }
                const data = await response.json();
                setSuburbData(data);

                // Fetch leaderboard data
                const leaderboardResponse = await fetch('/api/suburbs/all/leaderboard');
                if (!leaderboardResponse.ok) {
                    throw new Error('Failed to fetch leaderboard data');
                }
                const leaderboardData = await leaderboardResponse.json();

                // Find the ranking of the specific suburb
                const suburbRanking = leaderboardData.find(suburb => suburb.SuburbCode === data.SuburbCode);
                setRanking(suburbRanking ? suburbRanking.ranking : 'Not Ranked');

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchSuburbData();
    }, [suburbSlug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!suburbData) {
        return <div>Suburb not found</div>;
    }

    return (
        <main className="has-menu">
            <Container className="pt-4">
                <div className="d-flex align-items-center justify-content-between pb-4">
                    <Link onClick={goBack} className="green-icon"><FontAwesomeIcon icon={faArrowLeft} className="icon" /></Link>
                    <div className="title">
                        <div className="code">{suburbData.SuburbCode}</div>
                        <h2>{suburbData.SuburbName}</h2>
                    </div>
                    <div></div>
                </div>

                <div className="label-white position-small">
                    <p><FontAwesomeIcon icon={faTrophy} className="icon me-3" /> Current position</p>
                    <p>{ranking}</p>
                </div>

                <div className="label-white position-small">
                    <p><FontAwesomeIcon icon={faSeedling} className="icon me-3" /> Plant Count</p>
                    <p>{suburbData.PlantCount !== null ? suburbData.PlantCount : 'No data available'}</p>
                </div>
            </Container>
        </main>
    );
}

export default SuburbDetails;
