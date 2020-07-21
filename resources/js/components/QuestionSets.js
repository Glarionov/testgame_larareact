import React, { Component } from 'react';
import QuestionSetEditor from './QuestionSetEditor'
import GroupEditorAndSelector from './GroupsEditorAndSelector'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Questions from "./Questions";
import Game1 from "./Game1";
import NotFound from "./NotFound";


class QuestionSets extends React.Component {


    render() {
        return  (<div className="question-sets-wrapper">
            <GroupEditorAndSelector parentClickEvent={this.changeGroupId.bind(this)}/>
            <QuestionSetEditor groupId = {this.state.groupId}
            />
        </div>)
    }

    constructor(props) {
        super(props);
        this.state = {
            groupId: 1,
            languageId: 1
        }
    }

    changeGroupId(id) {
        console.log('id',id); //todo r
        this.setState({
            groupId: id
        });
    }
}

export default QuestionSets;
