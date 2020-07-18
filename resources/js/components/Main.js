import React, { Component } from 'react';
// import Questions from './Questions'
import ReactDOM from 'react-dom';
import Questions from './Questions'
import Game1 from './Game1'
import '../../sass/main.css'


class Main extends React.Component {


    created() {
        console.log('555555555555')
    }

    componentDidMount() {
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


    render() {
        return (<div className="main">
            {/*<Questions />*/}
            <Game1 />
        </div>);
    }
}


export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main />, document.getElementById('example'));
}
