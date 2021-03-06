 import axios from "axios";

export const signup = (body) => {
    return axios.post('/api/1.0/users', body);
}

export const login = creds => {
    return axios.post('/api/1.0/authentication', {}, { auth: creds });
}

export const changeLanguage = language => {
    axios.defaults.headers['Accept-Language'] = language;
}