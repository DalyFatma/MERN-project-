import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../Redux/actions/actionsUser/actionsUser';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [occupation, setOccupation] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ email, password, name: `${firstName} ${lastName}`,country,occupation,contactInfo },navigate));
  };

  return (
    <>
    <header >
    <nav className='nav-signup'>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href='/login'>Login</a></li>
    </nav>
  </header>
    <section className="signup">
    <div className="background-image-signup">
    <Container className="mt-5 register">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center text">Create an account</h1>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label className="signup-text">First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label className="signup-text">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Row>
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
              <Form.Label className="signup-text">Occupation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="signup-text">Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="signup-text">Contact Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter contact number"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
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
              Sign up
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Already have an account? <Link className='link' to="/login">Sign in</Link>
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
