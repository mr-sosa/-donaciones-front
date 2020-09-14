import React, { Component } from 'react'
import DonatorForm from './components/DonatorForm'
import AmountForm from './components/AmountForm'
import CardForm from './components/CardForm'



class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      //AmountForm
      duration: '',
      amount: '',


      //DonatorForm
      fullNameClient: '',
      idNumberClient: '',
      emailClient: '',

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
      Error: '0',
      Error2: '0',

      btnFlag: true // este valor activa o desactiva el envìo del form
    };
    this.CallBack = this.CallBack.bind(this);
    this.CheckFlags = this.CheckFlags.bind(this);
    this.onSubmitButton = this.onSubmitButton.bind(this);
  }


  CallBack = (key, value) => {
    this.setState({ [key]: value });
    this.CheckFlags();
  }

  onSubmitButton = () =>{
    if(this.state.Error === '2'){
      alert('el valor mínimo de donación es $10000')
    }else{
      //TODO aquí va el envío de datos a back
    }
  }


  CheckFlags = () => {
    let state = this.state
    let flag1 = (state.duration !== '' && state.amount !== null)
    let flag2 = (state.fullNameClient !== '' && state.emailClient !== '' && state.idNumberClient.length >= 6)
    let flag3 = (
      state.cardNumber.length >= 14 &&
      state.expMonth !== '' &&
      state.expYear !== '' &&
      state.cardType !== '' &&
      state.cvv !== '' &&
      state.cardOwner !== '' &&
      state.idOwnerNumber !== '' &&
      state.address !== '' &&
      state.country !== '' &&
      state.city !== '' &&
      state.phoneNumber !== '' 
    )
    if (flag1 && flag2 && flag3) {
      this.setState({ btnFlag: false })
    } else {
      this.setState({ btnFlag: true })
    }
  }


  render() {
    console.log(this.state)
    if(this.state.Error2 ==='1') alert('este campo no admite números')

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
        <div className='row'>
          <CardForm
            btnFlag={this.state.btnFlag}
            callbackFromParent={this.CallBack}
            onSubmitButton={this.onSubmitButton} />
        </div>


      </div>
    )
  }
}

export default App
