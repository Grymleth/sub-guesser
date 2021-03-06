import { 
    GET_POSTS,
    POSTS_LOADING
} from '../actions/types';

const initialState = {
    posts: [],
    loading: false
};

export default function postReducer(state = initialState, action){
    switch(action.type){
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return {
                ...state
            };
    }
};