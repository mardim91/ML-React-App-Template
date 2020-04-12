import React, { Component } from 'react';
//import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';



class EnglandOutcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        HomeTeam: 'Arsenal',
        AwayTeam: 'Chelsea',
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
    fetch('http://127.0.0.1:5000/englandoutcome/', 
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
    
    var pl_needed_teams = ['Arsenal', 'Aston Villa', 'Birmingham City', 'Blackburn Rovers', 'Blackpool',
                       'Bolton Wanderers', 'Bournemouth', 'Burnley', 'Cardiff City', 'Chelsea',
                       'Crystal Palace', 'Everton', 'Fulham', 'Hull City', 'Leicester City', 'Liverpool',
                       'Manchester City', 'Manchester United', 'Middlesbrough', 'Newcastle United', 'Norwich City',
                       'Portsmouth', 'Queens Park Rangers', 'Reading', 'Southampton', 'Stoke City', 'Sunderland',
                       'Swansea City', 'Tottenham Hotspur', 'Watford', 'West Bromwich Albion', 'West Ham United',
                       'Wigan Athletic', 'Wolverhampton Wanderers']

    var pl_seasons = ['2014/2015','2015/2016']
    
    var seasons = []
    for (var i = 0; i < pl_seasons.length; i++) {
      seasons.push(<option key = {pl_seasons[i]} value = {pl_seasons[i]}>{pl_seasons[i]}</option>);
    }

    var HomeTeams = []
    for (var i = 0; i < pl_needed_teams.length; i++) {
      HomeTeams.push(<option key = {pl_needed_teams[i]} value = {pl_needed_teams[i]}>{pl_needed_teams[i]}</option>);
    }

    var AwayTeams = []
    for (var i = 0; i < pl_needed_teams.length; i++) {
      AwayTeams.push(<option key = {pl_needed_teams[i]} value = {pl_needed_teams[i]}>{pl_needed_teams[i]}</option>);
    }


    return (
      <Container>
        <div>
          <h1 className="title">England Outcome</h1>
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

export default EnglandOutcome;

