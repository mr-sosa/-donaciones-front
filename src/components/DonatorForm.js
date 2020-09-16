import React, { Component } from 'react'
import '../App.css'
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.co';
import AlertBox from './AlertBox'

class DonatorForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            A1: '0', fullNameClient: '',
            A2: '0', idNumberClient: '',
            A3: '0', emailClient: ''
        }
        this.onChange = this.onChange.bind(this);
    }


    onChange = event => {
        let value = event.target.value
        let key = event.target.name

        this.setState({ [key]: value })

        switch (key) {

            case 'fullNameClient':
                if (this.ValidateOnlyText(value)) {
                    this.props.callbackFromParent(key, value);
                    this.setState({ A1: '0' })
                    if (this.state.emailClient !== '' && this.state.idNumberClient !== '') this.props.callbackFromParent('flag2', '1');
                } else {
                    this.props.callbackFromParent('flag3', '0')
                    document.getElementById(key).value = ''
                    this.setState({ A1: '1' })
                }
                break;
            case 'idNumberClient':
                if (value.length > 5 && value.length < 30) {
                    this.setState({ A2: '0' })
                    this.props.callbackFromParent(key, event.target.rawValue);
                    if (this.state.emailClient !== '' && this.state.fullNameClient !== '') this.props.callbackFromParent('flag2', '1');
                } else {
                    this.setState({ A2: '1' })
                    this.props.callbackFromParent('flag3', '0')
                }
                break;
            case 'emailClient':
                if (this.ValidateEmail(value)) {
                    this.props.callbackFromParent(key, value);
                    this.setState({ A3: '0' })
                    if (this.state.fullNameClient !== '' && this.state.idNumberClient !== '') this.props.callbackFromParent('flag2', '1');
                } else {
                    this.setState({ A3: '1' })
                    this.props.callbackFromParent('flag3', '0')
                }
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
                    <AlertBox
                        display={this.state.A1}
                        textAlert='Este campo no admite números'
                        textAlign='left' />

                    <Cleave
                        id='idNumberClient'
                        name='idNumberClient'
                        placeholder='Número de documento'
                        options={{
                            blocks: [30],
                            numericOnly: true
                        }}
                        onChange={this.onChange}
                        className='form-input'
                    />
                    <AlertBox
                        display={this.state.A2}
                        textAlert='El documento debe tener entre 5 y 30 caracteres'
                        textAlign='left' />

                    <input
                        id='emailClient'
                        type='email'
                        name='emailClient'
                        className='form-input'
                        placeholder='Correo electrónico'
                        onChange={this.onChange} />
                    <AlertBox
                        display={this.state.A3}
                        textAlert='Ingrese un correo válido'
                        textAlign='left' />

                </form>
            </div >

        )
    }
}

export default DonatorForm




