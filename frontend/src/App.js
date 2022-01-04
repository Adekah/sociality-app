import React from 'react';
import UserPage from './pages/UserPage';
import LanguageSelector from './component/LanguageSelector';
import UserSignupPage from './pages/UserSignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import TopBar from './component/TopBar';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    const {isloggedIn} = this.props;
    return (
      <div>
        <HashRouter>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isloggedIn && <Route path="/login" component={LoginPage} />}
            <Route path="/signup" component={UserSignupPage} />
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
        <LanguageSelector />
      </div>
    );
  }

}


const mapStateToProps = store => {
  return {
    isloggedIn: store.isloggedIn,
  };
};

export default connect(mapStateToProps)(App);
