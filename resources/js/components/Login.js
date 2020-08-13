import React, { Component } from 'react';
import store from "../store";

class Login extends React.Component {
    render() {
        return (
            <div className="login-page-wrapper">
                <div className="login-title">
                    Login
                </div>
                <form onSubmit={this.login.bind(this)}>
                    <div className="login-input-wrapper">
                        <input type="text" className="login-input auth-text-input" placeholder="Enter login"
                               onChange={this.changeLogin.bind(this)}
                        value={this.state.login}
                        />
                    </div>
                    <div className="password-input-wrapper">
                        <input type="text" className="password-input auth-text-input" placeholder="Enter password"

                               onChange={this.changePassword.bind(this)}
                               value={this.state.password}
                        />
                    </div>


                    <input className="login-submit" type="submit" value="Login"/>
                </form>



            </div>
        )
    }


    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
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
    changePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    async login(e) {
        e.preventDefault();
        console.log('login')


        let url = '/api/login';
        let data0 = {
            password: this.state.password,
            name: this.state.login
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

export default Login;
