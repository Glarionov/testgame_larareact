import React, { Component } from 'react';
import SingleQuestion from './SingleQuestion'
import QuestionOption from "./QuestionOption";

class Questions extends React.Component {

    constructor(props) {
        super(props);
        this.data = {
            goodAnswerScoreChange: 10,
            badAnswerScoreChange: -5,
        }







        this.state = {score: 0, currentQuestionIndex: 0,
            // questions,
            questions: {},
            // currentQuestion: questions[0],
            currentQuestion: {},
            lastQuestion: false, showingResult: false,
            // maxScore: questions.length * this.data.goodAnswerScoreChange,
            maxScore: 0,
            clickedOptions: [[]],
            clickedOptionsByQuestionIndex: {}
        };




        console.log('this.state.questions',this.state.questions); //todo r

        this.computed = {
            lastQuestion: () => {
                this.setState({
                    lastQuestion: this.state.currentQuestionIndex < this.state.questions.length - 1
                })
            }
        }

        // this.state.questions[0].clickedOptions = [];

    }

    async componentDidMount() {
        let url = '/api/get-question-group/1';

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
                return data.questionsByGroup;
            });

        qData['clicked_options'] = [];
        this.setState({
            questions: qData,
            currentQuestion: qData[this.state.currentQuestionIndex]
        });
    }

    changeScore(goodAnswer, id) {
        console.log('goodAnswer', goodAnswer)
        let changer = goodAnswer? this.data.goodAnswerScoreChange: this.data.badAnswerScoreChange;
        //

        let cc = this.state.currentQuestion;


        if (typeof this.state.clickedOptionsByQuestionIndex[this.state.currentQuestionIndex] == "undefined") {
            this.state.clickedOptionsByQuestionIndex[this.state.currentQuestionIndex] = [];
        }

        this.state.clickedOptionsByQuestionIndex[this.state.currentQuestionIndex].push(id);

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

        let questions = this.state.questions;

        questions[this.state.currentQuestionIndex] = cc;

        this.setState(prevState => ({
            // questionData: qd,
            // clickedOptions:  [...prevState.clickedOptions, 2]
            currentQuestion:  cc,
            questions: questions
        }));

        return 'zzzzzzzzz';
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

        console.log('currentIndex',currentIndex); //todo r

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

        if(Object.keys(this.state.questions).length)

            if (this.state.showingResult) {
                return (<div className="show-result">Your score is {this.state.score} out of {this.state.maxScore}
                <div className="start-again" onClick={this.startTestAgain.bind(this)}>Start test again</div>
                </div> );
            } else {



                return (<div key={this.state.questions}>this.state.questions={Object.keys(this.state.questions).length}
                    questions={JSON.stringify(this.state.questions)}
                    this.state.clickedOptionsByQuestionIndex={JSON.stringify(this.state.clickedOptionsByQuestionIndex)}
                    {/*qqqq={this.state.questions}*/}

                    score: {this.state.score}

                    <SingleQuestion questionData={this.state.currentQuestion}
                                    key={this.state.currentQuestionIndex}
                                    changeScore={this.changeScore.bind(this)}
                                    clickedOptions={typeof this.state.clickedOptionsByQuestionIndex[this.state.currentQuestionIndex] == "undefined" ? [] : this.state.clickedOptionsByQuestionIndex[this.state.currentQuestionIndex]}
                    />

                    <div className="next-question"
                         onClick={this.changeQuestion.bind(this, -1)}
                    >
                        prev
                    </div>

                    {nextButton()}

                </div>);
            }

        return (
            <div className="abc">NOT READY</div>
        )


        let images = this.questions.map((el, i) => (
            <img key={i} className='images' src={el.path_lower} />
        ))

        return (
            <div className="folioWrapper">
                {images}
            </div>
        );
        // if (this.state.questions.length > 0) {
        //     return (
        //         <div className="abc" key="this.state.questions">HAVE</div>
        //     );
        //
        //
        // } else {
        //     return (
        //         <div className="abc"  key="this.state.questions">NOT HAVE</div>
        //     );
        //
        // }
        // const nextButton = ()=>{
        //     if(this.state.lastQuestion){
        //         return <div onClick={this.openTestResult.bind(this, 1)}>See result</div>
        //     } else{
        //         return <div className="next-question" onClick={this.changeQuestion.bind(this, 1)}>Next</div>
        //     }
        // }
        //
        // if (this.state.showingResult) {
        //     return (<div className="show-result">Your score is {this.state.score} out of {this.state.maxScore}
        //     <div className="start-again" onClick={this.startTestAgain.bind(this)}>Start test again</div>
        //     </div> );
        // } else {
        //     return  (<div className="questions">
        //         <div>
        //         th22222222is.state.currentQuestion.clickedOptions={JSON.stringify(this.state.currentQuestion.clickedOptions)}
        //         </div>
        //         score: {this.state.score}
        //         <SingleQuestion questionData={this.state.currentQuestion}
        //                         key={this.state.currentQuestionIndex}
        //                         changeScore={this.changeScore.bind(this)}
        //                         clickedOptions={typeof this.state.currentQuestion.clickedOptions == "undefined"?[]: this.state.currentQuestion.clickedOptions}
        //         />
        //
        //         this.currentQuestionIndex={this.state.currentQuestionIndex}
        //         this.state.questions.length={this.state.questions.length}
        //         this.lastQuestion={this.state.lastQuestion}
        //
        //         <div className="next-question"
        //              onClick={this.changeQuestion.bind(this, -1)}
        //         >
        //             prev
        //         </div>
        //         {nextButton()}
        //     </div>)
        // }


    }
}

export default Questions;
