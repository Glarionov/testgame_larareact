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
import '../../sass/main.css'

import { createStore, bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux'
import rootReducer from '../store/reducers'


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

const store = createStore(rootReducer2)

// store.dispath()


class Main extends React.Component {


    created() {

        let ss = store.getState();





        console.log('ss',ss); //todo r
        console.log('555555555555')
    }

    componentDidMount() {
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

        console.log('666666666666')
        console.log('this.props',this.props); //todo r
        console.log('this.props.firstName',this.props.firstName); //todo r

        console.log('this.props.firstName',this.props.firstName); //todo r

        /* fetch API in action */
        // let data = {e: 'f'};
        // let url = '/api/get-question-group/1';
        // console.log('url',url); //todo r
        // fetch(url,{method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //
        //     body: JSON.stringify(data) })
        //
        //     .then(response => {
        //         console.log('response',response); //todo r
        //         return response.json();
        //     })
        //     .then(products => {
        //         console.log('products',products); //todo r
        //         //Fetched product is stored in the state
        //         // this.setState({ products });
        //     });
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
                </div>


                <Switch>
                    <Route path="/questions" component={Questions}/>
                    {/*<Route path="/game1/1" component={Game1} />*/}
                    <Route path="/game1/:id" component={Game1}/>
                    <Route path="/question-sets" component={QuestionSets}/>
                    <Route component={NotFound}/>
                </Switch>
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
    console.log('state',state); //todo r
    return {
        firstName: state.firstName
    }
}

const putActionsToProps = (dispatch) => {
    return {
        changeFirstName: bindActionCreators(setEngLanguageActionCreator, dispatch),
        changeSecondName: bindActionCreators(setEngLanguageActionCreator, dispatch),
    }
}

const WrappedMain = connect(mapStateToProps, putActionsToProps)(Main);

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Provider store={store}><WrappedMain /></Provider>, document.getElementById('example'));
}
