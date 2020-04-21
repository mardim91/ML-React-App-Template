import React, { Component } from 'react';
//import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';



class GermanyScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        HomeTeam: 'FC Bayern Munich',
        AwayTeam: 'Borussia Dortmund',
        Season: '2014/2015'
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/germanyscore/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    
    var bund_needed_teams = ['1. FC Kaiserslautern', '1. FC Köln', '1. FC Nürnberg', '1. FSV Mainz 05', 'Bayer 04 Leverkusen', 
                         'Borussia Dortmund', 'Borussia Mönchengladbach', 'DSC Arminia Bielefeld', 'Eintracht Braunschweig', 
                         'Eintracht Frankfurt', 'FC Augsburg', 'FC Bayern Munich', 'FC Energie Cottbus', 'FC Ingolstadt 04', 
                         'FC Schalke 04', 'FC St. Pauli', 'Fortuna Düsseldorf', 'Hamburger SV', 'Hannover 96', 
                         'Hertha BSC Berlin', 'Karlsruher SC', 'SC Freiburg', 'SC Paderborn 07', 'SV Darmstadt 98', 
                         'SV Werder Bremen', 'SpVgg Greuther Fürth', 'TSG 1899 Hoffenheim', 'VfB Stuttgart', 'VfL Bochum', 
                         'VfL Wolfsburg']

    var bund_seasons = ['2014/2015','2015/2016']
    
    var seasons = []
    for (var i = 0; i < bund_seasons.length; i++) {
      seasons.push(<option key = {bund_seasons[i]} value = {bund_seasons[i]}>{bund_seasons[i]}</option>);
    }

    var HomeTeams = []
    for (var i = 0; i < bund_needed_teams.length; i++) {
      HomeTeams.push(<option key = {bund_needed_teams[i]} value = {bund_needed_teams[i]}>{bund_needed_teams[i]}</option>);
    }

    var AwayTeams = []
    for (var i = 0; i < bund_needed_teams.length; i++) {
      AwayTeams.push(<option key = {bund_needed_teams[i]} value = {bund_needed_teams[i]}>{bund_needed_teams[i]}</option>);
    }


    return (
      <Container>
        <div>
          <h1 className="title">Germany Score</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Home Team</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.HomeTeam} 
                  name="HomeTeam"
                  onChange={this.handleChange}>
                  {HomeTeams}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
              <Form.Label>Away Team</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.AwayTeam}
                  name="AwayTeam"
                  onChange={this.handleChange}>
                  {AwayTeams}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Season</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.Season}
                  name="Season"
                  onChange={this.handleChange}>
                  {seasons}
                </Form.Control>
              </Form.Group>

            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default GermanyScore;
