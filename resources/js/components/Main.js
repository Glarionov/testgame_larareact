import React, { Component } from 'react';
// import Questions from './Questions'
import ReactDOM from 'react-dom';
import Questions from './Questions'
import QuestionSets from './QuestionSets'
import Game1 from './Game1'
import TestLanguageWrapper from "./TestLanguageWrapper";
import NotFound from './NotFound'
import Home from './Home'
import About from './About'
import RouteTest from './RouteTest'
import Login from './Login'
import Registration from './Registration'
import '../../sass/main.css'

import { bindActionCreators, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import rootReducer from '../store/reducers'

import {loadUser} from "../store/actions/authActions";

import store from '../store';

// import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const rootReducer2 = (state = {language_id: 1}, action) => {
    console.log('action.payload',action.payload); //todo r
    switch (action.type) {
        case 'ACTION_CHANGE_FIRST_NAME':
            return {
                firstName: action.payload.firstName,
                language_id: 3
            }

        case 'SET_USER_SETTINGS':
            return {
                ...state,
            userId: action.payload.userId,
                userName: action.payload.userName
            }

        default:
            return state
    }
}

const setEngLanguageActionCreator = (firstName) => {
    return {
        type: 'ACTION_CHANGE_FIRST_NAME',
        payload:
            {
                firstName: firstName
            }

    }
};

// const store = createStore(rootReducer2)


// store.dispath()


class Main extends React.Component {


    constructor(props) {
        super(props);

        let ss = store.getState();





        console.log('ss',ss); //todo r
        console.log('555555555555')



        localStorage.setItem('authToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU5NzAwMTUyNSwiZXhwIjoxNTk3MDA1MTI1LCJuYmYiOjE1OTcwMDE1MjUsImp0aSI6IjhyY3pySWJPTFpieFhld1IiLCJzdWIiOjUsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.-GkY1ABH5ho8ptelSoj8JqCuH7oso-Y2NUmfldEcMec');
        let authToken = localStorage.getItem('authToken');

        console.log('authToken',authToken); //todo r
        this.state = {
            isLogined: false,
            authToken: authToken,
            userName: '',
            userId: 0
        }
        console.log('this.state',this.state); //todo r
    }

    async componentDidMount() {
        const setEngLanguage = {
            type: 'SET_DEFAULT_LANGUAGE',
            payload: null
        };

        const setEngLanguageActionCreator = (languageId) => {
            console.log('languageId',languageId); //todo r
            return {
                type: 'SET_DEFAULT_LANGUAGE',
                payload:
                    {
                        language_id: languageId
                    }

            }
        };


        let url0 = "/api/user?token=" + this.state.authToken;

        let data0 = {
            email: 'ea@e.e',
            password: 'pp',
            name: 'nn'
        }
        let userData = await fetch(url0, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            });

        if (typeof userData.id !== 'undefined' && userData.id) {
            this.setState({
                isLogined: true,
                userId: userData.id,
                userName: userData.name
            })
        }

        const {lUser} = this.props;

        // await store.dispatch(loadUser())89003276256
        // await store.dispatch(loadUser())

        lUser();

        console.log('userData',userData); //todo r
        store.dispatch(
            {
                type: 'USER_LOADED',
                payload: {userData}
            }
        )

        console.log('this.props.isAuthenticated',this.props.isAuthenticated); //todo r

        console.log('this.props.userData',this.props.userData); //todo r
        console.log('this.state',this.state); //todo r
    }

    Home() {
        return <h2>Home</h2>;
    }

    About() {
        return <h2>About</h2>;
    }



    // Topics() {
    //     let match = useRouteMatch();
    //
    //     return (
    //         <div>
    //             <h2>Topics</h2>
    //
    //             <ul>
    //                 <li>
    //                     <Link to={`${match.url}/components`}>Components</Link>
    //                 </li>
    //                 <li>
    //                     <Link to={`${match.url}/props-v-state`}>
    //                         Props v. State
    //                     </Link>
    //                 </li>
    //             </ul>
    //
    //             {/* The Topics page has its own <Switch> with more routes
    //       that build on the /topics URL path. You can think of the
    //       2nd <Route> here as an "index" page for all topics, or
    //       the page that is shown when no topic is selected */}
    //             <Switch>
    //                 <Route path={`${match.path}/:topicId`}>
    //                     <this.Topic />
    //                 </Route>
    //                 <Route path={match.path}>
    //                     <h3>Please select a topic.</h3>
    //                 </Route>
    //             </Switch>
    //         </div>
    //     );
    // }
    //
    // Topic() {
    //     let { topicId } = useParams();
    //     return <h3>Requested topic ID: {topicId}</h3>;
    // }


    render() {


        const {firstName, changeFirstName} = this.props;

        return (



            <div className="main-wrapper">


            <div className="main">
                {/*<input type="text"*/}
                {/*       value={this.props.firstName}*/}
                {/*onChange={(event) => {*/}
                {/*    changeFirstName(event.target.value)*/}

                {/*    console.log('111this.props',this.props); //todo r*/}
                {/*}}*/}
                {/*/>*/}
            <Router>
                <header>


                <div className="router-links-wrapper">


                    <div className="top-menu-item">
                        <Link to="/questions">Простой тест</Link>
                    </div>
                    <div className="top-menu-item">
                        <Link to="/game1/1">Игра</Link>
                    </div>
                    <div className="top-menu-item">
                        <Link to="/question-sets">Управление вопросами</Link>
                    </div>
                    <div className="auth-wrapper">
                        {
                            this.state.isLogined &&
                                <div className="loggined-wrapper">
                                    <span>{this.state.userName}</span>
                                    <div className="logout">
                                        Logout
                                    </div>
                                </div>

                        }
                        {
                            !this.state.isLogined &&
                            <span>
                                                            <div className="top-menu-item">
                            <Link to="/login">Login</Link>
                            </div>
                            <div className="top-menu-item">
                            <Link to="/registration">Registration</Link>
                            </div>
                            </span>



                        }
                    </div>
                </div>
                </header>

                <div className="content">
                    <Switch>
                        <Route path="/questions" component={Questions}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/registration" component={Registration}/>
                        {/*<Route path="/game1/1" component={Game1} />*/}
                        <Route path="/game1/:id" component={Game1}/>
                        <Route path="/question-sets" component={QuestionSets}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>

            </Router>




            {/*<Questions />*/}
            {/*<Game1 />*/}
        </div>
        {/*<div className="bottom-grass"*/}
        {/*    // style={this.state.bottomGrassStyle}*/}
        {/*>*/}

        {/*</div>*/}
        {/*        <div className="under-bottom">*/}
        {/*            UNDER BOTTOM*/}
        {/*        </div>*/}
            </div>

                );

    }


}

const mapStateToProps = (state) => {
    return {
        firstName: state.firstName,
        isAuthenticated: state.auth.isAuthenticated,
        userData: state.auth.userData
    }
}

const putActionsToProps = (dispatch) => {
    return {
        changeFirstName: bindActionCreators(setEngLanguageActionCreator, dispatch),
        changeSecondName: bindActionCreators(setEngLanguageActionCreator, dispatch),
        lUser: bindActionCreators(loadUser, dispatch)
    }
}

const WrappedMain = connect(mapStateToProps, putActionsToProps)(Main);

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Provider store={store}><WrappedMain /></Provider>, document.getElementById('example'));
}
