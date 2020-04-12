import React, { Component } from 'react';
import {Route, Link } from 'react-router-dom';

import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
 
import EnglandOutcome from './components/EnglandOutcome';
import GermanyOutcome from './components/GermanyOutcome';
import EnglandScore from './components/EnglandScore';
import GermanyScore from './components/GermanyScore';
import Navigation from './components/Navigation';
 
function App() {
    return (
        <div className="App">
             <Navigation />
             <Route exact path="/engoutc" component={EnglandOutcome} />
             <Route exact path="/engscore" component={EnglandScore} />
             <Route exact path="/geroutc" component={GermanyOutcome} />
             <Route exact path="/gerscore" component={GermanyScore} />
        </div> 
    );
  
}
 
export default App;
