import React, { Component } from 'react';
import { connect } from 'react-redux'
//import { bindActionCreators } from "redux";
import AuthGuard from './auth/AuthWrapper'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Logout from './auth/Logout'
import {resetTodos}  from "../actions";

class Home extends Component {
    constructor(props){
        super(props);
    }

      
    componentDidMount() {
        this.props.dispatch(this.props.resetTodos())
      }

    render() {
        return (
          <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
            <Logout/>
          </div>
        )
    }
}

export default connect(
state => {
    return  {}
},
dispatch => {
    return {
        dispatch,
        resetTodos
      }
})(AuthGuard(Home))
//export default AuthGuard(Home);