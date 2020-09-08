import React, { Component } from 'react'
import './App.css'


class DonatorForm extends Component {
    render() {


        return (

            <div className='form-content-right' >
                <h1 className='title'> este es un titulo de ejemplo </h1>
                <form className='form'>

                    <h1 className='subtitle' >Información del donante</h1>
                    <div className='form-inputs'>
                        <input
                            id='fullName'
                            type='text'
                            name='fullName'
                            className='form-input'
                            placeholder='Tu nombre completo' />
                    </div>
                
                    <div className='form-inputs'>
                        <input
                            id='idNumber'
                            type='text'
                            name='idNumber'
                            className='form-input'
                            placeholder='Número de documento'
                        />
                    </div>
                
                    <div className='form-inputs'>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            className='form-input'
                            placeholder='Correo electrónico' />
                    </div>
                </form>
            </div >

        )
    }
}

export default DonatorForm




