import { createStore } from 'redux';
import authReducer from './authReducer';

const loggedInState = {
    isloggedIn: true,
    username: "Adekah",
    displayName: "display1",
    image: null,
    password: 'P4ssword'
};

const configureStore = () => {
    return createStore(authReducer, loggedInState);
}

export default configureStore;