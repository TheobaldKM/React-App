import React from 'react';
import { Container, Button } from 'reactstrap'; // Import Button component from 'reactstrap'
import { Link } from "react-router-dom";
import logo from "../img/fnpp-logo3.png";
import bcclogo from "../img/Brisbane_City_Council.svg.png";

export default function Home() {
    return (
        <main className="gradient d-flex justify-content-center flex-column text-center">
            <Container className="py-5">
                <Link to="/"><img width="auto" height="210" className="logo" src={logo} alt="" /></Link>
                <div className="py-4">
                    <div className="py-3">
                        <Link to="/login">
                            <Button className="btn btn-green">Login</Button>
                        </Link>
                    </div>
                    <div className="py-3">
                        <Link to="/register">
                            <Button className="btn btn-outline">Register</Button>
                        </Link>
                    </div>
                </div>

                <div className="pt-5">
                    <img width="auto" height="62" src={bcclogo} alt="" />
                </div>
            </Container>
        </main>
    );
}
