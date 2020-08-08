import { combineReducers } from 'redux'
import todos from './todos'
import questionReducer from './questionReducer'
// import visibilityFilter from './visibilityFilter'

// export default combineReducers({
//     todos,
//     questionReducer
//     // visibilityFilter
// })
const initialState = {
    default_language_id: 1,
    default_language_name: 'English',
};


export default (state = initialState, action) => {
    console.log('action.type',action.type); //todo r
    switch (action.type) {

        case 'SET_DEFAULT_LANGUAGE':
            let newState = {
                ...state,
                default_language_id: action.default_language_id,
                default_language_name: action.default_language_name,
                firstName: 'bbbbbbbbbbbbb'
            };
            console.log('newState',newState); //todo r
            return newState
        default:
            return state
    }
}

