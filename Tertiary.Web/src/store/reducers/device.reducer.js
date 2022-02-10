import { ActionTypes } from "../actions/index"

const initialState = {
    devices: [],
    myDevices: [],
    requests: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SAVING_DEVICE_COMPLETED:
            return { ...state, devices: [...state.devices, action.payload] }
        case ActionTypes.ALL_DEVICE_COMPLETED:
            return { ...state, devices: action.payload }
        case ActionTypes.USER_DEVICE_COMPLETED:
            return { ...state, myDevices: [action.payload] }
        case ActionTypes.DEVICE_REQUESTS_COMPLETED:
            return { ...state, requests: action.payload }
        default:
            return { ...initialState }
    }
}

export default reducer;