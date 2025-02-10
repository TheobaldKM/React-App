import React, { useEffect, useState } from 'react';
import { Container, Button } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowLeft, faAward } from '@fortawesome/free-solid-svg-icons';
import MainMenu from '../components/MainMenu';

export default function Vouchers() {

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
                        <h1 className="mb-0">Vouchers</h1>
                    </div>
                    <div></div>
                </div>

                <div className="pb-5">
                    <p>Residential ratepayers and residential tenants will be required to obtain a Free Native Plants voucher before visiting a participating retail nursery. </p>

                    <p>Council offers two options to residents wanting to claim their free native plants.</p>

                    <p>1. Visit a library (excluding pop-up libraries), mobile library, Regional Business Centre or ward office and present a paid rates notice or written authority from the current financial year from the property owner or property manager. Public housing and Defence Housing residents must provide evidence of a recent rental payment.</p>

                    <p>You will receive an approved stamped Free Native Plants voucher.</p>

                    <p>Visit a participating retail nursery and exchange your voucher for two free native plants</p>


                    <p>2. Visit Council’s Downfall Creek Bushland Centre at Chermside West or Karawatha Forest Discovery Centre at Karawatha with your paid rates notice or written authority from the current financial year from the property owner or property manager. </p>

                    <p>You will be able to receive your 2 free native plants from the Council display stand. </p>

                </div>
            </Container>

        </main>
    );
}
