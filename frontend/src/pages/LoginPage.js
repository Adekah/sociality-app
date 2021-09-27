import React from "react";
import Input from "../component/Input";


class LoginPage extends React.Component {

    state = {
        username: null,
        password: null
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }


    render() {


        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Login</h1>
                    <Input name="username" label="Username" onChange={this.onChange} />
                    <Input name="password" label="Password" onChange={this.onChange} />
                    <div className="text-container">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        );


    };
}


export default LoginPage;

