import React, { Component } from 'react';

class QuestionOption extends React.Component {

    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this)

    }
    changeHandler (e) {
        if (typeof this.props.parentClickEvent === 'function') {
            this.props.parentClickEvent(e, this.props.index);
        }
    }


    render() {
        return  (<div className="question-option-text"
                      className={`banner ${this.props.optionData.extraClass}`}
                      onClick={this.changeHandler}
                      data-key={this.props.index}
        >
            {this.props.optionData.text}
        </div>)
    }
}

export default QuestionOption;