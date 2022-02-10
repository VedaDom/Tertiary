import { authService } from "../../services/auth.service"
import { ActionTypes } from "../actions/index"

const initialState = {
  user: authService.userValue,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGNING_COMPLETED:
      return { ...state, user: action.payload }
    default:
      return { ...initialState }
  }
}

export default reducer
