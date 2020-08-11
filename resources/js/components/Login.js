import React, { Component } from 'react';
// import Questions from './Questions'
import ReactDOM from 'react-dom';




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

    login(e) {
        console.log('login')
        e.preventDefault();
    }
}

export default Login;
