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
        errors[name] = undefined
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
        const { username , displayName } = errors;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input name="username" label="Username" error={username} onChange={this.onChange}/>
                    <Input name="displayName" label="Display Name" error={displayName} onChange={this.onChange}/>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" name="password" type="password" onChange={this.onChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Password Repeat</label>
                        <input className="form-control" name="passwordRepeat" type="password" onChange={this.onChange}></input>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" disabled={pendingApiCall} onClick={this.onClickSignUp}>
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