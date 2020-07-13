import React, { Component } from 'react';
import SingleQuestion from './SingleQuestion'

class Questions extends React.Component {

    constructor(props) {
        super(props);

        let questions = [
            {
                name: 'set color of text',
                answers: [0],
                options: {
     0 :       {
                id: 0,
                text: 'color'
            },
        1:    {
                id: 1,
                text: 'text-color'
            }
    }
            },
            {
                name: 'set color of background',
                answers: [0],
                options: {
                    0 :       {
                        id: 0,
                        text: 'background'
                    },
                    1:    {
                        id: 1,
                        text: 'text-color'
                    }
                }
            }
        ];
        this.data = {
            goodAnswerScoreChange: 10,
            badAnswerScoreChange: -5,
        }


        this.state = {score: 0, currentQuestionIndex: 0, questions, currentQuestion: questions[0],
            lastQuestion: false, showingResult: false, maxScore: questions.length * this.data.goodAnswerScoreChange,
            clickedOptions: [[]]
        };

        this.computed = {
            lastQuestion: () => {
                this.setState({
                    lastQuestion: this.state.currentQuestionIndex < this.state.questions.length - 1
                })
            }
        }

        this.state.questions[0].clickedOptions = [];

    }

    changeScore(goodAnswer, id) {
        console.log('goodAnswer', goodAnswer)
        let changer = goodAnswer? this.data.goodAnswerScoreChange: this.data.badAnswerScoreChange;
        //

        let cc = this.state.currentQuestion;



        if (typeof cc.clickedOptions === "undefined") {
            cc.clickedOptions = [];
        }

        cc.clickedOptions.push(id);
        // this.state.currentQuestion.clickedOptions.push(1);
        //
        this.setState({
            score: this.state.score + changer
        })
        //


        this.setState(prevState => ({
            // questionData: qd,
            // clickedOptions:  [...prevState.clickedOptions, 2]
            currentQuestion:  cc
        }));
    }

    changeQuestion(indexChange, relativeChange = true) {
        console.log('indexChange',indexChange); //todo r
        console.log('relativeChange',relativeChange); //todo r

        let currentIndex = this.state.currentQuestionIndex;
        if (relativeChange) {
            currentIndex +=indexChange;
        } else {
            currentIndex =indexChange;
        }

        this.state.questions[currentIndex].clickedOptions = [];
        console.log('this.state.questions[currentIndex]',this.state.questions[currentIndex]); //todo r
        let newQuestion = this.state.questions[currentIndex];
        console.log('newQuestion',newQuestion); //todo r

        this.setState({
            currentQuestion: this.state.questions[currentIndex],
        })

        this.setState({
            currentQuestionIndex: currentIndex,
        })
        this.computed.lastQuestion();
        console.log('currentIndex',currentIndex); //todo r
        console.log('this.state.currentQuestion',this.state.currentQuestion); //todo r

    }

    openTestResult() {
        this.setState({
            showingResult: true
        });
    }

    startTestAgain() {

        this.changeQuestion(0, false);

        this.setState({
            showingResult: false,
            clickedOptions: [[]],
            score: 0
        });
    }

    render() {

        const nextButton = ()=>{
            if(this.state.lastQuestion){
                return <div onClick={this.openTestResult.bind(this, 1)}>See result</div>
            } else{
                return <div className="next-question" onClick={this.changeQuestion.bind(this, 1)}>Next</div>
            }
        }

        if (this.state.showingResult) {
            return (<div className="show-result">Your score is {this.state.score} out of {this.state.maxScore}
            <div className="start-again" onClick={this.startTestAgain.bind(this)}>Start test again</div>
            </div> );
        } else {
            return  (<div className="questions">
                <div>
                th22222222is.state.currentQuestion.clickedOptions={JSON.stringify(this.state.currentQuestion.clickedOptions)}
                </div>
                score: {this.state.score}
                <SingleQuestion questionData={this.state.currentQuestion}
                                key={this.state.currentQuestionIndex}
                                changeScore={this.changeScore.bind(this)}
                                clickedOptions={typeof this.state.currentQuestion.clickedOptions == "undefined"?[]: this.state.currentQuestion.clickedOptions}
                />

                this.currentQuestionIndex={this.state.currentQuestionIndex}
                this.state.questions.length={this.state.questions.length}
                this.lastQuestion={this.state.lastQuestion}

                <div className="next-question"
                     onClick={this.changeQuestion.bind(this, -1)}
                >
                    prev
                </div>
                {nextButton()}
            </div>)
        }


    }
}

export default Questions;