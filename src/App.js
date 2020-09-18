import React, { Component } from 'react'
import DonatorForm from './Components/DonatorForm'
import AmountForm from './Components/AmountForm'
import CardForm from './Components/CardForm'


const ENDPOINT = 'https://aieseccolombia.org:8442'

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
      flag2: '0',

      //CardForm 
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cardType: '', //medio de pago (franquicia de tarjeta)
      cvv: '',
      cardOwner: '',
      idOwnerNumber: '',
      ownerEmail: '',
      address: '',
      country: '',
      city: '',
      phoneNumber: '',
      flag3: '0',
    
      btnFlag: true // este valor activa o desactiva el envìo del form
    };
    this.CallBack = this.CallBack.bind(this);
    this.CheckFlags = this.CheckFlags.bind(this);
    this.onSubmitButton = this.onSubmitButton.bind(this);
  }
  CallBack = async (key, value) => {
    this.setState({ [key]: value });
  }

  onSubmitButton = async () => {

    //TODO aquí va el envío de datos a back
    let resp = await fetch(ENDPOINT + "/CreateDonation", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'AmountForm': {
          'duration': this.state.duration,
          'amount': this.state.amount
        },
        'DonatorForm': {
          'fullNameClient': this.state.fullNameClient,
          'idNumberClient': this.state.idNumberClient,
          'emailClient': this.state.emailClient
        },
        'CardForm': {
          'cardNumber': this.state.cardNumber,
          'expMonth': this.state.expMonth,
          'expYear': this.state.expYear,
          'cardType': this.state.cardType,
          'cvv': this.state.cvv,
          'cardOwner': this.state.cardOwner,
          'idOwnerNumber': this.state.idOwnerNumber,
          'ownerEmail': this.state.ownerEmail,
          'address': this.state.address,
          'country': this.state.country,
          'city': this.state.city,
          'phoneNumber': this.state.phoneNumber
        }
      })
    });

    //Después se crean el manejo de errores
    if (resp.status === 201) { //quiere decir que todo está en orden 
      
      console.log('La Donación fué realizada exitosamente');
      /*resp = await resp.json();
      console.log('planCode: '+resp.planCode)
      console.log('clientId: '+resp.id)
      console.log('token: '+resp.token)
      console.log('subscriptionId: '+resp.subscriptionId)
      */

      let redirect_url = "https://aieseccolombia.org/thanksforyourdonation";
      window.top.location.href = redirect_url
    }
    else{
      resp = await resp.json();
      console.log(resp);
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


    let btnSubmit = true;
    let flag1 = this.state.flag1
    let flag2 = this.state.flag2
    let flag3 = this.state.flag3
    if (flag1 === '1' && flag2 === '1' && flag3 === '1') btnSubmit = false;
    //console.log('SUBMIT? ' + btnSubmit)
    switch (btnSubmit) {
      default:
        btnSubmit = <div className='box-big-invisible'>
          <div className='row'>
            <CardForm btnFlag={true}
              callbackFromParent={this.CallBack}
              onSubmitButtonApp={this.onSubmitButton.bind(this)} />
          </div>
        </div>
        break;
      case false:
        btnSubmit = <div className='box-big-invisible'>
          <div className='row'>
            <CardForm btnFlag={false}
              callbackFromParent={this.CallBack}
              onSubmitButtonApp={this.onSubmitButton.bind(this)} />
          </div>
        </div>
        break;
    }



    //console.log(this.state)
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
        <div className='box-big-invisible'>
          <div className='row'>
            <div className='column'>
              <div className='box-small'>
                <div className='row'>
                  <div className='column-inner-buttons'>
                    <h1 className='payUText'>Esta donación está protegida por PayU</h1>
                  </div>
                  <div className='column-inner-buttons'>
                    <img src={require('./data/PayU.png')} alt='' className='PayU' />
                  </div>
                </div>
              </div>
            </div>

            <div className='column'>
              <div className='box-small'>
                <div className='row'>
                  <h1 className='developedByText'>Developed for AIESEC in Colombia by:</h1>
                </div>
                <div className='row'>
                  <div className='column-inner-2'>
                    <div className='box-small-inner-2'>
                      <div className='Team_Manu'>
                        <img src={require('./data/Icon_Manu.png')} alt='' className='Icon_Manu' /> 
                        <h1 className='namesText'>Manuel Sosa <br/> Project Manager</h1>
                      </div>
                      <br/>
                      <div className='Team_Gise'>
                        <img src={require('./data/Icon_Gise.png')} alt='' className='Icon_Gise' /> 
                        <h1 className='namesText'>Gisell Hernandez <br/> Back-end developer</h1>
                      </div>
                    </div>
                  </div>
                  <div className='column-inner-2'>
                    <div className='box-small-inner-2'>
                      <div className='Team_Andre'>
                        <img src={require('./data/Icon_Andre.png')} alt='' className='Icon_Andre' /> 
                        <h1 className='namesText'>Andrés Castro <br/> Front-end developer</h1>
                      </div>
                      <br/>
                      <div className='Team_Manny'>
                        <img src={require('./data/Icon_Manny.png')} alt='' className='Icon_Manny' /> 
                        <h1 className='namesText'>Emanuel Álvarez <br/> Country Brand Manager</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>    
        </div>
      </div>
    )
  }
}

export default App
