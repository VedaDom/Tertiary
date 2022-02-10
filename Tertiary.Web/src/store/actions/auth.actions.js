import { ActionTypes } from "../actions/index"
import { authService } from "../../services/auth.service"

export const signin = (email, password) => (dispatch) => {
  return authService.signin(email, password)
  .then((data) => {
    dispatch({ type: ActionTypes.SIGNING_COMPLETED, payload: data });
    return data;
  })
  .catch((err) => console.log(err));
}

export const signup = (firstname, lastname, email, password) => (dispatch) => {
  return authService.signup(firstname, lastname, email, password)
  .then((data) => {
    dispatch({ type: ActionTypes.SIGNING_COMPLETED, payload: data });
    return data;
  })
  .catch((err) => console.log(err));
}

export const signout = () => (dispatch) => {
  return authService.signout()
  .then(() => {
    dispatch({ type: ActionTypes.SIGNING_COMPLETED, payload: null });
  })
  .catch((err) => console.log(err));
}