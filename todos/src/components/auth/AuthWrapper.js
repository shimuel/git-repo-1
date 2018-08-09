import React from "react";
import { connect } from "react-redux";
import {todoAPI} from '../../services/todosService'

const AuthGuard = AuthComponent => {
  class authCheckDecorator extends React.Component {

    componentWillMount() {
        if (!this.props.isAuthorized) {
            this.props.history.replace('/login')
        }
    }

    componentDidMount() {
        if (this.props.isAuthorized) {
            todoAPI.getAll()(this.props.dispatch)
        }
    }

    render() {
        const { isAuthorized, /*authActions,*/ ...rest } = this.props;
        if (isAuthorized) {
            return (
                //     <feature auth={{ state: authState, actions: authActions }}
                //     {...rest}
                //   />
                <AuthComponent {...rest}/>
            )
        }
        else {
           return  null
        }
    }
  }

  return connect(
    (state) => {
        return {
          isAuthorized:state.isAuthorized
        }
      }, function (dispatch, props) {
        return {
          dispatch
        }
      }
  )(authCheckDecorator);
};

export default AuthGuard;


// return connect(
//     (state) => {
//         return {
//           isAuthorized:state.isAuthorized
//         }
//       }, function (dispatch, props) {
//         return {
//           dispatch,
//           ...bindActionCreators({
//           ...actions
//         }, dispatch)
//         }
//       })