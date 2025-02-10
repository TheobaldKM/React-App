import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'leaflet/dist/leaflet.css';

export default function Leaderboard() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    function slugify(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
        str = str.toLowerCase(); // convert string to lowercase
        str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-'); // remove consecutive hyphens
        return str;
    }

    const [suburbs, setSuburbs] = useState([]);

    useEffect(() => {
        // Fetch suburbs from the backend
        fetch(`/api/suburbs/all/leaderboard`)
            .then(response => response.json())
            .then(data => {
                // Filter out suburbs with null ranking
                const filteredSuburbs = data.filter(suburb => suburb.ranking !== null);
                // Sort suburbs by ranking
                const sortedSuburbs = filteredSuburbs.sort((a, b) => parseInt(a.ranking) - parseInt(b.ranking));
                setSuburbs(sortedSuburbs);
            })
            .catch(error => console.error('Error fetching suburbs:', error));
    }, []);

    return (
        <main className="has-menu">
            <Container className="pt-4">
                <div className="d-flex align-items-center justify-content-between">
                    <Link onClick={goBack} className="green-icon"><FontAwesomeIcon icon={faArrowLeft} className="icon" /></Link>
                    <div className="text-center">
                        <h1 className="mb-0">Community</h1>
                    </div>
                    <div></div>
                </div>
            </Container>

            <Container className="pt-4">
                <h2 className="mb-4">Leaderboard</h2>

                {suburbs.map((suburb, index) => (
                    <div key={suburb.SuburbStatID}>
                        <Link to={`/suburb/${slugify(suburb.SuburbName)}`} className={index === 0 ? 'location first' : (index === 1 ? 'location second' : (index === 2 ? 'location third' : 'location'))}>
                            <div className="title">
                                <div className="code">{suburb.SuburbCode}</div>
                                <h3>{suburb.SuburbName}</h3>
                            </div>
                            <div className="icons">
                                <div className="position">{suburb.ranking}</div>
                            </div>
                        </Link>
                    </div>
                ))}

            </Container>

        </main>
    );
}
