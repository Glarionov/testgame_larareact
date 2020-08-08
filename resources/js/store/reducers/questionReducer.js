const initialState = {
    default_language_id: 1,
    default_language_name: 'English',
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DEFAULT_LANGUAGE':
            return {
                ...state,
            default_language_id: action.default_language_id,
                default_language_name: action.default_language_name,
                firstName: 'bbbbbbbbbbbbb'
    }
        default:
            return state
    }
}

export default questionReducer
