import React, { Component } from 'react';
import QuestionSetEditor from './QuestionSetEditor'
import QuestionSetEditorWrapper from "./QuestionSetEditorWrapper";
import GroupEditorAndSelector from './GroupsEditorAndSelector'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Questions from "./Questions";
import Game1 from "./Game1";
import NotFound from "./NotFound";


class QuestionSets extends React.Component {


    render() {
        return  (<div className="question-sets-wrapper">
            <GroupEditorAndSelector parentClickEvent={this.changeGroupId.bind(this)}/>
            <QuestionSetEditorWrapper groupId = {this.state.groupId}
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

    async componentDidMount() {
        ///api/user/login/

        //
        // let url0 = "/api/user/register";
        //
        // let data0 = {
        //     email: 'ea@e.e',
        //     password: 'pp',
        //     name: 'nn'
        // }
        // let qData0 = await fetch(url0, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data0)
        // })
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(data => {
        //         return data;
        //     });
        //
        // console.log('reg=====qData',qData0); //todo r
        //
        // let url = '/api/user/login/';
        //
        // let data = {
        //     email: 'ea@e.e',
        //     password: 'pp'
        // };
        //
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
        // console.log('log=====qData',qData); //todo r

    }

    changeGroupId(id) {
        console.log('id',id); //todo r
        this.setState({
            groupId: id
        });
    }
}

export default QuestionSets;
