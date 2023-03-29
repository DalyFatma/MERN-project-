import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/actions/actionsUser/actionsUser";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import'./SignIn.css'


function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login(
        {
          email: data.get("email"),
          password: data.get("password"),
        },
        navigate
      )
    );
  };
  
  return (
    <>
    <header>
    <nav className='nav-signin'>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href='/login'>Login</a></li>
    </nav>
  </header>
    <section className="hero">
    <div className="background-image">
    <Container className="mt-5 register">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center text">Sign in to your account </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="signup-text">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="signup-text">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
            Sign In
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
            Need an account? <Link className='link' to="/register">Create one</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
    </section>
    </>
  );
}

export default SignIn;
