import React, { Component } from 'react';
import QuestionSetEditor from './QuestionSetEditor'
import GroupEditorAndSelector from './GroupsEditorAndSelector'

class QuestionSets extends React.Component {



    render() {
        return  (<div className="question-sets-wrapper">
            <GroupEditorAndSelector />
            <QuestionSetEditor />
        </div>)
    }
}

export default QuestionSets;
