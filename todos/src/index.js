
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter} from  'react-router-dom'
import App from './components/App'
import rootReducer from './reducers'
import {todoAPI} from './services/todosService'


const loggerMiddleware = createLogger()

const store = createStore(rootReducer,applyMiddleware(
  thunkMiddleware, // lets use of dispatch() functions
  loggerMiddleware // neat middleware that logs actions
));

// store
//   .dispatch(todoAPI.getAll())
//   .then(() => console.log(store.getState()))

render(
  <Provider store={store}>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
