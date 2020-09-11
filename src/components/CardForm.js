import React, { Component } from 'react'
import '../App.css'
import Countries from '../data/countries.json'


class CardForm extends Component {
    render() {

        function donateNowButton(props) {
            const isActive = props.isActive;
            if (isActive) {
                return <button className='buttonActivated'>Donar Ahora</button>;
            }
            return <button className='buttonDeactivated'>Donar Ahora</button>;
        }



        return (
            < div className='box-big' >
                <div>
                    {/*poner logos de las tarjetas*/}
                </div>

                <div className='row'>
                    <div className='column-inner'>
                        <form className='box-small-inner'>
                            <h1 className='subtitle' >Información de tu tarjeta</h1>
                            <input
                                id='cardNumber'
                                type='number'
                                name='cardNumber'
                                className='form-input'
                                placeholder='Tu número de tarjeta' />

                            <div className='row'>

                                <input
                                    id='expDate'
                                    type='text'
                                    name='expDate'
                                    className='mmaa'
                                    placeholder='MM/AA' />

                                <input
                                    id='cvv'
                                    type='number'
                                    name='cvv'
                                    className='cvv'
                                    placeholder='CVV' />
                            </div>

                            <input
                                id='cardOwner'
                                type='text'
                                name='cardOwner'
                                className='form-input'
                                placeholder='Titular de la tarjeta' />
                            <input
                                id='idOwnerNumber'
                                type='number'
                                name='idOwnerNumber'
                                className='form-input'
                                placeholder='Número de documento' />
                            <input
                                id='ownerEmail'
                                type='email'
                                name='ownerEmail'
                                className='form-input'
                                placeholder='Correo electrónico' />

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
                                placeholder='Dirección ' />
                            <select className='form-input'
                                id='country'
                                name='country'>

                                <option value="" defaultValue hidden>
                                    País
                                </option>
                                {Countries.map((countriesDetail, index) => {
                                    return <option>{countriesDetail.name} </option>
                                })}
                            </select>
                            <input
                                id='state'
                                type='text'
                                name='state'
                                className='form-input'
                                placeholder='Departamento/Estado' />
                            <input
                                id='city'
                                type='text'
                                name='city'
                                className='form-input'
                                placeholder='Ciudad' />
                            <input
                                id='phoneNumber'
                                type='text'
                                name='phoneNumber'
                                className='form-input'
                                placeholder='Número de teléfono' />
                            <donateNowButton isActive={true} />

                        </form>
                    </div>
                </div>
            </div >

        )
    }
}


export default CardForm


