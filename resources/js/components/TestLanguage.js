import React, { Component } from 'react';
// import Questions from './Questions'
import ReactDOM from 'react-dom';




class TestLanguage extends React.Component {

    render() {
        return (
            <div>
                language={this.props.language}
            </div>
        )
    }
}

export default TestLanguage;
