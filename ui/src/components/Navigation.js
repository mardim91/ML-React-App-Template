import React from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function Navigation(){
    return (
    <React.Fragment>
    <Navbar bg="dark" variant="dark">
       <Navbar.Brand href="/">Football Predictions</Navbar.Brand>
       <Nav className="mr-auto">
      <Nav.Link href="/engoutc">England Outcome</Nav.Link>
      <Nav.Link href="/engscore">England Score</Nav.Link>
      <Nav.Link href="/geroutc">Germany Outcome</Nav.Link>
      <Nav.Link href="/gerscore">Germany Score</Nav.Link>
      </Nav>
      </Navbar>
</React.Fragment>
    );
}

export default Navigation;
