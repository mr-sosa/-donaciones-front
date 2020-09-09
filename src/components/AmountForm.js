import React, { Component } from 'react'
import '../App.css'


class AmountForm extends Component {
    render() {


        return (
            < div className='box-small' >
                <form className='form'>
                    <h1 className='subtitle' >¿Cuánto vas a donar?</h1>
                    <input
                        id='amount'
                        type='text'
                        name='fullName'
                        className='form-input'
                        placeholder='Monto en pesos colombianos - COP' />
                    <select className='form-input'
                        id='duration'
                        name='duration'>
                        <option value=""  defaultValue hidden>
                            Selecciona los meses de duración
                             </option>
                        <option value='12'>12 Meses</option>
                        <option value='6'>6 Meses</option>
                        <option value='3'>3 Meses</option>
                        <option value='1'>1 Meses</option>
                    </select>


                </form>
            </div >

        )
    }
}

export default AmountForm