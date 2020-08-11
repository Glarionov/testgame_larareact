import React, { Component } from 'react';
// import Questions from './Questions'
import ReactDOM from 'react-dom';




class EditableText extends React.Component {



    render() {
        return (
            <div className="editable-text-wrapper">

                {this.state.currentlyEditing &&
                <div className="editable-text">
                    <input type="text"
                        // value={this.props.text}
                        value={this.state.currentlyEditingText}
                           onChange={this.changeText.bind(this)}
                        // onChange={this.handleChangeOption.bind(this, oIndex, index)}
                    />

                    <div className="cancel-save-buttons">
                        <div className="save-editing-text small-button"
                             onClick={this.saveEditing.bind(this)}
                        >
                            Save
                        </div>

                        <div className="cancel-text-editing-button small-button"
                             onClick={this.stopEditing.bind(this)}
                            // onClick={this.stopEditingOptionName.bind(this, oIndex, index)}
                        >
                            Cancel
                        </div>

                    </div>
                </div>
                }
                {
                    !this.state.currentlyEditing && this.props.userData && this.props.userData.canEditCommonQuestions &&
                        <div className="not-editing-text">

                            {this.props.clickOnTextFunction &&
                            <div onClick={this.props.clickOnTextFunction.bind(this)

                            }
                                 >
                                {this.state.textBeforeEditing}
                            </div>
                            }

                            {!this.props.clickOnTextFunction &&
                            this.state.textBeforeEditing
                            }

                            <img
                                onClick={this.startEditing.bind(this)}
                                className="edit-icon" src="../../images/icons8-edit.svg"
                            />

                        </div>
                }
                {!this.state.addingNew &&
                <div className="wrapper-for-icon-on-top">
                    <img
                        onClick={this.deleteIt.bind(this)}
                        className="delete-icon" src="../../images/icons8-delete.svg"
                    />
                </div>
                }



            </div>
        )
    }

    deleteIt() {
        this.props.deleteFunction();
    }

    changeText(event) {
        // this.props.changeEvent(event);
        this.setState({currentlyEditingText: event.target.value});
    }

    startEditing() {
        this.setState({
            currentlyEditing: true,
            currentlyEditingText: this.props.text
        })
    }

    stopEditing() {
        this.setState({
            currentlyEditing: false,

        })
    }

    async saveEditing() {
        // this.props.saveEditingParentFunction(this.state.currentlyEditingText);
        console.log('this.state.currentlyEditingText',this.state.currentlyEditingText); //todo r
        let currentlyEditing = this.state.currentlyEditingText;

        this.setState({
            currentlyEditing: false,
            textBeforeEditing: currentlyEditing
            // currentlyEditingText: this.props.text
        })

        console.log('this.state.textBeforeEditing',this.state.textBeforeEditing); //todo r

        console.log('this.props.language_id',this.props.userData.languageId); //todo r

        await this.changeTextById();
        // this.stopEditing();
    }

    async changeTextById() {
        let url = '/api/change-text-by-id/';

        let data = {
            textId: this.props.textId,
            textValue: this.state.currentlyEditingText,
            languageId: this.props.userData.languageId
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

    }

    async componentDidUpdate(prevProps) {
        if (prevProps.textId !== this.props.textId) {
            this.setState({
                textBeforeEditing: this.props.text,
                currentlyEditingText: this.props.text,
            })
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            currentlyEditing: false,
            text: 'example',
            textBeforeEditing: this.props.text,
            currentlyEditingText: this.props.text,
            textId: this.props.textId,
            addingNew: typeof this.props.addingNew !== 'undefined' && this.props.addingNew
        }
    }

    componentDidMount() {
        this.setState({
            // textBeforeEditing: this.props.text,
            // currentlyEditingText: this.props.text,
        })
    }
}

export default EditableText;
