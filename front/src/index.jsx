import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, compose } from 'redux';
import { Provider } from  'react-redux';
import './index.css';
import App from './App';

import authReducer from './reducers/authReducer';
import flashReducer from './reducers/flashReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  flash: flashReducer,
});
const store = createStore(
  rootReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);  
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root'),
);
