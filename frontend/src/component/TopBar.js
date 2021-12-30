import React, { Component } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';

class TopBar extends Component {
    state = {
        isloggedIn: true,
        username: 'Adekah'
    }

    render() {

        const { t } = this.props;
        const { isloggedIn, username } = this.state;

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
                    <li className='nav-link'>{t('Logout')}</li>
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

export default withTranslation()(TopBar);