import React, { Component } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
class TopBar extends Component {
    state = {
        isloggedIn: true,
        username: 'Adekah'
    }

    render() {

        const { t, username, isloggedIn, onLogoutSuccess } = this.props;
        let links = (
            <ul className="navbar-nav ms-auto">
                <li>
                    <Link className="nav-link" to="/login">
                        {t('Login')}
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/signup">
                        {t('Sign Up')}
                    </Link>
                </li>
            </ul>
        );
        if (isloggedIn) {
            links = (
                <ul className="navbar-nav ms-auto">
                    <li>
                        <Link className="nav-link" to={`/user/${username}`}>
                            {username}
                        </Link>
                    </li>
                    <li className='nav-link' onClick={onLogoutSuccess}>{t('Logout')}</li>
                </ul>
            );
        }


        return (
            <div className='shadow-sm bg-light mb-2'>
                <nav className='navbar navbar-light container navbar-expand'>
                    <Link className='navbar-brand' to="/">
                        <img src={logo} width="60" alt="Sociality Logo" />Sociality
                    </Link>
                    {links}
                </nav>

            </div>
        );
    }
}

const TopBarWithTranslation = withTranslation()(TopBar);

const mapStateToProps = store => {
    return {
        isloggedIn: store.isloggedIn,
        username: store.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
    onLogoutSuccess: () => dispatch(logoutSuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBarWithTranslation);