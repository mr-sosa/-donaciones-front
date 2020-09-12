import React, { Component } from 'react'
import DonatorForm from './components/DonatorForm'
import AmountForm from './components/AmountForm'
import CardForm from './components/CardForm'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      duration: '',
      amount: ''
    };
  }
  CallBack = (key, value) => {
    switch (key) {
      case 'amount': this.setState({ amount: value }); break;
      case 'duration': this.setState({ duration: value }); break;
      /*Se pueden agregar más valores de state que llegan desde cada component*/
      default: console.log('default'); break;
    }
  }


  render() {

    console.log(this.state.duration)
    console.log(this.state.amount)
    return (

      <div className='all'>

        <img src={require('./data/414.png')} alt='' className='img414' />
        <img src={require('./data/768.png')} alt='' className='img768' />
        <img src={require('./data/1024.png')} alt='' className='img1024' />
        <img src={require('./data/1440.png')} alt='' className='img1440' />

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
          <CardForm callbackFromParent={this.CallBack} />
        
        </div>
        

      </div>
    )
  }
}

export default App
