import React, { Component } from 'react';
import WithAuth from './auth/AuthWrapper'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
//import './Login.css';

class Home extends Component {
    constructor(){
        super();
        this.login = this.login.bind(this);
    }
    render() {
        return (
          <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
          </div>
        )
    }

    login(e){
        // this.setState(
        //     {
        //         [e.target.name]: e.target.value
        //     }
        // )
    }
}
export default WithAuth(Home);