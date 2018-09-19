import React, { Component } from 'react';
import { Input, Segment, Checkbox, List, Radio } from 'semantic-ui-react';

class Calculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: 10,
            site: true,
            xml: true,
            period: '6',
            region: false,
            price: 0,
            discount_price: 0,
            additional_discount: 0,
        };
        this.priceMatrix = {};
        this.discountPlan = {
            "3": 1,
            "6": 0.8,
            "12": 0.85,
            "24": 0.7,
        };
        this.handleUsersChange = this.handleUsersChange.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    handleCheckboxChange = (event, data) => {
        this.setState(state => ({
            [data.name]: !state[data.name]
        }));
        this.calculate();
    }
    handleUsersChange = (event, data) => {
        let users = data.value;
        if (data.value < 3) users = 3;
        if (data.value > 99) users = 99;

        this.setState({
            users: users
        });
        this.calculate();
    }
    handlePeriodChange = (event, data) => {
        this.setState({
            period: data.value
        });
        this.calculate();
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
    componentWillMount () {
        this.setState({
            ...this.props.defaults,
        });
        this.priceMatrix = {
            ...this.props.prices,
        };
    }
    componentDidMount () {
        this.calculate();
    }
    componentDidUpdate () {

    }
    render() {
        return (
            <div>
                <Segment vertical>
                    <div>Количество пользователей</div>
                    <Input icon='users' iconPosition='left' onChange={this.handleUsersChange} value={this.state.users}type="number" />
                </Segment>
                <Segment vertical>
                    <Checkbox label={{ children: 'Готовый сайт агентства' }} onChange={this.handleCheckboxChange} checked={this.state.site} name="site" />
                    <Checkbox label={{ children: 'XML-фиды для выгрузки на площадки' }} onChange={this.handleCheckboxChange} checked={this.state.xml} name="xml" />
                </Segment>
                <Segment vertical>
                    <p>Хотите скидку? Заплатите за</p>
                    <List horizontal>
                        <List.Item>
                            <Radio
                                label='Квартал'
                                name='period'
                                value='3'
                                checked={this.state.period === '3'}
                                onChange={this.handlePeriodChange}
                            />
                        </List.Item>
                        <List.Item>
                            <Radio
                                label='Полгода'
                                name='period'
                                value='6'
                                checked={this.state.period === '6'}
                                onChange={this.handlePeriodChange}
                            />
                        </List.Item>
                        <List.Item>
                            <Radio
                                label='Год'
                                name='period'
                                value='12'
                                checked={this.state.period === '12'}
                                onChange={this.handlePeriodChange}
                            />
                        </List.Item>
                        <List.Item>
                            <Radio
                                label='2 года'
                                name='period'
                                value='24'
                                checked={this.state.period === '24'}
                                onChange={this.handlePeriodChange}
                            />
                        </List.Item>
                    </List>
                </Segment>
                <Segment vertical>
                    <Checkbox label={{ children: 'Работаю в регионе' }} onChange={this.handleCheckboxChange} checked={this.state.region} name="region" />
                </Segment>
                <div>
                    <p>State results:</p>
                    <List bulleted>
                        <List.Item>{this.state.users}</List.Item>
                        <List.Item>{this.state.site + ""}</List.Item>
                        <List.Item>{this.state.xml + ""}</List.Item>
                        <List.Item>{this.state.period}</List.Item>
                        <List.Item>{this.state.region + ""}</List.Item>
                        <List.Item>{this.state.additional_discount}</List.Item>
                        <List.Item>{this.state.price + ""}</List.Item>
                        <List.Item>{this.state.discount_price + ""}</List.Item>
                    </List>
                </div>
            </div>
        );
    }
}

export default Calculator;
