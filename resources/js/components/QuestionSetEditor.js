import React, { Component } from 'react';
import QuestionOption from './QuestionOption'
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Questions from "./Questions";
import Game1 from "./Game1";
import QuestionSets from "./QuestionSets";
import NotFound from "./NotFound";
import EditableTextWrapper from "./EditableTextWrapper";

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
            groupId: 5,
            groupName: '',
            currentLanguageId: 1,

            groupData: 1,
            inputRefs: {}
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

    async updateGroupData(groupId = 14) {
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

        console.log('---qData.groupData',qData.groupData); //todo r
        this.setState({
            questions: qData.questionsByGroup,
            groupData: qData.groupData[0],
            groupId: qData.groupData[0].group_id,
            groupName: qData.groupData[0].group_name,
        });
    }

    async componentDidMount() {
        await this.updateGroupData(this.state.groupId);
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

        let newQuestion = qData.newQuestion;
        let newQuestionId = qData.newQuestionId;

        let questions = this.state.questions;
        questions[newQuestionId] = newQuestion;

        this.setState({
            questions,
            newQuestionValue: '',
            newOptions: {}
        });
        console.log('qData',qData); //todo r


    }

    //where('name', $name)->delete();

    async deleteQuestion(index, questionId) {
        let questions = this.state.questions;
        delete questions[index];
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

        console.log('@@@@@@@@@qData',qData); //todo r

    }

    handleChangeNewOption(oIndex, questionId, event) {
        let questions = this.state.questions;
        questions[questionId].temp_options[oIndex].option_name = event.target.value;
        this.setState({
            questions
        });
    }

    handleChangeOption(oIndex, questionId = false, event) {
        console.log('questionId',questionId); //todo r
        if (questionId) {
            let questions = this.state.questions;
            questions[questionId].options[oIndex].option_name = event.target.value;
            this.setState({
                questions
            });
        } else {
            let nOptions = this.state.newOptions;
            console.log('111111111111Options',nOptions); //todo r
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
            languageId: this.props.languageId
        };

        console.log('data',data); //todo r

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

    async saveEditingQuestionNameServerRequest(questionId, questionName) {
        console.log('questionId',questionId); //todo r
        let url = '/api/change-question-name/';


        let data = {
            questionId,
            questionName,
            languageId: this.props.languageId
        };

        console.log('data',data); //todo r

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

    async deleteTempOption(oIndex, questionId = false, event) {
        console.log('11oIndex',oIndex); //todo r
        console.log('22questionId',questionId); //todo r
    }

    async startEditingOptionName(optionIndex, questionIndex, event) {
        let questions = this.state.questions;
        questions[questionIndex]['options'][optionIndex].currently_editing = true;

        this.setState({
            questions
        });
    }

    async saveEditingNewOption(oIndex, questionId) {


        let questions = this.state.questions;

        console.log('questions[questionId].temp_options',questions[questionId].temp_options); //todo r
        let url = '/api/add-option-to-question/';
        let data = {
            questionId,
            goodAnswer: questions[questionId].temp_options[oIndex]['good_answer'],
            text: questions[questionId].temp_options[oIndex].option_name,
            languageId: this.props.languageId
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

        console.log('----qData',qData); //todo r
        let newId = qData.id;

        questions[questionId].options[newId] = {
            option_name: questions[questionId].temp_options[oIndex].option_name,
            good_answer: questions[questionId].temp_options[oIndex]['good_answer'],
            option_id: newId,
            text_id: qData.text_id
        };
        delete questions[questionId].temp_options[oIndex];
        this.setState({questions})
    }

    async stopEditingNewOption(oIndex, questionId) {
        let questions = this.state.questions;
        delete questions[questionId].temp_options[oIndex];
        console.log('questions',questions); //todo r
        this.setState({questions});
    }

    async stopEditingOptionName(optionIndex, questionIndex, event) {
        let questions = this.state.questions;
        questions[questionIndex]['options'][optionIndex].currently_editing = false;

        this.setState({
            questions
        });
    }

    async saveEditingOptionName(optionIndex, questionIndex, newText) {
        let questions = this.state.questions;
        questions[questionIndex]['options'][optionIndex].currently_editing = false;
        questions[questionIndex]['options'][optionIndex].option_name = newText;
        this.setState({
            questions
        });
        // await this.saveEditingOptionNameServerRequest(questions[questionIndex]['options'][optionIndex].option_id, questions[questionIndex]['options'][optionIndex].option_name);
        await this.saveEditingOptionNameServerRequest(questions[questionIndex]['options'][optionIndex].option_id, newText);

    }

    async save1() {
        console.log('save1')


    }

    async changeGoodAnswerNewOption(oIndex, questionId, event) {
        let checked = event.target.checked;
        let questions = this.state.questions;
        questions[questionId].temp_options[oIndex]['good_answer'] = checked? 1: 0;
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

    async addNewOption(questionId, event) {


        console.log('questionId',questionId); //todo r
        let questions = this.state.questions;
        let question = questions[questionId];
        if (typeof question.temp_options === 'undefined') {
            question.temp_options = [];
            question.last_added_temp_id = 0;
        }

        question.last_added_temp_id++;

        let newTempId = question.last_added_temp_id;

        questions[questionId].temp_options[newTempId] = {
            option_name: '',
            good_answer: false,
            option_id: newTempId
        };

        let url = '/api/add-option-to-question/';
        // let data = {
        //     questionId,
        //     languageId: this.props.userData.languageId
        // };
        //
        // let qData = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(data => {
        //         return data;
        //     });
        //
        // console.log('----qData',qData); //todo r
        // let newId = qData.id;
        //
        // questions[questionId].options[newId] = {
        //     option_name: '',
        //     option_id: newId,
        //     text_id: qData.text_id
        // };

        let inputRefs = this.state.inputRefs;

        inputRefs[questionId] = [];
        this.setState({
            inputRefs,
            questions
        })

        setTimeout(function(lastNewOptionKey){
            this.state.inputRefs[questionId][newTempId].focus()
        }.bind(this), 10,questionId, newTempId) ;


    }

    handleChangeQuestionName(questionIndex, event) {
        let questions = this.state.questions;
        questions[questionIndex].question_name = event.target.value;
        this.setState({
            questions
        });
    }

    async saveEditingQuestionName(index, newName) {
        console.log('newName',newName); //todo r
        console.log('index',index); //todo r

        let questions = this.state.questions;
        questions[index].question_name = newName;

        await this.saveEditingQuestionNameServerRequest(questions[index].question_id, newName);


        this.setState({
            questions
        });
    }

    async deleteThisGroup() {
        let url = '/api/delete-group/';

        let data = {
            groupId: this.state.groupId
        };

        console.log('data',data); //todo r

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
                                            type="text" value={oData.option_name} data-index={oIndex} onChange={this.handleChangeOption.bind(this, oIndex, false)}/>
                                    </div>
                                    <div className="new-option-checkbox-wrapper">
                                        <input tabIndex="-1" type="checkBox"  defaultChecked={oData.good_answer} onChange={this.changeGoodAnswer.bind(this, oIndex, false)} />
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
                {this.state.groupData.group_name &&
                < EditableTextWrapper
                    text={this.state.groupData.group_name}
                    textId={this.state.groupData.text_id}
                    deleteFunction={this.deleteThisGroup.bind(this)}
                    />
                }
            </div>

            <span>Изменение группы #{this.state.groupId}</span>
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
                                <EditableTextWrapper
                                    text={questionData.question_name}
                                    textId={questionData.text_id}
                                    deleteFunction={this.deleteQuestion.bind(this, index, questionData.question_id)}
                                />

                                {/*questionData={JSON.stringify(questionData)}*/}
                            </div>
                        </div>

                        {questionData.options &&
                        <div className="option-list-in-editor">

                            {Object.entries(questionData.options).map(([oIndex, oData]) => (
                                <div className="option-wrapper" key={oIndex}>
                                    <div className="new-option-checkbox-wrapper">
                                        <input tabIndex="-1" type="checkBox"  checked={oData.good_answer} onChange={this.changeGoodAnswer.bind(this, oIndex, index)} />
                                    </div>
                                    <EditableTextWrapper
                                        text={oData.option_name}
                                        textId={oData.text_id}
                                        deleteFunction={this.deleteOptionFromQuestion.bind(this, oIndex, index)}
                                    />
                                </div>

                            ))}

                            {questionData.temp_options && Object.entries(questionData.temp_options).map(([oIndex, oData]) => (
                                <div className="option-wrapper" key={oIndex}>
                                    <div className="new-option-checkbox-wrapper">
                                        <input tabIndex="-1" type="checkBox"  checked={oData.good_answer} onChange={this.changeGoodAnswerNewOption.bind(this, oIndex, index)} />
                                    </div>
                                    <div className="new-option-input-wrapper">
                                        <input
                                            type="text"
                                            value={oData.option_name}
                                            ref={(input) => { this.state.inputRefs[index][oIndex] = input; }}
                                            onChange={this.handleChangeNewOption.bind(this, oIndex, index)}
                                        />
                                        <div className="cancel-save-buttons">

                                            <div className="save-editing-text small-button"
                                                 onClick={this.saveEditingNewOption.bind(this, oIndex, index)}
                                            >
                                                Save
                                            </div>

                                            <div className="cancel-text-editing-button small-button"
                                                 onClick={this.stopEditingNewOption.bind(this, oIndex, index)}
                                                // onClick={this.stopEditingOptionName.bind(this, oIndex, index)}
                                            >
                                                Cancel
                                            </div>

                                        </div>
                                    </div>




                                    {/*<EditableTextWrapper*/}
                                    {/*    text={oData.option_name}*/}
                                    {/*    addingNew={true}*/}
                                    {/*    textId={oData.text_id}*/}
                                    {/*    deleteFunction={this.deleteTempOption.bind(this, oIndex, index)}*/}
                                    {/*/>*/}
                                </div>

                            ))}

                            <input type="text" className="add-new-option"
                                   onFocus={this.addNewOption.bind(this, index)}
                                   placeholder="Add new option"/>
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
