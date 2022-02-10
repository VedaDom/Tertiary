import { combineReducers } from "redux"
import authReducer from "./auth.reducer"
import deviceReducer from "./device.reducer"
import userReducer from "./user.reducer"

export default combineReducers({
  auth: authReducer,
  devices: deviceReducer,
  users: userReducer
})
