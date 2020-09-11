import React, { Component } from 'react'
import DonatorForm from './components/DonatorForm'
import AmountForm from './components/AmountForm'
import CardForm from './components/CardForm'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      form: {

      },

    };


    // se inicializan las funciones
    //this.changeHandler = this.changeHandler.bind(this);
    //   this.isRegistering = false;
  }


  render() {
    return (
      <div className='all'>
        <div className='box-big-invisible'>
          <div className='row'>
            <div className='column'>
              <h1 className='title'>Haz tu donación mensual </h1>
              <AmountForm />
            </div>
            <div className='column'>
              <div>
                <h1 className='title-hide-on-big'>Ya casi...</h1>
              </div>
              <div>
                <DonatorForm />
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <CardForm />
        </div>
      </div>
    )
  }
}

export default App
