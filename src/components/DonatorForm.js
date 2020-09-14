import React, { Component } from 'react'
import '../App.css'
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.co';

class DonatorForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullNameClient: '',
            idNumberClient: '',
            emailClient: ''
        }
        this.onChange = this.onChange.bind(this);
    }


    onChange = event => {
        let value = event.target.value
        let key = event.target.name

        this.setState({[key]: value})

        switch (key) {

            case 'fullNameClient':
                if (this.ValidateOnlyText(value)) {
                    this.props.callbackFromParent(key, value);
                    this.props.callbackFromParent('Error2', '0');
                    if(this.state.emailClient !== '' && this.state.idNumberClient !== '') this.props.callbackFromParent('flag2','1');
                } else {
                    this.props.callbackFromParent('Error2', '1')
                    document.getElementById(key).value = ''
                }
                break;
            case 'idNumberClient':
                if(value.length > 5 && value.length < 30){
                    this.props.callbackFromParent(key, event.target.rawValue);
                    if(this.state.emailClient !== '' && this.state.fullNameClient !== '') this.props.callbackFromParent('flag2','1');
                }
                break;
            case 'emailClient':
                if (this.ValidateEmail(value)) {
                    this.props.callbackFromParent(key, value);
                    if(this.state.fullNameClient !== ''&& this.state.idNumberClient !== '') this.props.callbackFromParent('flag2','1');
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




