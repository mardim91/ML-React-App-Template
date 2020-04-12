import React from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function Navigation(){
    return (
    <React.Fragment>
    <Navbar bg="dark" variant="dark">
       <Navbar.Brand href="/">Home</Navbar.Brand>
       <Nav className="mr-auto">
      <Nav.Link href="/engoutc">England Outcome</Nav.Link>
      <Nav.Link href="/engscore">England Score</Nav.Link>
      <Nav.Link href="/geroutc">Germany Outcome</Nav.Link>
      <Nav.Link href="/gerscore">Germany Score</Nav.Link>
      </Nav>
      </Navbar>
      <Container>
<h1 className="title">KATI</h1>
</Container>
</React.Fragment>
    );
}

export default Navigation;
