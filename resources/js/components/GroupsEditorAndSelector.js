import React, { Component } from 'react';
import QuestionSetEditor from './QuestionSetEditor'
import {BrowserRouter as Router, Link} from "react-router-dom";
import EditableTextWrapper from "./EditableTextWrapper";


class GroupEditorAndSelector extends React.Component {

    render() {
        return  (<div className="group-editor-and-selector">

            <div className="group-editor-selector">
                {Object.entries(this.state.groups).map(([oIndex, groupData]) => (
                    <div className="new-option-wrapper" key={oIndex}
                        // onClick={this.clickOnGroup.bind(this, groupData.group_id)}
                    >
                        <EditableTextWrapper
                            text={groupData.group_name}
                            textId={groupData.text_id}
                            clickOnTextFunction = {this.clickOnGroup.bind(this, groupData.group_id)}
                            deleteFunction={this.deleteGroup.bind(this,oIndex, groupData.group_id)}
                        />

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

    handleChangeGroupName(index, newName) {
        // let groups = this.state.groups;
        // groups[index].group_name = newName;
        // this.setState({
        //     groups
        // });
    }

    async deleteGroup(index, groupId) {
        let url = '/api/delete-group/';


        let groups = this.state.groups;
        delete groups[index];
        this.setState({groups})

        let data = {
            groupId,
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

    async saveEditingGroupName(index, groupId, newName) {
        console.log('index',index); //todo r
        console.log('newName',newName); //todo r
        console.log('groupId',groupId); //todo r
        let url = '/api/change-group-name/';

        let groups = this.state.groups;
        groups[index].group_name = newName;
        this.setState({groups})

        let data = {
            groupId,
            newName,
            languageId: 1
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

    clickOnGroup (e, id) {
        if (typeof this.props.parentClickEvent === 'function') {
            // this.props.parentClickEvent(e, this.props.index);
            this.props.parentClickEvent(e, id);
        }
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
        let groups = this.state.groups;
        groups.push(
            {
                group_id: qData.new_id,
                group_name: this.state.newGroupValue,
            }
        )
        this.setState({
            groups,
            newGroupValue: ''
        });
    }


}

export default GroupEditorAndSelector;
