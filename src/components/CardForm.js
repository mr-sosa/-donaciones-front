import React, { Component } from 'react'
import '../App.css'


class CardForm extends Component {
    render() {


        return (
            < div className='box-big' >
                <div className='row'>
                    <div className='column-inner'>
                        <form className='box-small-inner'>
                            <h1 className='subtitle' >Información de tu tarjeta</h1>
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
                                placeholder='Número de documento' />
                            <input
                                id='email'
                                type='email'
                                name='email'
                                className='form-input'
                                placeholder='Correo electrónico' />
                        </form>
                    </div>
                    <div className='column-inner'>
                        <form  className='box-small-inner'>
                            <h1 className='subtitle-blank' >Información de tu tarjeta</h1>
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
                                placeholder='Número de documento' />
                            <input
                                id='email'
                                type='email'
                                name='email'
                                className='form-input'
                                placeholder='Correo electrónico' />
                        </form>
                    </div>
                </div>
            </div >

        )
    }
}

export default CardForm


