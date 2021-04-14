import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

import {
    GET_POSTS,
    POSTS_LOADING
} from './types';

export const getPosts = () => (dispatch, getState) => {
    dispatch(setPostsLoading());

    axios
        .get('/api/post', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload:res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    };
}