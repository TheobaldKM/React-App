import React, { useEffect, useState } from 'react';
import { Container, Button } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowLeft, faAward, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import MainMenu from '../components/MainMenu';

export default function Eligibility() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Go back one step in history
    };

    return (
        <main className="has-menu">
            <MainMenu></MainMenu>

            <Container className="pt-4">
                <div className="d-flex align-items-center justify-content-between pb-5">
                    <Link onClick={goBack} className="green-icon"><FontAwesomeIcon icon={faArrowLeft} className="icon" /></Link>
                    <div className="text-center">
                        <h1 className="mb-0">Eligibility</h1>
                    </div>
                    <div></div>
                </div>

                <div className="pb-5">
                    <p>The Free Native Plants program is open to residents and entities within the Brisbane Local Government area, including:</p>
                    <ul>
                        <li>residential ratepayers</li>
                        <li>residential tenants</li>
                        <li>residential body corporates</li>
                        <li>schools</li>
                        <li>registered community groups</li>
                        <li>clubs on Council-leased land</li>
                        <li>official citizenship ceremonies</li>
                    </ul>
                    <p>Plants must be planted on private property and are not intended for planting on Council land or to be used for waterway revegetation.</p>
                    <p>Requests for plants applied for but not claimed by 30 June, are unable to be honoured in the following financial year.</p>
                    <p>For full details please visit the website here:</p>
                    <a href='https://www.brisbane.qld.gov.au/clean-and-green/green-home-and-community/sustainable-gardening/free-native-plants-program' atrget="_blank">Free Native Plants program <FontAwesomeIcon icon={faUpRightFromSquare} className="icon" /></a>
                </div>
            </Container>

        </main>
    );
}
