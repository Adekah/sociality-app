import React from 'react';
import { withTranslation } from 'react-i18next';
import { signup } from '../api/apicalls';
import Input from '../component/Input';
import ButtonWithProgres from '../component/ButtonWithProgres';
import { withApiProgress } from '../shared/ApiProgress';


class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    };

    onChange = event => {
        //   const value = event.target.value;
        //    const name = event.target.name;

        const { name, value } = event.target;
        const errors = { ...this.state.errors } // errors objesinin kopyasını oluşturdum
        const { t } = this.props;
        errors[name] = undefined;
        if (name === 'passwordRepeat' || name === 'password') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password mismatch');
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.passwordRepeat = t('Password mismatch');
            } else {
                errors.passwordRepeat = undefined;
            }
        }
        this.setState({
            [name]: value,
            errors
        })
    }

    onClickSignUp = async event => {
        event.preventDefault();

        const { username, displayName, password } = this.state

        const body = {
            username,
            displayName,
            password
        };
     
        try {
            const response = await signup(body);
        } catch (error) {
            if (error.response.data.validateErrors) {
                this.setState({ errors: error.response.data.validateErrors })
            }
        }

        // signup(body)
        //     .then(response => {
        //         this.setState({ pendingApiCall: false });
        //     })
        //     .catch(error => {
        //         this.setState({ pendingApiCall: false });
        //     })
    };



    render() {
        const { errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        const { t ,pendingApiCall} = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input name="username" label={t('Username')} error={username} onChange={this.onChange} />
                    <Input name="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange} />
                    <Input name="password" label={t('Password')} error={password} onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} onChange={this.onChange} type="password" />

                    <div className="text-center">
                        <ButtonWithProgres
                            onClick={this.onClickSignUp}
                            disabled={passwordRepeat !== undefined || pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text={t('Sign Up')} />
                    </div>
                </form> 
            </div>
        )
    }
}

const UserSignUpPageWithApiProgress = withApiProgress(UserSignupPage, '/api/1.0/users');

const UserSignUpPageWithTranslation = withTranslation()(UserSignUpPageWithApiProgress);


export default UserSignUpPageWithTranslation;