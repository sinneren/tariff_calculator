import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Calculator from './components/Calculator';
import Options from './components/Options';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor() {
    super();
    this.stateHandle = this.stateHandle.bind(this);
    this.state = {
      users: 10,
      site: true,
      xml: true,
      period: '6',
      region: false,
      price: 0,
      discount_price: 0,
      additional_discount: 0.05,
    };
    this.priceMatrix = {
        rent: [2290, 1790, 1259, 990, 820, 700, 620, 590, 565, 547, 540, 449, 399],
        site: 1490,
        xml: 1490,
        region: 0.9,
        support: 1.07,
    };
    this.discountPlan = {
      "3": 1,
      "6": 0.85,
      "12": 0.8,
      "24": 0.7,
    };
  }
  stateHandle (props) {
    this.setState({
      ...props
    },
    this.calculate)
  }
  calculate = () => {
    let price = 0;
    let discount_price = 0;
    let discount = 1;

    if (this.state.users < 9) {
      price = this.priceMatrix.rent[this.state.users - 1] * this.state.users;
    } else if (8 < this.state.users < 30) {
      price = this.priceMatrix.rent[8] * this.state.users;
    } else if (29 < this.state.users < 70) {
      price = this.priceMatrix.rent[9] * this.state.users;
    } else if (69 < this.state.users < 100) {
      price = this.priceMatrix.rent[10] * this.state.users;
    }

    if (this.state.site) {
      price += this.priceMatrix.site;
    }

    if (this.state.xml) {
      price += this.priceMatrix.xml;
    }

    if (this.state.region) {
      price = price * this.priceMatrix.region;
    }

    discount = this.discountPlan[this.state.period] + this.state.additional_discount;
    price = ~~(price * this.priceMatrix.support * this.state.period);
    discount_price = ~~(price * discount);

    this.setState({
      price: price,
      discount_price: discount_price,
    });
  }
  componentDidMount() {
    this.calculate();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tariff calculator on React</h1>
        </header>
        <Container>
          <Calculator
            tariff={this.state}
            stateHandle={this.stateHandle}
          />
          <Options tariff={this.state} discounts={this.discountPlan} />
        </Container>
      </div>
    );
  }
}

export default App;
