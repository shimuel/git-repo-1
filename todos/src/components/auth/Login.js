import React, { Component } from 'react';
import './login.css';
import { connect } from "react-redux";
import AuthService from '../../services/authService'
import {setAuthentication, handleError} from '../../actions/index'
class Login extends Component {
    constructor(){
        
        super();

        this.usr = null;
        this.pwd = null;

        this.click = this.handleClick.bind(this);
       
    }
    componentWillMount() {
        if (this.props.isAuthorized) {
            this.props.history.replace('/')
        }
    }
    render() {
        return (
            <div className="center">
                <div className="card">
                    {/* <h1>Login</h1> */}
                    <form>
                        <input ref={node => this.usr = node}
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                        />
                        <input ref={node => this.pwd = node}
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                        />
                        <input
                            className="form-submit"
                            value="Sign in"
                            type="button"
                            onClick={this.click}
                        />
                    </form>
                </div>
            </div>
        );
    }

    handleClick(e){
        e.preventDefault();
        const svc =  new AuthService();
        svc.signIn(this.usr.value, this.pwd.value, this.props.dispatch).then(res => {
            this.props.dispatch(setAuthentication(res));
            this.props.history.replace('/');
        });
    }
}

function mapStateToProps(state) {
    return { authenticated: state.isAuthorized};
  }
export default connect(mapStateToProps)(Login)