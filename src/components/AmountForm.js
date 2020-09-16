import React, { Component } from 'react'
import '../App.css'
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.co';
import AlertBox from './AlertBox'
class AmountForm extends Component {


    constructor(props) {
        super(props)
        this.state = {
            duration: '',
            amount: '',
            A1: '1'

        };
        this.onChange = this.onChange.bind(this);
        this.onClickPaymentType = this.onClickPaymentType.bind(this);
    }


    onChange = event => {
        let value = event.target.value
        let key = event.target.name

        this.setState({ [key]: value })

        switch (key) {
            case 'duration':
                this.props.callbackFromParent(key, value);
                if (this.state.amount !== '') this.props.callbackFromParent('flag1', '1')
                break;
            case 'amount':
                value = value.replace('$', '').replace(/,/g, "");

                if (value < 10000) {
                    this.setState({ A1: '0' })
                    this.props.callbackFromParent('E1', '2')
                } else{
                    this.props.callbackFromParent('E1', '0')
                    this.props.callbackFromParent(key, value);
                    this.setState({ A1: '1' })
                    if (this.state.duration !== '') this.props.callbackFromParent('flag1', '1')
                }
                break;
            default: break;
        }

        if (this.state.duration !== '') this.props.callbackFromParent('flag1', '1')
    }

    onClickPaymentType = event => {

        let btnName = event.target.id
        let buttonOne = document.getElementById('OnePayment');
        let buttonRecurrent = document.getElementById('RecurrentPayment');
        let list = document.getElementById('duration')
        switch (btnName) {
            case 'OnePayment':
                buttonOne.disabled = true
                buttonRecurrent.disabled = false
                list.className = 'form-input-hidden'
                this.setState({ 'duration': '1' })
                this.props.callbackFromParent('duration', '1');
                if (this.state.amount !== '') this.props.callbackFromParent('flag1', '1');
                break;
            case 'RecurrentPayment':
                buttonOne.disabled = false
                buttonRecurrent.disabled = true
                list.className = 'form-input'
                list.value = ''
                break;
            default: break;
        }

    }

    render() {
        console.log(this.state)
        return (
            < div className='box-small' >
                <form className='form'>
                    <h1 className='subtitle' >¿Cuánto vas a donar?</h1>
                    <Cleave
                        name='amount'
                        placeholder='Monto en pesos colombianos - COP (Min: $10,000)'
                        options={{
                            numeral: true,
                            numeralPositiveOnly: true,
                            prefix: '$',
                            noImmediatePrefix: true,
                            numeralThousandsGroupStyle: 'thousand',
                            numericOnly: true
                        }}
                        onChange={this.onChange}
                        className='form-input'
                    />
                    <AlertBox display={this.state.A1} textAlert='el monto mínimo son $10,000' />
                    <div className='row'>
                        <div className='column-inner-buttons'>
                            <button
                                id='OnePayment'
                                name='Pago único'
                                className='whiteButton left'
                                value='1'
                                type='button'
                                onClick={this.onClickPaymentType}
                            >Pago único</button>
                        </div>
                        <div className='column-inner-buttons'>
                            <button
                                id='RecurrentPayment'
                                name='Pago recurrente'
                                className='whiteButton right'
                                type='button'
                                onClick={this.onClickPaymentType}
                            >Pago recurrente</button>
                        </div>
                    </div>
                    <div className='row'>
                        <select
                            id='duration'
                            name='duration'
                            onChange={this.onChange}
                            className='form-input-hidden'

                        >
                            <option value="" defaultValue hidden>
                                Selecciona los meses de duración
                             </option>
                            <option value='12'>12 Meses</option>
                            <option value='6'>6 Meses</option>
                            <option value='3'>3 Meses</option>
                            <option value='1'>1 Mes</option>
                        </select>
                    </div>
                </form>
            </div >

        )
    }
}

export default AmountForm