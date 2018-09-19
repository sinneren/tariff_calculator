import React, { Component } from 'react';
import Calculator from './components/Calculator';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

class App extends Component {
  constructor() {
    super();
    this.defaultState = {
      users: 4,
    };
    this.priceMatrix = {
        rent: [2290, 1790, 1259, 990, 820, 700, 620, 590, 565, 547, 540, 449, 399],
        site: 1490,
        xml: 1490,
        region: 0.9,
        support: 1.07,
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Tariff calculator on React</h1>
        </header>
        <Container>
          <Calculator
            defaults={this.defaultState}
            prices={this.priceMatrix}
          />
        </Container>
      </div>
    );
  }
}

export default App;
