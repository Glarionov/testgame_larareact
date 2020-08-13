import React, { Component } from 'react';
import QuestionSetEditor from './QuestionSetEditor'
import {BrowserRouter as Router, Link} from "react-router-dom";
import EditableTextWrapper from "./EditableTextWrapper";

class GroupBranchShower extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: {},
            currentLanguageId: 1,
            newGroupValue: '',
            languageId: 1,
            showSubGroupAdder: false,
            subGroups: this.props.groupsData.subgroups ?? []
        }
    }

    componentDidMount() {
        this.setState({
            subGroups: this.props.groupsData.subgroups ?? []
        })
    }

    toggleSubgroupAdder() {
        this.setState(prevState => {
            return {
                showSubGroupAdder: !prevState.showSubGroupAdder
            }
        })
    }

    handleGroupNameChange(event) {
        this.setState({newGroupValue: event.target.value});
    }

    changePage(event) {
        event.preventDefault();
        this.props.history.push("/web/read_section_article/" + this.props.sectionId);
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

    clickOnGroup (e, id) {
        if (typeof this.props.parentClickEvent === 'function') {
            // this.props.parentClickEvent(e, this.props.index);
            this.props.parentClickEvent(e, id);
        }
    }

    async handleGroupAdder(event) {
        event.preventDefault();
        let url = '/api/add-group/';

        let data = {
            groupName: this.state.newGroupValue,
            languageId: this.state.languageId,
            parentId: this.props.parentId
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
        let groups = this.state.subGroups;
        groups[qData.new_id] =
            {
                group_id: qData.new_id,
                group_name: this.state.newGroupValue,
            }
        this.setState({
            subGroups: groups,
            newGroupValue: ''
        });
    }

    render() {
        let match=this.props.match
        return (<div className="section-shower">
                <div className="section-title-in-menu">

                    <div className="flexer">



                        <div className="group-item"
                        onClick= {this.clickOnGroup.bind(this, this.props.groupsData.group_id)}
                        >

                            {this.props.groupsData.group_name}
                        </div>
                        {/*<EditableTextWrapper*/}
                        {/*    text={this.props.groupsData.group_name}*/}
                        {/*    textId={this.props.groupsData.text_id}*/}
                        {/*    clickOnTextFunction = {this.clickOnGroup.bind(this, this.props.groupsData.group_id)}*/}
                        {/*    deleteFunction={this.deleteGroup.bind(this,this.props.groupId, this.props.groupsData.group_id)}*/}
                        {/*/>*/}

                        <div className="subgroup-adder"
                             onClick={this.toggleSubgroupAdder.bind(this)}

                        >
                            {this.state.showSubGroupAdder && "-"}
                            {!this.state.showSubGroupAdder && "+"}
                        </div>

                    </div>

                    {this.state.showSubGroupAdder &&
                    <form onSubmit={this.handleGroupAdder.bind(this)}>
                        <input type="text" value={this.state.newGroupValue}
                               onChange={this.handleGroupNameChange.bind(this)}/>
                        <div className="question-adder-wrapper-submit">
                            <input type="submit" value="Add"/>
                        </div>
                    </form>
                    }


                    {/*{this.props.groupsData.subgroups &&*/}
                    {this.state.subGroups &&
                    <div className="subgroups">
                        {Object.entries(this.state.subGroups).map(([oIndex, groupData]) => (
                            <div className="subgroup-wrapper" key={oIndex}
                                // onClick={this.clickOnGroup.bind(this, groupData.group_id)}
                            >

                                <GroupBranchShower
                                    history={this.props.history} key={oIndex} sectionId={oIndex} fromParent = "1" groupsData={groupData}
                                    parentClickEvent={this.props.parentClickEvent.bind(this)}
                                    parentId={oIndex}
                                />
                                {/*<EditableTextWrapper*/}
                                {/*    text={groupData.group_name}*/}
                                {/*    textId={groupData.text_id}*/}
                                {/*    clickOnTextFunction = {this.clickOnGroup.bind(this, groupData.group_id)}*/}
                                {/*    deleteFunction={this.deleteGroup.bind(this,oIndex, groupData.group_id)}*/}
                                {/*/>*/}

                            </div>
                        ))}
                    </div>

                    }

                    {/*{HomeButton()}*/}
                    {/*<Router>*/}
                    {/*    <a href={"/web/read_section_article/" + this.props.sectionId}*/}
                    {/*       onClick={this.changePage.bind(this)}*/}
                    {/*    >*/}
                    {/*        {this.props.sectionData.section_title}*/}
                    {/*    </a>*/}
                    {/*</Router>*/}
                </div>
                {/*{this.props.sectionData.subsections &&*/}
                {/*<div className="subsection-wrapper">*/}
                {/*    {*/}
                {/*        Object.entries(this.props.sectionData.subsections).map(([sectionId, sectionData]) => (*/}
                {/*                <SectionShower history={this.props.history} key={sectionId} sectionId={sectionId} fromParent = "1" sectionData={sectionData} />*/}
                {/*            )*/}
                {/*        )*/}
                {/*    }*/}

                {/*</div>*/}
                {/*}*/}
            </div>
        )
    }
}

class GroupEditorAndSelector extends React.Component {

    render() {
        return  (<div className="group-editor-and-selector">

            <div className="group-editor-selector">
                {Object.entries(this.state.groups).map(([oIndex, groupData]) => (
                    <GroupBranchShower
                        history={this.props.history} key={oIndex} groupId={oIndex} fromParent = "1" groupsData={groupData}
                        parentClickEvent={this.props.parentClickEvent.bind(this)}
                        parentId={oIndex}
                    />
                    // <div className="new-option-wrapper" key={oIndex}
                    //     // onClick={this.clickOnGroup.bind(this, groupData.group_id)}
                    // >
                    //     <EditableTextWrapper
                    //         text={groupData.group_name}
                    //         textId={groupData.text_id}
                    //         clickOnTextFunction = {this.clickOnGroup.bind(this, groupData.group_id)}
                    //         deleteFunction={this.deleteGroup.bind(this,oIndex, groupData.group_id)}
                    //     />
                    //
                    // </div>
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
