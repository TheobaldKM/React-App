import React, { useEffect, useState } from 'react';
import { Container, Button } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowLeft, faAward } from '@fortawesome/free-solid-svg-icons';
import MainMenu from '../components/MainMenu';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from "../img/marker.png";

export default function Nurseries() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Go back one step in history
    };

    const [nurseries, setNurseries] = useState([]);

    useEffect(() => {
        // Fetch suburbs from the backend
        fetch('/api/nurseries')
            .then(response => response.json())
            .then(data => setNurseries(data))
            .catch(error => console.error('Error fetching nurseries:', error));
    }, []);

    useEffect(() => {
        // Initialize map
        const map = L.map('map', {
            scrollWheelZoom: false // Disable scroll wheel zoom
        }).setView([-27.4689, 153.0235], 11);

        // Add tile layer from OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


        // Add markers for suburbs
        nurseries.forEach(nursery => {
            const { Name, Latitude, Longitude, URL } = nursery;

            // Define custom icon
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div class="suburb-circle"><i class="fa fa-location-dot"></i></div>`,
                iconSize: [30, 40], // Size of the icon
                iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
            });

            const marker = L.marker([Latitude, Longitude], { icon: customIcon }).addTo(map);

            // Bind a popup to the marker
            marker.bindPopup(`<a href="${URL}" target="_blank">${Name}</a>`); // Link to /slug
        });

        // Cleanup
        return () => {
            map.remove();
        };
    }, [nurseries]); // Re-render the markers when suburbs change

    return (
        <main className="has-menu">
            <MainMenu></MainMenu>

            <Container className="pt-4">
                <div className="d-flex align-items-center justify-content-between pb-5">
                    <Link onClick={goBack} className="green-icon"><FontAwesomeIcon icon={faArrowLeft} className="icon" /></Link>
                    <div className="text-center">
                        <h1 className="mb-0">Nurseries</h1>
                    </div>
                    <div></div>
                </div>

                <div id="map" style={{ width: '100%', height: '60vh' }}></div>

                <div className="py-5">
                    {nurseries.map(nursery => (
                        <p key={nursery.Name}>
                            <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                            <a href={nursery.URL} target="_blank">{nursery.Name}</a>
                        </p>
                    ))}
                </div>

                <div className="pb-5">
                    <div className="text-center pb-4"><h2>Availability</h2></div>
                    <p>Brisbane City Council offers a variety of plants suitable for all garden types and sizes.</p>
                    <p>While Council endeavours to supply the variety of plant species on offer throughout the year, due to seasonal availability this is not always possible.</p>
                    <p>Note: information contained on this page is intended as a guide only.</p>
                </div>
            </Container>

        </main>
    );
}
