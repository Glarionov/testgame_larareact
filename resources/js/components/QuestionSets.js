import React, { Component } from 'react';
import QuestionOption from './QuestionOption'

class QuestionSets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            addNewQuestion: false,
            newQuestionValue: '',
            newOptions: {
            },
            value: '',
            lastNewOptionKey: 0,
            groupId: 1,
            currentLanguageId: 1

        }

        this.inputRefs = [];

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    // constructor(props) {
    //     super(props);
    //     this.state = {value: ''};
    //
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChangeQuestionAdder(event) {
        this.setState({newQuestionValue: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }


    async componentDidMount() {
        let url = '/api/get-question-group/' + this.state.groupId;

        let qData = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(data)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data.questionsByGroup;
            });

        qData['clicked_options'] = [];
        this.setState({
            questions: qData,
        });
    }

    changeAddingQuestionStatus(newValue = true) {
        this.setState({
            addNewQuestion: newValue
        });
    }

    async handleSub2(event) {
        let questionName = this.state.newQuestionValue;
        let questionOptions = this.state.newOptions;


        let data = {
            questionName,
            questionOptions
        };

        let url = '/api/add-question-to-group/' + this.state.groupId;

        let qData = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            });

        console.log('qData',qData); //todo r
    }

    async handleSubmitAddNewQuestion(event) {
        event.preventDefault();
        console.log('this.state.newQuestionValue',this.state.newQuestionValue); //todo r
        let questionName = this.state.newQuestionValue;
        let questionOptions = this.state.newOptions;


        let data = {
            questionName,
            questionOptions,
            languageId: this.state.currentLanguageId
        };

        let url = '/api/add-question-to-group/' + this.state.groupId;

        let qData = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            });

        console.log('qData',qData); //todo r


    }

    handleChangeOption(oIndex, event) {
        let nOptions = this.state.newOptions;
        nOptions[oIndex].option_name = event.target.value;
        console.log('nOptions',nOptions); //todo r
        this.setState({newOptions: nOptions});
    }

    changeGoodAnswer(oIndex, event) {
        let nOptions = this.state.newOptions;
        nOptions[oIndex].good_answer = !nOptions[oIndex].good_answer;
        this.setState({newOptions: nOptions});
    }


    focusOnNewOption() {
        let lastNewOptionKey = this.state.lastNewOptionKey;

        let nOptions = this.state.newOptions;
        nOptions[lastNewOptionKey] = {option_name: '', good_answer: false}
        this.setState({newOptions: nOptions});

        this.inputRefs[lastNewOptionKey] = React.createRef();
        // this.inputRefs[lastNewOptionKey].focus()
        setTimeout(function(lastNewOptionKey){
            this.inputRefs[lastNewOptionKey].focus()
        }.bind(this), 10,lastNewOptionKey) ;

        lastNewOptionKey++;
        this.setState({lastNewOptionKey});
    }



    render() {

        const adderButton = ()=>{
            if(this.state.addNewQuestion){
                // return <div onClick={this.openTestResult.bind(this, 1)}>See result</div>
                return <div>
                <form onSubmit={this.handleSubmitAddNewQuestion.bind(this)}>
                    <div className="add-new-question standard-button"  onClick={this.changeAddingQuestionStatus.bind(this, false)}>Cancel adding question</div>
                    <input type="text" value={this.state.newQuestionValue} onChange={this.handleChangeQuestionAdder.bind(this)} />
                    <div className="new-options">
                        <div >
                        New options
                            </div>
                        lastOptionKey={this.state.lastNewOptionKey}
                        this.state.newOptions={JSON.stringify(this.state.newOptions)}
                        {Object.entries(this.state.newOptions).map(([oIndex, oData]) => (
                            <div className="new-option-wrapper" key={oIndex}>
                                <div className="new-option-name-wrapper">
                                    <input
                                        ref={(input) => { this.inputRefs[oIndex] = input; }}
                                        type="text" value={oData.option_name} data-index={oIndex} onChange={this.handleChangeOption.bind(this, oIndex)}/>
                                </div>
                                <div className="new-option-checkbox-wrapper">
                                    <input tabIndex="-1" type="checkBox"  defaultChecked={oData.good_answer} onChange={this.changeGoodAnswer.bind(this, oIndex)} />
                                </div>
                            </div>
                        ))}
                        <div className="new-option-adder-wrapper">
                            <input type="text" className="new-option-adder" onFocus={this.focusOnNewOption.bind(this)}/>
                        </div>
                    </div>

                    <div className="question-adder-wrapper-submit">
                        <input type="submit" value="Add" />
                    </div>

                    {/*<div className="standard-button" onClick={this.handleSub2.bind(this)}>*/}
                    {/*    ADD*/}
                    {/*</div>*/}

                </form>
                </div>
            } else{
                // return <div className="next-question" onClick={this.changeQuestion.bind(this, 1)}>Next</div>
                return <div className="add-new-question standard-button"  onClick={this.changeAddingQuestionStatus.bind(this)}>Add new question</div>
            }
        }

        return  (<div className="">
            Question Setss

            {Object.entries(this.state.questions).map(([index, questionData]) => (
                <div className="abc" key={index}>
                    {typeof questionData !== 'undefined' && questionData &&
                    <div className="one-question-in-this.set" key={index}>
                        <div className="question-name">
                            {questionData.question_name}
                            {/*questionData={JSON.stringify(questionData)}*/}
                        </div>
                        {questionData.options &&
                        <div className="bo">
                            {Object.entries(questionData.options).map(([oIndex, oData]) => (
                                <div className="def" key={oIndex}>
                                    {oData.option_name}
                                </div>

                            ))}
                        </div>
                        }
                    </div>
                    }

        </div>))}

            {adderButton()}

        </div>)
    }
}

export default QuestionSets;
