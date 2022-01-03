import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap-override.scss';
//import UserSignupPage from './pages/UserSignupPage';
//import LoginPage from './pages/LoginPage';
import reportWebVitals from './reportWebVitals';
import './i18n';
//import LanguageSelector from './component/LanguageSelector';
//import ApiProgress from './shared/ApiProgress.js';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './redux/configureStore';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
