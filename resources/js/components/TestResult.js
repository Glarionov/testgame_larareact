import React, { Component } from 'react';
import QuestionOption from './QuestionOption'

class SingleQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionData: this.props.questionData,
            clickedOptions: []
        }
    }

    render() {
        return  (
            <div className="single-question">
            <div className="question-name">
                {this.state.questionData.name}
            </div>
                {/*{this.props.questionData.options.map((question, index) =>*/}
            {  Object.entries(this.state.questionData.options).map(([index, optionData]) => (
                <div key={index}>
                    <QuestionOption optionData = {optionData} index={index}  parentClickEvent={this.clickOnOption.bind(this)}/>
                    {/*<div key={optionData.index}*/}
                    {/*     id={optionData.id}*/}
                    {/*     onClick={this.clickOnOption}*/}
                    {/*>*/}
                    {/*    index={index}*/}
                    {/*    {optionData.text} </div>*/}
                </div>

                // )}
                ))}



        </div>
        )
    }
}

export default SingleQuestion;