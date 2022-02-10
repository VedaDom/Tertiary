import { ActionTypes } from "../actions/index"

const initialState = {
    users: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ALL_USERS_COMPLETED:
            return { ...state, users: action.payload }
        default:
            return { ...initialState }
    }
}

export default reducer;