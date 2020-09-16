import React, { Component } from 'react'
import '../App.css'
import Countries from '../data/countries.json'
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.co';
import AlertBox from './AlertBox'



class CardForm extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            month = (today.getMonth() + 1),
            year = (today.getYear() - 100);
        this.state = {
            A1: '0', cardNumber: '',
            A2: '0', expMonth: '', expYear: '',
            A3: '0', cardType: '',
            A4: '0', cvv: '',
            A5: '0', cardOwner: '',
            A6: '0', idOwnerNumber: '',
            A7: '0', ownerEmail: '',
            A8: '0', address: '',
            A9: '1', country: '',
            A10: '0', A12: '0', city: '',
            A11: '0', phoneNumber: '',
            date: '',
            month: month,
            year: year,
        }
        this.onChange = this.onChange.bind(this);
        this.onCreditCardTypeChanged = this.onCreditCardTypeChanged.bind(this);
    }
    onCreditCardTypeChanged(type) {
        switch (type) {
            case 'visa':
                type = 'VISA';
                break;
            case 'mastercard':
                type = 'MASTERCARD';
                break;
            case 'diners':
                type = 'DINERS';
                break;
            case 'amex':
                type = 'AMEX';
                break;
            default:
                type = '';
                break;
        }
        this.setState({ 'cardType': type })
        this.props.callbackFromParent('cardType', type)
    }

    onSubmit = (event) => {
        this.props.onSubmitButtonApp();
    }

    onChange = event => {
        let value = event.target.value
        let key = event.target.name

        this.setState({ [key]: value })

        switch (key) {
            case 'cardNumber':
                if ((event.target.rawValue).length >= 14) {
                    this.props.callbackFromParent(key, event.target.rawValue);
                    this.setState({ A1: '0' })
                    if (this.check(key)) {
                        this.props.callbackFromParent('flag3', '1')
                    } else { this.props.callbackFromParent('flag3', '0') }
                }
                else {
                    this.props.callbackFromParent(key, '');
                    this.setState({ A1: '1' })
                }
                break;
            case 'expDate':
                let x = (value + "").split("/")
                let month = this.state.month
                let year = this.state.year
                let monthIn = parseInt(x[0])
                let yearIn = parseInt(x[1])
                if (monthIn !== 0 && yearIn !== 0) {
                    if (yearIn < year) {

                    } else if (yearIn === year) {
                        if (monthIn > month) {
                            this.setState({ 'expMonth': monthIn });
                            this.setState({ 'expYear': yearIn });
                            this.props.callbackFromParent("expYear", x[1]);
                            this.props.callbackFromParent("expMonth", x[0]);
                            this.setState({ A2: '0' })
                            if (this.check(key)) {
                                this.props.callbackFromParent('flag3', '1')
                            } else { this.props.callbackFromParent('flag3', '0') }
                        } else {
                            this.props.callbackFromParent("expYear", '');
                            this.props.callbackFromParent("expMonth", '');
                            this.setState({ A2: '1' })
                        }
                    } else if (yearIn > year) {
                        this.setState({ 'expMonth': monthIn });
                        this.setState({ 'expYear': yearIn });
                        this.props.callbackFromParent("expYear", x[1]);
                        this.props.callbackFromParent("expMonth", x[0]);
                        this.setState({ A2: '0' })
                        if (this.check(key)) {
                            this.props.callbackFromParent('flag3', '1')
                        }
                    } else {
                        this.props.callbackFromParent("expYear", '');
                        this.props.callbackFromParent("expMonth", '');
                        this.setState({ A2: '1' })
                    }
                }
                break;
            case 'cvv':

                if (value.length > 2) {
                    this.props.callbackFromParent(key, value);
                    this.setState({ A4: '0' })
                    if (this.check(key)) {
                        this.props.callbackFromParent('flag3', '1')
                    } else { this.props.callbackFromParent('flag3', '0') }
                } else {
                    this.props.callbackFromParent(key, '');
                    this.setState({ A4: '1' })
                }
                break;
            case 'cardOwner':
                if (this.ValidateOnlyText(value)) {
                    this.props.callbackFromParent(key, value);

                    this.setState({ A5: '0' })
                    if (this.check(key)) {
                        this.props.callbackFromParent('flag3', '1')
                    } else { this.props.callbackFromParent('flag3', '0') }
                } else {
                    document.getElementById(key).value = ''
                    this.setState({ A5: '1' })
                }
                break;
            case 'idOwnerNumber':
                if (value.length > 5 && value.length < 30) {
                    this.props.callbackFromParent(key, value);
                    this.setState({ A6: '0' })
                    if (this.check(key)) {
                        this.props.callbackFromParent('flag3', '1')
                    } else { this.props.callbackFromParent('flag3', '0') }
                } else this.setState({ A6: '1' })
                break;
            case 'ownerEmail':
                if (this.ValidateEmail(value)) {
                    this.props.callbackFromParent(key, value);
                    this.setState({ A7: '0' })
                    if (this.check(key)) {
                        this.props.callbackFromParent('flag3', '1')
                    } else { this.props.callbackFromParent('flag3', '0') }
                } else this.setState({ A7: '1' })
                break;
            case 'address':
                if (value !== '') this.setState({ A8: '0' })
                else this.setState({ A8: '1' })
                this.props.callbackFromParent(key, value);
                if (this.check(key)) {
                    this.props.callbackFromParent('flag3', '1')
                } else { this.props.callbackFromParent('flag3', '0') }
                break;
            case 'country':
                if (value !== '') this.setState({ A9: '0' })
                else this.setState({ A9: '1' })
                this.props.callbackFromParent(key, value);
                if (this.check(key)) {
                    this.props.callbackFromParent('flag3', '1')
                } else { this.props.callbackFromParent('flag3', '0') }
                break;
            case 'city':
                if (value !== '') this.setState({ A10: '0' })
                else this.setState({ A10: '1' })
                if (this.ValidateOnlyText(value)) {
                    this.setState({ A12: '0' })
                    this.props.callbackFromParent(key, value);
                    if (this.check(key)) {
                        this.props.callbackFromParent('flag3', '1')
                    } else { this.props.callbackFromParent('flag3', '0') }
                } else {
                    this.setState({ A12: '1' })
                    document.getElementById(key).value = ''
                }
                break;
            case 'phoneNumber':
                if (value !== '') this.setState({ A11: '0' })
                else this.setState({ A11: '1' })
                this.props.callbackFromParent(key, value);
                if (this.check(key)) {
                    this.props.callbackFromParent('flag3', '1')
                } else { this.props.callbackFromParent('flag3', '0') }
                break;
            default: break;
        }
    }

    ValidateOnlyText(text) {

        if (/\d/.test(text)) {
            return (false)
        }
        return (true)
    }

    ValidateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9.-]+)$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    check(key) {

        let cardNumber = (this.state.cardNumber !== '');
        let expMonth = (this.state.expMonth !== '');
        let expYear = (this.state.expYear !== '');
        let cardType = (this.state.cardType !== '');
        let cvv = (this.state.cvv !== '');
        let cardOwner = (this.state.cardOwner !== '');
        let idOwnerNumber = (this.state.cardOwner !== '');
        let ownerEmail = (this.state.ownerEmail !== '');
        let address = (this.state.address !== '');
        let country = (this.state.country !== '');
        let city = (this.state.city !== '');
        let phoneNumber = (this.state.phoneNumber !== '');

        //console.log('cardNumber-'+cardNumber+'-expMonth-'+expMonth+'-expYear-'+expYear+'-cardType-'+cardType+'-cvv-'+cvv+'-cardOwner-'+cardOwner+'-idOwnerNumber-'+idOwnerNumber+'-ownerEmail-'+ownerEmail+'-address-'+address+'-country-'+country+'-city-'+city+'-phoneNumber-'+phoneNumber)

        // eslint-disable-next-line
        switch (key) {
            case 'cardNumber':
                return (expMonth && expYear && cardType && cvv && cardOwner && idOwnerNumber && ownerEmail && address && country && city && phoneNumber)
            case 'expDate':
                return (cardNumber && cardType && cvv && cardOwner && idOwnerNumber && ownerEmail && address && country && city && phoneNumber)
            case 'cardType':
                return (cardNumber && expMonth && expYear && cvv && cardOwner && idOwnerNumber && ownerEmail && address && country && city && phoneNumber)
            case 'cvv':
                return (cardNumber && expMonth && expYear && cardType && cardOwner && idOwnerNumber && ownerEmail && address && country && city && phoneNumber)
            case 'cardOwner':
                return (cardNumber && expMonth && expYear && cardType && cvv && idOwnerNumber && ownerEmail && address && country && city && phoneNumber)
            case 'idOwnerNumber':
                return (cardNumber && expMonth && expYear && cardType && cvv && cardOwner && ownerEmail && address && country && city && phoneNumber)
            case 'ownerEmail':
                return (cardNumber && expMonth && expYear && cardType && cvv && cardOwner && idOwnerNumber && address && country && city && phoneNumber)
            case 'address':
                return (cardNumber && expMonth && expYear && cardType && cvv && cardOwner && idOwnerNumber && ownerEmail && country && city && phoneNumber)
            case 'country':
                return (cardNumber && expMonth && expYear && cardType && cvv && cardOwner && idOwnerNumber && ownerEmail && address && city && phoneNumber)
            case 'city':
                return (cardNumber && expMonth && expYear && cardType && cvv && cardOwner && idOwnerNumber && ownerEmail && address && country && phoneNumber)
            case 'phoneNumber':
                return (cardNumber && expMonth && expYear && cardType && cvv && cardOwner && idOwnerNumber && ownerEmail && address && country && city)
        }
    }

    render() {
        return (
            < div className='box-big' >
                <div className='row'>
                    <div className='column-inner'>
                        <form className='box-small-inner'>
                            <h1 className='subtitle' >Información de tu tarjeta</h1>

                            <Cleave
                                name='cardNumber'
                                placeholder="Tu número de tarjeta"
                                options={{
                                    creditCard: true,
                                    onCreditCardTypeChanged: this.onCreditCardTypeChanged
                                }}
                                onChange={this.onChange}
                                className='form-input'
                            />
                            <AlertBox
                                display={this.state.A1}
                                textAlert='La tarjeta debe tener entre 14 y 16 dígitos'
                                textAlign='left' />

                            <div className='row'>
                                <Cleave
                                    name='expDate'
                                    placeholder="MM/AA"
                                    options={{
                                        date: true,
                                        datePattern: ['m', 'y']
                                    }}
                                    onChange={this.onChange}
                                    id='expDate'
                                    className='mmaa'
                                />
                                <Cleave
                                    name='cvv'
                                    placeholder='CVV'
                                    options={{
                                        blocks: [3],
                                        numericOnly: true
                                    }}
                                    onChange={this.onChange}
                                    className='cvv'
                                />
                                <div className='row'>
                                    <AlertBox
                                        display={this.state.A4}
                                        textAlert='El CCV tiene minimo 3 digitos'
                                        textAlign='right' />

                                    <AlertBox
                                        display={this.state.A2}
                                        textAlert='La fecha debe ser posterior a la actual'
                                        textAlign='left' />
                                </div>
                            </div>

                            <input
                                name='cardOwner'
                                id='cardOwner'
                                type='text'
                                onChange={this.onChange}
                                className='form-input'
                                placeholder='Titular de la tarjeta' />
                            <AlertBox
                                display={this.state.A5}
                                textAlert='Por favor indique el nombre del propietario de la tarjeta'
                                textAlign='left' />


                            <Cleave
                                name='idOwnerNumber'
                                placeholder='Número de documento'
                                options={{
                                    blocks: [30],
                                    numericOnly: true
                                }}
                                onChange={this.onChange}
                                className='form-input'
                                id='idOwnerNumber' />
                            <AlertBox
                                display={this.state.A6}
                                textAlert='El documento debe tener entre 5 y 30 caracteres'
                                textAlign='left' />


                            <input
                                name='ownerEmail'
                                id='ownerEmail'
                                type='email'
                                className='form-input'
                                placeholder='Correo electrónico'
                                onChange={this.onChange} />
                            <AlertBox
                                display={this.state.A7}
                                textAlert='Ingrese un correo válido'
                                textAlign='left' />

                        </form>
                    </div>
                    <div className='column-inner'>
                        <form className='box-small-inner'>
                            <h1 className='subtitle-blank' >Información de tu tarjeta</h1>
                            <input
                                id='address'
                                type='text'
                                name='address'
                                className='form-input'
                                placeholder='Dirección '
                                onChange={this.onChange} />
                            <AlertBox
                                display={this.state.A8}
                                textAlert='Campo obligatorio'
                                textAlign='left' />

                            <select className='form-input'
                                id='country'
                                name='country'
                                onChange={this.onChange}>


                                <option value="" defaultValue hidden>
                                    País
                                </option>
                                {Countries.map((countriesDetail, index) => {
                                    return <option key={index} value={countriesDetail.iso2} >{countriesDetail.name} </option>
                                })}
                            </select>
                            <AlertBox
                                display={this.state.A9}
                                textAlert='Por favor elija un país'
                                textAlign='left' />

                            <input
                                id='city'
                                type='text'
                                name='city'
                                className='form-input'
                                placeholder='Ciudad'
                                onChange={this.onChange} />
                            <AlertBox
                                display={this.state.A10}
                                textAlert='Campo obligatorio'
                                textAlign='left' />
                            <AlertBox
                                display={this.state.A12}
                                textAlert='Este campo no admite números'
                                textAlign='left' />

                            <Cleave
                                placeholder='Número de teléfono celular'
                                options={{ phone: true, phoneRegionCode: 'CO' }}
                                className='form-input'
                                onChange={this.onChange}
                                name='phoneNumber'
                                id='phoneNumber'
                            />
                            <AlertBox
                                display={this.state.A11}
                                textAlert='Campo obligatorio'
                                textAlign='left' />
                            <input
                                id='btnSubmit'
                                className='donateNowButton'
                                type='button'
                                onClick={this.onSubmit}
                                value='Dona ahora'
                                disabled={this.props.btnFlag}
                            />


                        </form>

                    </div>
                </div>
            </div >
        )
    }
}


export default CardForm