import React, { Component } from 'react'
import '../App.css'
import Countries from '../data/countries.json'
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.co';



class CardForm extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            month = (today.getMonth() + 1),
            year = (today.getYear() - 100);
        this.state = {
            cardNumber: '',
            expMonth: '',
            expYear: '',
            cardType: '',
            cvv: '',
            cardOwner: '',
            idOwnerNumber: '',
            ownerEmail: '',
            address: '',
            country: '',
            city: '',
            phoneNumber: '',
            date: '',
            month: month,
            year: year,
            error: 0
        }
        this.onChange = this.onChange.bind(this);
        this.onCreditCardTypeChanged = this.onCreditCardTypeChanged.bind(this);
    }
    onCreditCardTypeChanged(type) {
        switch(type){
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
        this.setState({'cardType': type})
        this.props.callbackFromParent('cardType', type)
    }

    onSubmit = (event) =>{
        this.props.onSubmitButtonApp();
    }

    onChange = event => {
        let value = event.target.value
        let key = event.target.name

        this.setState({[key]: value})

        switch (key) {
            case 'cardNumber':
                if ((event.target.rawValue).length >= 14){
                    this.props.callbackFromParent(key, event.target.rawValue);
                    if(this.check(key)){
                        this.props.callbackFromParent('flag3','1')
                    }
                }
                else { this.props.callbackFromParent(key, ''); }
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
                            this.setState({'expMonth':monthIn});
                            this.setState({'expYear':yearIn});
                            this.props.callbackFromParent("expYear", x[1]);
                            this.props.callbackFromParent("expMonth", x[0]);
                            this.setState({ error: 0 })
                            if(this.check(key)){
                                this.props.callbackFromParent('flag3','1')
                            }
                        } else {
                            this.props.callbackFromParent("expYear", '');
                            this.props.callbackFromParent("expMonth", '');
                        }
                    } else if (yearIn > year) {
                        this.setState({'expMonth':monthIn});
                        this.setState({'expYear':yearIn});
                        this.props.callbackFromParent("expYear", x[1]);
                        this.props.callbackFromParent("expMonth", x[0]);
                        if(this.check(key)){
                            this.props.callbackFromParent('flag3','1')
                        }
                    } else {
                        this.props.callbackFromParent("expYear", '');
                        this.props.callbackFromParent("expMonth", '');

                    }
                }
                break;
            case 'cvv':

                if (value.length > 2) {
                    this.props.callbackFromParent(key, value);
                    if(this.check(key)){
                        this.props.callbackFromParent('flag3','1')
                    }
                } else {
                    this.props.callbackFromParent(key, '');
                }
                break;
            case 'cardOwner':
                if (this.ValidateOnlyText(value)) {
                    this.props.callbackFromParent(key, value);
                    this.props.callbackFromParent('Error2', '0');
                    if(this.check(key)){
                        this.props.callbackFromParent('flag3','1')
                    }
                } else {
                    this.props.callbackFromParent('Error2', '1')
                    document.getElementById(key).value = ''
                }
                break;
            case 'idOwnerNumber':
                if (value.length > 5 && value.length < 30){
                    this.props.callbackFromParent(key, value);
                    if(this.check(key)){
                        this.props.callbackFromParent('flag3','1')
                    }
                }
                break;
            case 'ownerEmail':
                if (this.ValidateEmail(value)) {
                    this.props.callbackFromParent(key, value);
                    if(this.check(key)){
                        this.props.callbackFromParent('flag3','1')
                    }
                }
                break;
            case 'address':
                this.props.callbackFromParent(key, value);
                if(this.check(key)){
                    this.props.callbackFromParent('flag3','1')
                }
                break;
            case 'country':
                this.props.callbackFromParent(key, value);
                if(this.check(key)){
                    this.props.callbackFromParent('flag3','1')
                }
                break;
            case 'city':
                if (this.ValidateOnlyText(value)) {
                    this.props.callbackFromParent(key, value);
                    this.props.callbackFromParent('Error2', '0');
                    if(this.check(key)){
                        this.props.callbackFromParent('flag3','1')
                    }
                } else {
                    this.props.callbackFromParent('Error2', '1')
                    document.getElementById(key).value = ''
                }
                break;
            case 'phoneNumber':
                this.props.callbackFromParent(key, value);
                if(this.check(key)){
                    this.props.callbackFromParent('flag3','1')
                }
                break;
            default: break;
        }
        this.forceUpdate();
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

    check(key){

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
        switch(key){
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
                            </div>

                            <input
                                name='cardOwner'
                                id='cardOwner'
                                type='text'
                                onChange={this.onChange}
                                className='form-input'
                                placeholder='Titular de la tarjeta' />

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
                            <input
                                name='ownerEmail'
                                id='ownerEmail'
                                type='email'
                                className='form-input'
                                placeholder='Correo electrónico'
                                onChange={this.onChange} />
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

                            <input
                                id='city'
                                type='text'
                                name='city'
                                className='form-input'
                                placeholder='Ciudad'
                                onChange={this.onChange} />

                            <Cleave
                                placeholder='Número de teléfono celular'
                                options={{ phone: true, phoneRegionCode: 'CO' }}
                                className='form-input'
                                onChange={this.onChange}
                                name='phoneNumber'
                                id='phoneNumber'
                            />
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