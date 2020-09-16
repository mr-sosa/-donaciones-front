import React, { Component } from 'react'

class AlertBox extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {
        let display = this.props.display
        switch (display) {
            default:
                if(this.props.textAlign==='right')
                {display = <div className='row'>
                    <h1 className='alertRight'>{this.props.textAlert}</h1>
                </div>}
                else{display = <div className='row'>
                <h1 className='alertLeft'>{this.props.textAlert}</h1>
            </div>}
                break;
            case '0':
                display = <div className='row'>
                    <h1 className='alertDisabled'>.</h1>
                </div>
                break;
        } return (
            <div>
                {display}
            </div>
        )
    }
}

export default AlertBox