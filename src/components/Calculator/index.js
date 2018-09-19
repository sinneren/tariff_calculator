import React, { Component } from 'react';
import { Input, Segment, Checkbox, List, Radio } from 'semantic-ui-react';

class Calculator extends Component {
    constructor(props){
        super(props);
        this.handleUsersChange = this.handleUsersChange.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    handleCheckboxChange = (event, data) => {
        this.props.stateHandle({
            [data.name]: !this.props.tariff[data.name]
        });
    }
    handleUsersChange = (event, data) => {
        let users = data.value;
        if (data.value < 3) users = 3;
        if (data.value > 99) users = 99;

        this.props.stateHandle({
            users: users
        });
    }
    handlePeriodChange = (event, data) => {
        this.props.stateHandle({
            period: data.value
        });
    }
    render() {
        return (
            <div>
                <Segment vertical>
                    <div>Количество пользователей</div>
                    <Input icon='users' iconPosition='left' onChange={this.handleUsersChange} value={this.props.tariff.users}type="number" />
                </Segment>
                <Segment vertical>
                    <Checkbox label={{ children: 'Готовый сайт агентства' }} onChange={this.handleCheckboxChange} checked={this.props.tariff.site} name="site" />
                    <Checkbox label={{ children: 'XML-фиды для выгрузки на площадки' }} onChange={this.handleCheckboxChange} checked={this.props.tariff.xml} name="xml" />
                </Segment>
                <Segment vertical>
                    <p>Хотите скидку? Заплатите за</p>
                    <List horizontal>
                        <List.Item>
                            <Radio
                                label='Квартал'
                                name='period'
                                value='3'
                                checked={this.props.tariff.period === '3'}
                                onChange={this.handlePeriodChange}
                            />
                        </List.Item>
                        <List.Item>
                            <Radio
                                label='Полгода'
                                name='period'
                                value='6'
                                checked={this.props.tariff.period === '6'}
                                onChange={this.handlePeriodChange}
                            />
                        </List.Item>
                        <List.Item>
                            <Radio
                                label='Год'
                                name='period'
                                value='12'
                                checked={this.props.tariff.period === '12'}
                                onChange={this.handlePeriodChange}
                            />
                        </List.Item>
                        <List.Item>
                            <Radio
                                label='2 года'
                                name='period'
                                value='24'
                                checked={this.props.tariff.period === '24'}
                                onChange={this.handlePeriodChange}
                            />
                        </List.Item>
                    </List>
                </Segment>
                <Segment vertical>
                    <Checkbox label={{ children: 'Работаю в регионе' }} onChange={this.handleCheckboxChange} checked={this.props.tariff.region} name="region" />
                </Segment>
            </div>
        );
    }
}

export default Calculator;
