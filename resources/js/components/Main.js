import React, { Component } from 'react';
// import Questions from './Questions'
import ReactDOM from 'react-dom';
import Questions from './Questions'
import '../../sass/main.css'


class Main extends React.Component {


    created() {
        console.log('555555555555')
    }

    componentDidMount() {
        /* fetch API in action */
        let data = {e: 'f'};
        fetch('/api/get-question/1',{method: 'POST',body: JSON.stringify(data) })

            .then(response => {
                console.log('response',response); //todo r
                return response.json();
            })
            .then(products => {
                console.log('products',products); //todo r
                //Fetched product is stored in the state
                // this.setState({ products });
            });
    }


    render() {
        return (<div className="main">
            <Questions />
        </div>);
    }
}


export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main />, document.getElementById('example'));
}
