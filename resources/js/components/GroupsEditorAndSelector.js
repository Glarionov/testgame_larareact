import React, { Component } from 'react';
import QuestionSetEditor from './QuestionSetEditor'



class GroupEditorAndSelector extends React.Component {

    render() {
        return  (<div className="">
            <div className="group-editor-selector">
                {Object.entries(this.state.groups).map(([oIndex, groupData]) => (
                    <div className="new-option-wrapper" key={oIndex}>
                        groupData={JSON.stringify(groupData)}
                        {groupData.group_name}
                    </div>
                ))}
                <form onSubmit={this.handleGroupAdder.bind(this)}>
                <input type="text" value={this.state.newGroupValue} onChange={this.handleGroupNameChange.bind(this)} />
                    <div className="question-adder-wrapper-submit">
                        <input type="submit" value="Add" />
                    </div>
                </form>
            </div>
        </div>)
    }

    constructor(props) {
        super(props);
        this.state = {
            groups: {},
            currentLanguageId: 1,
            newGroupValue: '',
            languageId: 1

        }
    }

    async componentDidMount() {
        let url = '/api/get-question-group-list/';

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

        console.log('qData',qData); //todo r
        this.setState({
            groups: qData.group_data,
        });
    }

    handleGroupNameChange(event) {
        this.setState({newGroupValue: event.target.value});
    }

    async handleGroupAdder(event) {
        event.preventDefault();
        let url = '/api/add-group/';

        let data = {
            groupName: this.state.newGroupValue,
            languageId: this.state.languageId
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
        this.setState({
            groups: qData,
        });
    }


}

export default GroupEditorAndSelector;
