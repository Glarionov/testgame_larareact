import React, { Component } from 'react';
import QuestionOption from './QuestionOption'

class SingleQuestion extends React.Component {
    clickOnOption(e, id) {
        // id = parseInt(id);

        console.log('id',id); //todo r
console.log('this.state.clickedOptions',this.state.clickedOptions); //todo r


        console.log('this.props.questionData.clickedOptions', this.props.questionData.clickedOptions)


        if (typeof this.props.questionData.clickedOptions == "undefined") {
            this.props.questionData.clickedOptions = [];
        }

        if (this.props.questionData.clickedOptions.includes(id)) {
            console.log('includes')
            return true;
        } else {
            console.log('not includes')
        }

        let qd = this.state.questionData;

        console.log('11111this.props.questionData',this.props.questionData); //todo rs


        if (this.props.questionData.options[id]['good_answer']) {
            qd.options[id].extraClass = "good";
            let cs = this.props.changeScore(true, id);
            console.log('cs',cs); //todo r
        } else {
            qd.options[id].extraClass = "bad";
            this.props.changeScore(false, id);
        }


        // let qd = this.state.questionData;
        // qd.options[parseInt(id)].extraClass;


        // this.state.clickedOptions.push(id)
        this.setState(prevState => ({
            questionData: qd,
            // clickedOptions:  [...prevState.clickedOptions, id]
        }));



        console.log(this.props.questionData.options[parseInt(id)].extraClass);
        // this.props.changeScore(5);
    }

    t2() {

    }

    constructor(props) {
        super(props);

        let qd = this.props.questionData;
        // qd.options[0].extraClass = "";
        // qd.options[1].extraClass = "";

        for (let i in qd.options) {
            qd.options[i].extraClass = '';
        }

        // qd.options.map( (e) => {
        //     e.extraClass = "";
        // });
        this.state = {
            questionData: this.props.questionData,
            // clickedOptions: this.props.clickedOptions
            clickedOptions: []
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
        this.setState({ clickedOptions: this.props.clickedOptions })
    }


    componentDidMount() {

    }


    render() {
        return  (<div className="single-question">
            SINGLE_QUESTION
            <div key={this.state.clickedOptions}>
                this.props.questionData.clickedOptions = {JSON.stringify(this.props.questionData.clickedOptions)}
            </div>

            <div>
                this.state.questionData={JSON.stringify(this.state.questionData)}
            </div>
            <div className="question-name">
                {this.state.questionData.question_name}
            </div>
                {/*{this.props.questionData.options.map((question, index) =>*/}
            {  Object.entries(this.state.questionData.options).map(([index, optionData]) => (
                <div key={optionData.option_id}>
                    <QuestionOption optionData = {optionData} index={optionData.option_id}  parentClickEvent={this.clickOnOption.bind(this)}/>
                    {/*<div key={optionData.index}*/}
                    {/*     id={optionData.id}*/}
                    {/*     onClick={this.clickOnOption}*/}
                    {/*>*/}
                    {/*    index={index}*/}
                    {/*    {optionData.text} </div>*/}
                </div>

                // )}
                ))}



        </div>)
    }
}

export default SingleQuestion;
