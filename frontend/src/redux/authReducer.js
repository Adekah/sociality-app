import * as ACTIONS from './Constants';

const defaultState = {
    isloggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
};

const authReducer = (state, action) => {
    if (action.type === ACTIONS.LOGOUT_SUCCESS) {
        return defaultState;
    } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
        return {
            ...action.payload,
            isloggedIn: true
        };
    }
    return state;
}; //State ve action'u alıp güncel state'i dönüyor.


export default authReducer;