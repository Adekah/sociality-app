import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap-override.scss';
//import UserSignupPage from './pages/UserSignupPage';
import LoginPage from './pages/LoginPage';
import reportWebVitals from './reportWebVitals';
import './i18n';
import LanguageSelector from './component/LanguageSelector';

ReactDOM.render(
  <div>
    <LoginPage />
    <LanguageSelector />
  </div>,
  document.getElementById('root')
);
reportWebVitals();
