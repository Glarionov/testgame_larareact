import React, { Component } from 'react';
import QuestionOption from './QuestionOption'
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Questions from "./Questions";
import Game1 from "./Game1";
import QuestionSets from "./QuestionSets";
import NotFound from "./NotFound";
import EditableText from "./EditableText";

class QuestionSetEditor extends React.Component {

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
            groupName: '',
            currentLanguageId: 1,

            groupData: 1
        }

        this.inputRefs = [];

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentDidUpdate(prevProps) {
        if (prevProps.groupId !== this.props.groupId) {
            await this.updateGroupData(this.props.groupId);
        }
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

    async updateGroupData(groupId = 1) {
        let url = '/api/get-question-group/' + groupId;

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
                return data;
            });

        qData['clicked_options'] = [];

        console.log('qData.groupData',qData.groupData); //todo r
        this.setState({
            questions: qData.questionsByGroup,
            groupData: qData.groupData,
            groupId: qData.groupData[0].group_id,
            groupName: qData.groupData[0].group_name,
        });
    }

    async componentDidMount() {
        await this.updateGroupData();
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

    //where('name', $name)->delete();

    async deleteQuestion(index, questionId) {
        let questions = this.state.questions;
        questions.splice(index, 1);
        this.setState({
            questions
        });

        console.log('questionId',questionId); //todo r
        let data = {
            questionId
        };

        let url = '/api/delete-question-everywhere/' + this.state.groupId;

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

    handleChangeOption(oIndex, questionId = false, event) {
        if (questionId) {
            let questions = this.state.questions;
            questions[questionId].options[oIndex].option_name = event.target.value;
            this.setState({
                questions
            });
        } else {
            let nOptions = this.state.newOptions;
            nOptions[oIndex].option_name = event.target.value;
            console.log('nOptions',nOptions); //todo r
            this.setState({newOptions: nOptions});
        }

    }

    async changeOption(questionId, optionId, optionData) {
        event.preventDefault();
        console.log('this.state.newQuestionValue',this.state.newQuestionValue); //todo r
        let questionName = this.state.newQuestionValue;
        let questionOptions = this.state.newOptions;


        let data = {
            groupId: this.state.groupId,
            questionName,
            questionOptions,
            languageId: this.state.currentLanguageId
        };

        let url = '/api/change-question-in-group/';

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

    async changeOptionGoodAnswer(questionId, optionId, goodAnswer) {
        event.preventDefault();
        console.log('this.state.newQuestionValue',this.state.newQuestionValue); //todo r
        let questionName = this.state.newQuestionValue;
        let questionOptions = this.state.newOptions;


        let data = {
            groupId: this.state.groupId,
            questionId,
            optionId,
            goodAnswer,
            questionName,
            questionOptions,
            languageId: this.state.currentLanguageId
        };

        console.log('data',data); //todo r

        let url = '/api/change-question-good-answer/';

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

    async deleteOptionFromQuestionServerRequest(questionId, optionId) {
        let url = '/api/delete-option-from-question/';

        let data = {
            groupId: this.state.groupId,
            questionId,
            optionId,
        };

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

    async saveEditingOptionNameServerRequest(optionId, optionName) {
        console.log('optionId',optionId); //todo r
        console.log('optionName',optionName); //todo r
        let url = '/api/change-option-name/';

        let data = {
            optionId,
            optionName,
            languageId: this.props.language_id
        };

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

    // async deleteOptionFromQuestionServerRequest(optionId) {
    //
    // }

    async deleteOptionFromQuestion(oIndex, questionId = false, event) {
        let questions = this.state.questions;
        await this.deleteOptionFromQuestionServerRequest(questions[questionId].question_id, questions[questionId]['options'][oIndex].option_id);
        delete questions[questionId]['options'][oIndex];
        this.setState(
            {
                questions
            }
        );
    }

    async startEditingOptionName(optionIndex, questionIndex, event) {
        let questions = this.state.questions;
        questions[questionIndex]['options'][optionIndex].currently_editing = true;

        this.setState({
            questions
        });
    }

    async stopEditingOptionName(optionIndex, questionIndex, event) {
        let questions = this.state.questions;
        questions[questionIndex]['options'][optionIndex].currently_editing = false;

        this.setState({
            questions
        });
    }

    async saveEditingOptionName(optionIndex, questionIndex, event) {
        let questions = this.state.questions;
        questions[questionIndex]['options'][optionIndex].currently_editing = false;

        await this.saveEditingOptionNameServerRequest(questions[questionIndex]['options'][optionIndex].option_id, questions[questionIndex]['options'][optionIndex].option_name);
        this.setState({
            questions
        });
    }

    async changeGoodAnswer(oIndex, questionId = false, event) {
        console.log('-------questionId',questionId); //todo r
        if (questionId) {
            console.log('event',event.target.checked); //todo r

            let questions = this.state.questions;

            let checked = event.target.checked;
            await this.changeOptionGoodAnswer(questions[questionId].question_id, questions[questionId]['options'][oIndex].option_id, checked);

            questions[questionId]['options'][oIndex]['good_answer'] = checked? 1: 0;
            this.setState({
                questions
            });

            // await this.changeOption(questionId, oIndex);
            // let questions = this.state.questions;
            // console.log('1111questions',questions); //todo r
            //todo only if good

            console.log('questions',questions); //todo r
            //
            // console.log('22222222questions',questions); //todo r
            // console.log('questionId',questionId); //todo r
        } else {
            let nOptions = this.state.newOptions;
            nOptions[oIndex].good_answer = !nOptions[oIndex].good_answer;
            this.setState({newOptions: nOptions});
        }

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
                return <div >



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

        return  (<div className="question-set-editor">
            <div className="question-name">
                Изменение группы #{this.state.groupId} - {this.state.groupName}
            </div>

            <Router>
                <div className="router-links-wrapper">
                    <Link to={"/game1/" + this.state.groupId}>Игра</Link>
                </div>
            </Router>

            {Object.entries(this.state.questions).map(([index, questionData]) => (
                <div className="abc" key={index}>
                    {typeof questionData !== 'undefined' && questionData &&
                    <div className="one-question-in-set" key={index}>
                        <div className="question-top-part">
                            <div className="question-name">
                                {questionData.question_name}
                                {/*questionData={JSON.stringify(questionData)}*/}
                            </div>
                            <div className="delete-question-wrapper">
                                <div className="standard-button"
                                     onClick={this.deleteQuestion.bind(this, index, questionData.question_id)}
                                >
                                    Delete
                                </div>
                            </div>
                        </div>

                        {questionData.options &&
                        <div className="option-list-in-editor">
                            {Object.entries(questionData.options).map(([oIndex, oData]) => (
                                <div className="option-wrapper" key={oIndex}>
                                    <div className="new-option-checkbox-wrapper">
                                        <input tabIndex="-1" type="checkBox"  checked={oData.good_answer} onChange={this.changeGoodAnswer.bind(this, oIndex, index)} />
                                    </div>
                                    {
                                        oData.hasOwnProperty('currently_editing') && oData.currently_editing &&
                                        <div className="option-name-editor">
                                            <input type="text" value={oData.option_name}
                                                   onChange={this.handleChangeOption.bind(this, oIndex, index)}
                                            />

                                            <div className="cancel-name-editor"
                                                 onClick={this.stopEditingOptionName.bind(this, oIndex, index)}
                                            >
                                                Cancel
                                            </div>
                                            <div className="save-new-option-name"
                                                 onClick={this.saveEditingOptionName.bind(this, oIndex, index)}
                                            >
                                                Save
                                            </div>
                                        </div>
                                    }
                                    <EditableText />

                                    {
                                        (!oData.hasOwnProperty('currently_editing') || !oData.currently_editing) &&
                                            <div className="option-name-wrapper">
                                                {oData.option_name}
                                            </div>
                                    }


                                    {(!oData.hasOwnProperty('currently_editing') || !oData.currently_editing) &&

                                    <img
                                        onClick={this.startEditingOptionName.bind(this, oIndex, index)}
                                        className="edit-icon" src="../../images/icons8-edit.svg"
                                    />
                                    }



                                    <img
                                        onClick={this.deleteOptionFromQuestion.bind(this, oIndex, index)}
                                        className="delete-icon" src="../../images/icons8-delete.svg"
                                         />


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

export default QuestionSetEditor;
