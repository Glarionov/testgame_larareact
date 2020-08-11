import React, { Component } from 'react';
// import Questions from './Questions'
import ReactDOM from 'react-dom';




class Registration extends React.Component {



    render() {
        return (
            <div>
                Registration page
            </div>
        )
    }


    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.setState({
            // textBeforeEditing: this.props.text,
            // currentlyEditingText: this.props.text,
        })
    }
}

export default Registration;
