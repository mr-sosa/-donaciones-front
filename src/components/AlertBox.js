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
                display = <div className='row'>
                    <h1 className='alert'>{this.props.textAlert}</h1>
                </div>
                break;
            case '1':
                display = <div className='row'>
                    
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