import React, { useState } from 'react';
import { Container, Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import logo from "../img/fnpp-logo3.png";
import bcclogo from "../img/Brisbane_City_Council.svg.png";
import { Link } from "react-router-dom";

import { useUser } from '../UserContext';

export default function Login() {
    const { setUserId } = useUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            const { token, userId } = await response.json();
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            setUserId(userId);

            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid email or password');
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <main className="gradient d-flex justify-content-center flex-column">
            <Container className="py-5 text-center">
                <div className="pb-5">
                    <h1>Welcome back!</h1>
                </div>
                {error && <Alert color="danger">{error}</Alert>}
                <Form>
                    <FormGroup>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
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
                    <div className="pt-3">
                        <a href="#" className="std-link">Forgot password?</a>
                    </div>
                    <Button className="btn btn-green mt-5" onClick={handleLogin}>Login</Button>
                </Form>
                <div className="pt-4">
                    <p>No account? <a onClick={handleRegister} className="std-link-green">Sign up</a></p>
                </div>
                <div className="pt-5 d-flex align-items-center justify-content-center">
                    <Link to="/"><img width="auto" height="87" className="logo" src={logo} alt="" /></Link>
                    <img width="auto" height="50" src={bcclogo} alt="" />
                </div>
            </Container>
        </main>
    );
}
