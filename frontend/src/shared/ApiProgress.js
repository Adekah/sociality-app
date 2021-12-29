import React, { Component } from 'react';
import axios from "axios";


function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withApiProgress(WrappedComponent, apiPath) {
    return class extends Component {

        // static displayName = 'ApiProgress(' + getDisplayName(WrappedComponent)+')';  or
        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;

        state = {
            pendingApiCall: false
        };

        componentDidMount() {

            axios.interceptors.request.use(request => {
                this.requestInterCeptor = axios.interceptors.request.use;
                this.updateApiCallFor(request.url, true);
                return request;
            });
            axios.interceptors.response.use(response => {
                this.responseInterCeptor = axios.interceptors.response.use;
                this.updateApiCallFor(response.config.url, false);
                return response;
            }, error => {
                this.updateApiCallFor(error.config.url, false);
                throw error;
            });

        };

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterCeptor);
            axios.interceptors.response.eject(this.responseInterCeptor);
        }

        updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
                this.setState({ pendingApiCall: inProgress })
            }
        };
        render() {
            const { pendingApiCall } = this.state;
            return <WrappedComponent pendingApiCall={pendingApiCall}{...this.props} />
            //{...this.props} -->  objedeki bütün key value'ları yolluyor.
        }
    }

}

