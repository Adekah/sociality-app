const defaultState = {
    isloggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
};

const authReducer = (state, action) => {
    if (action.type === 'logout-success') {
        return defaultState;
    }
    return state;
}; //State ve action'u alıp güncel state'i dönüyor.


export  default authReducer;