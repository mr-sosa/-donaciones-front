import React, { Component } from 'react'
import '../App.css'


class DonatorForm extends Component {
    render() {


        return (
            < div className='box-small' >

                <form className='form'>
                    <h1 className='subtitle' >Información del donante</h1>
                    <input
                        id='fullName'
                        type='text'
                        name='fullName'
                        className='form-input'
                        placeholder='Tu nombre completo' />
                    <input
                        id='idNumber'
                        type='text'
                        name='idNumber'
                        className='form-input'
                        placeholder='Número de documento'
                    />
                    <input
                        id='email'
                        type='email'
                        name='email'
                        className='form-input'
                        placeholder='Correo electrónico' />

                </form>
            </div >

        )
    }
}

export default DonatorForm




