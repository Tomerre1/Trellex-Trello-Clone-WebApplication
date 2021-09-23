import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/styles/main.scss';
import {store} from './store/store'
import {RootCmp} from './root-cmp';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <Router>
          <RootCmp />
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
