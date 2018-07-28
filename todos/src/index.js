
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'
import {serverFetchTodos} from './actions'


const loggerMiddleware = createLogger()

const store = createStore(rootReducer,applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
));

store
  .dispatch(serverFetchTodos())
  .then(() => console.log(store.getState()))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
