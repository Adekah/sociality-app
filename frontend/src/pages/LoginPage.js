import React from "react";
import Input from "../component/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apicalls";

class LoginPage extends React.Component {

    state = {
        username: null,
        password: null
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    onClickLogin= event =>{
        event.preventDefault();
        const {username,password}=this.state;
        const creds ={username,password}
        login(creds)
    }


    render() {
const {t}=this.props;

        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Login')}</h1>
                    <Input name="username" label={t('Username')} onChange={this.onChange} />
                    <Input name="password" label={t('Password')} onChange={this.onChange} />
                    <div className="text-center ">
                        <button className="btn btn-primary"onClick={this.onClickLogin} >{t('Login')}</button>
                    </div>
                </form>
            </div>
        );


    };
}


export default  withTranslation()(LoginPage);

