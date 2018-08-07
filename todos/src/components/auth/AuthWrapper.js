import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import * as actions from "../actions";

const AuthGuard = AuthComponent => {
  class authCheckDecorator extends React.Component {

    componentWillMount() {
        if (!this.props.isAuthorized) {
            this.props.history.replace('/login')
        }
    }

    render() {
        const { isAuthorized, /*authActions,*/ ...rest } = this.props;
        if (isAuthorized) {
            return (
                //     <feature auth={{ state: authState, actions: authActions }}
                //     {...rest}
                //   />
                <AuthComponent/>
            )
        }
        else {
           return  null
        }
    }
  }

  return connect(
    state => {
        return  {isAuthorized: state.isAuthorized}
    },
    dispatch => {
        //return  {authActions: bindActionCreators(actions, dispatch)}
        return {}
    }
  )(authCheckDecorator);
};

export default AuthGuard;