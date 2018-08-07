import { AuthenticationFlags} from '../actions'

const isAuthorized = (state = AuthenticationFlags.NOT_AUTHENTICATED, action) => {
  switch (action.type) {
    case 'SET_AUTHENTICATON':
      return action.flag
    default:
      return state
  }
}

export default isAuthorized
