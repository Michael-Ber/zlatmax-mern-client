import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
// import './index.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import App from './components/app/App';

import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

