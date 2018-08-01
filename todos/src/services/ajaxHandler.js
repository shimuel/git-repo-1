import fetch from 'cross-fetch';
import {fetchTodos, receivedTodos, handleError} from '../actions/index'

function appService(endpoint) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
  
    return function (dispatch) {
      
      //To enable cross origin calls
      let headers = new Headers({
        origin:'http://localhost:3000/'
      });
      // First dispatch: the app state is updated to inform
      // that the API call is starting.
      dispatch(fetchTodos(/*subreddit*/))
      // The function called by the thunk middleware can return a value,
      // that is passed on as the return value of the dispatch method.
      // In this case, we return a promise to wait for.
      // This is not required by thunk middleware, but it is convenient for us.
      return fetch(`https://localhost:5001/`+ endpoint,headers)
        .then(
          response => {
            switch(response.status)
            {
              case 200:
                return {status:response.status, data: response.json()};
              case 401:
                return {status:response.status, data:response.statusText};
              default:
            }
             //response.json(),
          // Do not use catch, because that will also catch
          // any errors in the dispatch and resulting render,
          // causing a loop of 'Unexpected batch number' errors.
          // https://github.com/facebook/react/issues/6895
          },
          error => {
            console.log('An error occurred.', error);
            //this.props.history.replace('/');
          })
        .then(json => {
          // We can dispatch many times!
          // Here, we update the app state with the results of the API call.
          const status = parseInt(json.status)
          if(status !== 401)
            dispatch(receivedTodos(/*subreddit,*/ json))
          else{
            let todos = [];
            todos.push({"id":1,"text":"asd","priority":"high","comments":"asd","completed":false,"inEdit":false});
            todos.push({"id":2,"text":"bcd","priority":"low","comments":"asd","completed":false,"inEdit":false});
            todos.push({"id":3,"text":"dec","priority":"med","comments":"asd","completed":false,"inEdit":false});
            dispatch(receivedTodos(/*subreddit,*/ todos))
            //{"id":1,"text":"asd","priority":"high","comments":"asd","completed":false,"inEdit":false}
            //dispatch(handleError(json.status))
          }            
        })
    }
  }
  export default appService;