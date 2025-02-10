import React, { useState } from 'react';
import { Container, Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import logo from "../img/fnpp-logo3.png";
import bcclogo from "../img/Brisbane_City_Council.svg.png";
import { Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null); 

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message);
        }
    };

    return (
        <main className="gradient d-flex justify-content-center flex-column">
            <Container className="py-5 text-center">
                <div className="pb-5">
                    <h1>Join the plant community</h1>
                </div>
                {error && <Alert color="danger">{error}</Alert>}
                <Form>
                    <FormGroup>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </FormGroup>
                    <Button className="btn btn-green mt-5" onClick={handleRegister}>Register</Button>
                </Form>
                <div className="pt-4">
                    <p>Have account? <Link to="/login" className="std-link-green">Log in</Link></p>
                </div>
                <div className="pt-5 d-flex align-items-center justify-content-center">
                    <Link to="/"><img width="auto" height="87" className="logo" src={logo} alt="" /></Link>
                    <img width="auto" height="50" src={bcclogo} alt="" />
                </div>
            </Container>
        </main>
    );
}
