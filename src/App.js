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
      flag1: false,

      //DonatorForm
      fullNameClient: '',
      idNumberClient: '',
      emailClient: '',
      flag2: true,

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
      flag3: true,

      btnFlag: true // este valor activa o desactiva el envìo del form
    };
    this.CallBack = this.CallBack.bind(this);
  }
  CallBack = (key, value) => {
    this.checkFlags()
    this.setState({ [key]: value });
  }



  checkFlag1() {
    let state = this.state
    if (state.duration !== '' && state.amount !== '') { this.setState({ flag1: true }) } else { this.setState({ flag1: false }) }
  }
  checkFlag2() {

  }
  checkFlag3() {

  }
  checkFlags() {
    let flag1 = this.state.flag1
    let flag2 = this.state.flag2
    let flag3 = this.state.flag3
    this.checkFlag1()
    this.checkFlag2()
    this.checkFlag3()

    let res = !(flag1 && flag2 && flag3)
    this.setState({ btnFlag: res });


  }

  render() {
    console.log(this.state)
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
          <CardForm btnFlag={this.state.btnFlag} callbackFromParent={this.CallBack} onSubmitButton={this.onSubmitButton} />
        </div>


      </div>
    )
  }
}

export default App
