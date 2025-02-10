import React, { useEffect, useState } from 'react';
import { Container, Button } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faAward } from '@fortawesome/free-solid-svg-icons';
import MainMenu from '../components/MainMenu';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from "../img/marker.png";

export default function CommunityMap() {
    function slugify(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
        str = str.toLowerCase(); // convert string to lowercase
        str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-'); // remove consecutive hyphens
        return str;
    }

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Go back one step in history
    };

    const [suburbs, setSuburbs] = useState([]);

    useEffect(() => {
        // Fetch suburbs from the backend
        fetch(`/api/suburbs`)
            .then(response => response.json())
            .then(data => setSuburbs(data))
            .catch(error => console.error('Error fetching suburbs:', error));
    }, []);

    useEffect(() => {
        // Initialize map
        const map = L.map('map', {
            scrollWheelZoom: false // Disable scroll wheel zoom
        }).setView([-27.4689, 153.0235], 12);

        // Add tile layer from OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


        // Add markers for suburbs
        suburbs.forEach(suburb => {
            const { SuburbName, SuburbCode, SuburbLatitude, SuburbLongitude } = suburb;
            const slug = slugify(SuburbName);

            // Define custom icon
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div class="suburb-circle">${SuburbCode}</div>`,
                iconSize: [30, 40], // Size of the icon
                iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
            });

            const marker = L.marker([SuburbLatitude, SuburbLongitude], { icon: customIcon }).addTo(map);

            // Bind a popup to the marker
            marker.bindPopup(`<a href="/suburb/${slug}">${SuburbName}</a>`); // Link to /slug
        });

        // Cleanup
        return () => {
            map.remove();
        };
    }, [suburbs]); // Re-render the markers when suburbs change

    return (
        <main className="has-menu">
            <MainMenu></MainMenu>

            <Container className="pt-4">
                <div className="d-flex align-items-center justify-content-between">
                    <Link onClick={goBack} className="green-icon"><FontAwesomeIcon icon={faArrowLeft} className="icon" /></Link>
                    <div className="text-center">
                        <h1 className="mb-0">Community</h1>
                    </div>
                    <div></div>
                </div>

                <div className="py-5 text-center">
                    <Link to="/leaderboard" className="d-block">
                        <Button className="btn btn-green d-inline-block"><FontAwesomeIcon icon={faAward} className="icon" /> View Leaderboard</Button>
                    </Link>
                </div>

                <div id="map" style={{ width: '100%', height: '100vh' }}></div>
            </Container>

        </main>
    );
}
