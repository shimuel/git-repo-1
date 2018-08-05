import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import * as actions from "../actions";

const WithAuth = securedComponent => {
  class featureDecorated extends React.Component {

    componentWillMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.replace('/login')
        }
        // else {
        //     try {
        //         const profile = Auth.getProfile()
        //         this.setState({
        //             user: profile
        //         })
        //     }
        //     catch(err){
        //         //Auth.logout()
        //         this.props.history.replace('/login')
        //     }
        // }
    }

    render() {
        const { isAuthenticated, /*authActions,*/ ...rest } = this.props;
        if (isAuthenticated) {
            return (
                //     <feature auth={{ state: authState, actions: authActions }}
                //     {...rest}
                //   />
                <securedComponent/>
            )
        }
        else {
           return  null
        }
    }
  }

  return connect(
    state => {
        return  {isAuthenticated: state.root.isAuthenticated}
    },
    dispatch => {
        //return  {authActions: bindActionCreators(actions, dispatch)}
        return {}
    }
  )(featureDecorated);
};

export default WithAuth;