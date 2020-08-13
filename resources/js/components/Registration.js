import React, { Component } from 'react';
import store from "../store";

class Registration extends React.Component {
    render() {
        return (
            <div className="login-page-wrapper">
                <div className="login-title">
                    Registration
                </div>
                <form onSubmit={this.register.bind(this)}>
                    <div className="login-input-wrapper">
                        <input type="text" className="login-input auth-text-input" placeholder="Enter login"
                               onChange={this.changeLogin.bind(this)}
                               value={this.state.login}
                        />
                    </div>
                    <div className="email-input-wrapper">
                        <input type="text" className="login-input auth-text-input" placeholder="Enter email"
                               onChange={this.changeEmail.bind(this)}
                               value={this.state.email}
                        />
                    </div>
                    <div className="password-input-wrapper">
                        <input type="text" className="password-input auth-text-input" placeholder="Enter password"

                               onChange={this.changePassword.bind(this)}
                               value={this.state.password}
                        />
                    </div>
                    <div className="password-input-wrapper">
                        <input type="text" className="password-input auth-text-input" placeholder="Confirm password"

                               onChange={this.changePasswordConfirm.bind(this)}
                               value={this.state.passwordConfirm}
                        />
                    </div>

                    <div className="phone-input-wrapper">
                        <input type="tel" className="login-input auth-text-input" placeholder="Enter phone"
                               onChange={this.changePhone.bind(this)}
                               value={this.state.phone}
                        />
                    </div>

                    <input className="login-submit" type="submit" value="Go"/>
                </form>



            </div>
        )
    }


    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            passwordConfirm: '',
            email: '',
            phone: ''
        }
    }

    componentDidMount() {
        this.setState({
            // textBeforeEditing: this.props.text,
            // currentlyEditingText: this.props.text,
        })
    }

    changeLogin(e) {
        this.setState({
            login: e.target.value
        })
    }

    changePasswordConfirm(e) {
        this.setState({
            passwordConfirm: e.target.value
        })
    }
    changeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    changePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    changePassword(e) {
        this.setState({
            password: e.target.value
        })
    }


    async register(e) {
        e.preventDefault();
        console.log('login')

        if (this.state.password !== this.state.passwordConfirm) {
            console.log('111111')
            return false;
        }
        console.log(2222222222)

        let url = '/api/register';
        let data0 = {
            password: this.state.password,
            name: this.state.login,
            email: this.state.password,
            phone: this.state.phone,
        }

        let userData = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data0)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            });

        console.log('=========userData',userData); //todo r

        if (userData.access_token) {
            localStorage.setItem('authToken', userData.access_token)

            store.dispatch(
                {
                    type: 'USER_LOADED',
                    payload: {userData: userData.user}
                }
            )
            this.props.history.push("/question-sets");
        }
    }
}

export default Registration;
