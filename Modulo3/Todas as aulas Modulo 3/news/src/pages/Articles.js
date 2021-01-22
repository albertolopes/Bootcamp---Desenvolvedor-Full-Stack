import React, { Component } from 'react';
import Body from '../components/Body';

export default class Articles extends Component {
    constructor(){
        super();

        this.state = {
            news: []
        };
    }

    async componentDidMount(){
        const res = await fetch('https://www.vagalume.com.br/news/index.js');

        const json = await res.json();

        this.setState({
            news: json,
        });
    }

    render() {
        const{news} = this.state;
        console.log(news)
        return (      
            <div className="container">                
                <Body />
            </div>      
        );
  }
}