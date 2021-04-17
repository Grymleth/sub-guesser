import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
} from './types';

// check token & load user

export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING });
    axios.get('/api/user')
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })
}

// logout user
export const logout = () => (dispatch, getState) => {
    axios.get("api/user/logout", tokenConfig(getState))
        .then(res => dispatch({
            type: LOGOUT_SUCCESS
        }));
};

// setup config/headers and token
export const tokenConfig = getState => {
    // get token from localStorage
    const token = getState().auth.token;

    // headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    
    // if token add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }
    
    return config;
}