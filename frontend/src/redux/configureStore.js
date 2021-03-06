import { createStore } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';

const securels = new SecureLS();
const getStateFromStorage = () => {
    const hoaxAuth = securels.get('hoax-auth');

    let stateInLocalStorage = {
        isloggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    if (hoaxAuth) { return hoaxAuth }
    return stateInLocalStorage;
};

const updateStateInStorage = newState => {
    securels.set('hoax-auth', newState);
}


const configureStore = () => {
    const store = createStore(authReducer, getStateFromStorage(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    store.subscribe(() => {

        updateStateInStorage(store.getState());
    })
    return store;
};

export default configureStore;