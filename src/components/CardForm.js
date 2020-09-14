import React, { Component } from 'react'
import '../App.css'
import Countries from '../data/countries.json'
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.co';



class CardForm extends Component {
    constructor(props) {
        super(props)
        var today = new Date(),
            month = (today.getMonth() + 1),
            year = (today.getYear() - 100);
        this.state = {
            date: '',
            month: month,
            year: year,
            error: 0
        }
        this.onChange = this.onChange.bind(this);
        this.onCreditCardTypeChanged = this.onCreditCardTypeChanged.bind(this);
    }
    onCreditCardTypeChanged(type) {
        this.props.callbackFromParent('cardType', type);
    }


    onChange = event => {
        let value = event.target.value
        let key = event.target.name


        switch (key) {
            case 'cardNumber':
                if((event.target.rawValue).length>=14)
                this.props.callbackFromParent(key, event.target.rawValue);
                break;
            case 'expDate':
                let x = (value + "").split("/")
                let month = this.state.month
                let year = this.state.year
                let monthIn = parseInt(x[0])
                let yearIn = parseInt(x[1])
                if (monthIn !== 0 && yearIn !== 0) {
                    if (yearIn < year) {
                        this.setState({ error: 2 })
                    } else if (yearIn === year) {
                        if (monthIn > month) {
                            this.props.callbackFromParent("expYear", x[1]);
                            this.props.callbackFromParent("expMonth", x[0]);
                            this.setState({ error: 0 })
                        } else {
                            this.setState({ error: 1 })
                        }
                    } else if (yearIn > year) {
                        this.props.callbackFromParent("expYear", x[1]);
                        this.props.callbackFromParent("expMonth", x[0]);
                        this.setState({ error: 0 })
                    } else {
                        this.props.callbackFromParent("expYear", null);
                        this.props.callbackFromParent("expMonth", null);

                    }

                }
                break;
            case 'cvv':

                if (value.length > 2) {
                    this.props.callbackFromParent(key, value);
                } else {
                    this.props.callbackFromParent(key, null);
                }
                break;
            case 'cardOwner':
                this.props.callbackFromParent(key, value);
                break;
            case 'idOwnerNumber':
                this.props.callbackFromParent(key, value);
                break;
            case 'ownerEmail':
                if (this.ValidateEmail(value)) {
                    this.props.callbackFromParent(key, value);
                }
                break;
            case 'address':
                this.props.callbackFromParent(key, value);
                break;
            case 'country':
                this.props.callbackFromParent(key, value);
                break;
            case 'city':
                this.props.callbackFromParent(key, value);
                break;
            case 'phoneNumber':
                this.props.callbackFromParent(key, value);
                break;
            default: break;
        }
        this.forceUpdate(console.log('forced'));
    }


    ValidateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9.-]+)$/.test(mail)) {
            return (true)
        }

        return (false)
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
                                    blocks: [10],
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
                                onClick={this.props.onSubmitButton}
                                value='Dona ahora'
                                disabled={this.props.btnFlag}
                            />

                        </form>

                    </div>
                </div>
            </div >
//TODO agregar loguito de payU y Nuestras caritas <3
        )
    }
}


export default CardForm