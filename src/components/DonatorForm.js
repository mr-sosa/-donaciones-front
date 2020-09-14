import React, { Component } from 'react'
import '../App.css'
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.co';

class DonatorForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.onChange = this.onChange.bind(this);
    }


    onChange = event => {
        let value = event.target.value
        let key = event.target.name


        switch (key) {

            case 'fullNameClient':
                this.props.callbackFromParent(key, value);
                break;
            case 'idNumberClient':
                this.props.callbackFromParent(key, value);
                break;
            case 'emailClient':
                if (this.ValidateEmail(value)) {
                    this.props.callbackFromParent(key, value);
                }
                break;
            default: break;
        }
    }
    ValidateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9.-]+)$/.test(mail)) {
            return (true)
        }

        return (false)
    }

    render() {


        return (
            < div className='box-small' >

                <form className='form'>
                    <h1 className='subtitle' >Información del donante</h1>
                    <input
                        id='fullNameClient'
                        type='text'
                        name='fullNameClient'
                        className='form-input'
                        placeholder='Tu nombre completo'
                        onChange={this.onChange} />
                    <Cleave
                        name='idNumberClient'
                        placeholder='Número de documento'
                        options={{
                            numeral: true,
                            numeralPositiveOnly: true,
                            numericOnly: true
                        }}
                        onChange={this.onChange}
                        className='form-input'
                    />
                    
                    <input
                        id='emailClient'
                        type='email'
                        name='emailClient'
                        className='form-input'
                        placeholder='Correo electrónico'
                        onChange={this.onChange} />

                </form>
            </div >

        )
    }
}

export default DonatorForm




