import React, { Component } from 'react';
import './login.css';
import { connect } from "react-redux";
import AuthService from '../../services/authService'
import {setAuthentication, handleError} from '../../actions/index'
import { withRouter } from "react-router-dom";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.signOut = this.signOut.bind(this);
  }

  signOut(e) {
    e.preventDefault();
      const svc =  new AuthService();
      svc.signOut();
      this.props.dispatch(setAuthentication(null));
      this.props.history.replace('/login');
  }

  render() {
    return (
      <div style={{display: 'table-row'}}> 
        <div style={{display: 'table-cell', padding: '3px'}}> 
          <form onSubmit={this.signOut}>
            <button type="submit">
              Logout 
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter( connect()(Logout))
