import React, { Component } from 'react';
class Options extends Component {
    convertDiscountToPercent(float_input) {
        return Math.round((1 - parseFloat(float_input)) * 100);
    }
    convertAdditionalDiscountToPercent(float_input) {
        return Math.round((parseFloat(float_input)) * 100);
    }
    render() {
        let discount = 0;
        if (this.props.discounts[this.props.tariff.period] !== 1) {
            discount = this.convertDiscountToPercent(this.props.discounts[this.props.tariff.period]);
        }
        return (
            <div>
                <blockquote>
                    Стоимость подписки на ReCRM: {this.props.tariff.users}
                    &nbsp;{(this.props.tariff.users < 5) ? 'пользователя' : 'пользователей'}
                    {(this.props.tariff.region) ? ' для работы с объектами только в регионах' : ''}
                    {(this.props.tariff.xml) ? ' + XML-фиды для выгрузки на площадки' : ''}
                    {(this.props.tariff.site) ? ' + готовый сайт агентства' : ''}
                    &nbsp;сроком на {this.props.tariff.period} {(this.props.tariff.period < 5) ? 'месяца' : 'месяцев'}
                    {(discount !== 0) ? ' (со скидкой ' + discount + ' %)' : ''}
                    {(this.props.tariff.additional_discount > 0) ? ' и дополнительной скидкой ' + this.convertAdditionalDiscountToPercent(this.props.tariff.additional_discount) + ' %': ''}
                    &nbsp;:
                    <div>
                        <p><s>{this.props.tariff.price} ₽</s></p>
                        <p><b>{this.props.tariff.discount_price} ₽</b></p>
                    </div>
                    <div>За 1 пользователя в месяц на выбранном тарифном плане: {this.props.tariff.user_price} ₽</div>
                </blockquote>
            </div>
        )
    }
}
export default Options;