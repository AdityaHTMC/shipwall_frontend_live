
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useAppContext } from '../contextApi/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser, getUser } = useAppContext();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            loginUser({ email, password });
            getUser()
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Container className="login-container mt-4 mt-md-0 mt-lg-0">
            <Row className="justify-content-center">
                <Col md={6} className="login-box">
                    <h1 className="text-center mb-4 mt-3">Login</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
