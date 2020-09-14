import React, { Component } from 'react'
import DonatorForm from './Components/DonatorForm'
import AmountForm from './Components/AmountForm'
import CardForm from './Components/CardForm'



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      //AmountForm
      duration: '',
      amount: '',
      flag1: '0',

      //DonatorForm
      fullNameClient: '',
      idNumberClient: '',
      emailClient: '',
      flag2: '1',

      //CardForm 
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cardType: '', //medio de pago (franquicia de tarjeta)
      cvv: '',
      cardOwner: '',
      idOwnerNumber: '',
      address: '',
      country: '',
      city: '',
      phoneNumber: '',
      flag3: '1',

      btnFlag: true // este valor activa o desactiva el envìo del form
    };
    this.CallBack = this.CallBack.bind(this);
  }
  CallBack = async (key, value) => {
    this.setState({ [key]: value });
  }


  render() {
    console.log(this.state)

    let btnSubmit = true;
    let flag1 = this.state.flag1
    let flag2 = this.state.flag2
    let flag3 = this.state.flag3
    if(flag1 === '1' && flag2 === '1' && flag3 === '1') btnSubmit = false;
    switch(btnSubmit){
      default:
        btnSubmit = <div className='row'>
                      <CardForm btnFlag={true}
                                callbackFromParent={this.CallBack} 
                                onSubmitButton={this.onSubmitButton} />
                    </div>
        break;
      case false:
        btnSubmit = <div className='row'>
                      <CardForm btnFlag={false}
                                callbackFromParent={this.CallBack} 
                                onSubmitButton={this.onSubmitButton} />
                    </div>
        break;
    }

    return (

      <div className='all'>
        <div className='box-big-invisible'>
          <img src={require('./data/414.png')} alt='' className='img414' />
          <img src={require('./data/768.png')} alt='' className='img768' />
          <img src={require('./data/1024.png')} alt='' className='img1024' />
          <img src={require('./data/1440.png')} alt='' className='img1440' />


          <div className="bigHeader"> Imagina lo que 1200 grandes líderes pueden hacer.</div>
          <div className="smallHeader">Dona hoy por AIESEC en Colombia</div>
        </div>
        <div className='box-big-invisible'>
          <div className='row'>
            <h1 className='title'>Haz tu donación mensual </h1>
            <div className='column'>

              <AmountForm callbackFromParent={this.CallBack} />
            </div>
            <div className='column'>

              <h1 className='title-hide-on-big'>Ya casi...</h1>

              <DonatorForm callbackFromParent={this.CallBack} />

            </div>
          </div>
        </div>
        
        {btnSubmit}

      </div>
    )
  }
}

export default App
