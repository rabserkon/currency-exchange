
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import RatesPage from "./pages/RatesPage";
import ConverterPage from "./pages/ConverterPage";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
      <Router >
          <Navbar bg="dark" variant="dark" expand="lg">
              <Container>
                  <Navbar.Brand href="/">Currency App</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                          <Nav.Link as={Link} to="/">Converter</Nav.Link>
                          <Nav.Link as={Link} to="/rates">Exchange rate</Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
        <Routes>
          <Route path="/" element={ <ConverterPage/> }></Route>
            <Route path="/rates" element={ <RatesPage/> }></Route>
        </Routes>
      </Router>
  )
};

export default App;
