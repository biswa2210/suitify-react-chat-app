import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components';
import { BrowserRouter as Router } from 'react-router-dom';
/*
CREATED BY BISWARUP BHATTACHARJEE
EMAIL    : bbiswa471@gmail.com
PHONE NO : 6290272740
*/
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
