import fetch from 'cross-fetch';

function appService(
    requestEndpoint, token, 
    preAction, postAction, 
    errCallback, pload) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    var domain = 'https://localhost:5001/';
    var origin = 'http://localhost:3000/';

    return function (dispatch) {
      
      //To enable cross origin calls
      // let headers = new Headers({
      //  'Access-Control-Allow-Origin': origin,
      //  'Content-Type': 'application/json'
      // });
      const dispatchError = (errObj) => {
        
        console.log('An error occurred.', errObj);
            dispatch( errCallback(errObj) );
      }

      const headers = {
         'Access-Control-Allow-Origin': origin,
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      };

      if(token)
         headers['Authorization'] = 'Bearer ' + token;

      // First dispatch: the app state is updated to inform
      // that the API call is starting.
      if(preAction)
        dispatch ( preAction(/*subreddit*/) )
      // The function called by the thunk middleware can return a value,
      // that is passed on as the return value of the dispatch method.
      // In this case, we return a promise to wait for.
      // This is not required by thunk middleware, but it is convenient for us.

      //const p = p !== null  ? { headers, ...p}: headers;
      
      return fetch(domain + requestEndpoint, pload !== null  ? { headers, ...pload}: headers)
        .then( response => {

              // Do not use catch, because that will also catch
              // any errors in the dispatch and resulting render,
              // causing a loop of 'Unexpected batch number' errors.
              // https://github.com/facebook/react/issues/6895
              if (!(response.status >= 200 && response.status < 300)) { 
                // Success status lies between 200 to 300
                var error = new Error(response.statusText)
                error.response = response
                dispatchError(error);
              }else{
                if(response.status !== 204)/*NO CONTENT RETURN */
                  return response.json();
              }
          },error => {dispatchError(error);})
          .then(response => {
            if(postAction){
                dispatch(postAction( response))
                return Promise.resolve(response);
            }
          });
    }
  }
  export default appService;