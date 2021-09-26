import React from 'react';
import { signup } from '../api/apicalls';
import Input from '../component/Input';


class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    };

    onChange = event => {
        //   const value = event.target.value;
        //    const name = event.target.name;

        const { name, value } = event.target;
        const errors = { ...this.state.errors } // errors objesinin kopyasını oluşturdum
        errors[name] = undefined;
        if (name === 'passwordRepeat' || name === 'password') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = 'Password mismatch';
            }   else if(name ==='passwordRepeat'&& value !==this.state.password){
                errors.passwordRepeat = 'Password mismatch';
            }else{
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
        this.setState({ pendingApiCall: true });


        try {
            const response = await signup(body);
        } catch (error) {
            if (error.response.data.validateErrors) {
                this.setState({ errors: error.response.data.validateErrors })
            }
        }
        this.setState({ pendingApiCall: false });


        // signup(body)
        //     .then(response => {
        //         this.setState({ pendingApiCall: false });
        //     })
        //     .catch(error => {
        //         this.setState({ pendingApiCall: false });
        //     })
    };


    render() {
        const { pendingApiCall, errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input name="username" label="Username" error={username} onChange={this.onChange} />
                    <Input name="displayName" label="Display Name" error={displayName} onChange={this.onChange} />
                    <Input name="password" label="password" error={password} onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label="Password Repeat" error={passwordRepeat} onChange={this.onChange} type="password" />

                    <div className="text-center">
                        <button className="btn btn-primary" disabled={pendingApiCall || passwordRepeat !==undefined} onClick={this.onClickSignUp}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UserSignupPage;