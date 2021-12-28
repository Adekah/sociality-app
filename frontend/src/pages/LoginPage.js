import React from "react";
import Input from "../component/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apicalls";
import ButtonWithProgres from "../component/ButtonWithProgres";
import { withApiProgress } from "../shared/ApiProgress";

class LoginPage extends React.Component {

    state = {
        username: null,
        password: null,
        error: null
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: null })

    }

    onClickLogin = async event => {
        event.preventDefault(); 
        const { username, password } = this.state;
        const creds = { username, password };
        this.setState({ error: null })
        try {
            await login(creds)
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            })
        }

    }


    render() {
        const { t,pendingApiCall } = this.props;
        const { username, password, error } = this.state;
        const buttonEnabled = username && password;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Login')}</h1>
                    <Input name="username" label={t('Username')} onChange={this.onChange} />
                    <Input name="password" label={t('Password')} onChange={this.onChange} type="password" />
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="text-center ">
                        <ButtonWithProgres
                            onClick={this.onClickLogin}
                            disabled={!buttonEnabled || pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text={t('Login')} />
                    </div>
                </form>
            </div>
        );


    };
}
const LoginPageWithTranslation = withTranslation()(LoginPage);

export default withApiProgress(LoginPageWithTranslation, '/api/1.0/authentication')

