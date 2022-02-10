import { usersService } from "../../services/user.service";
import { ActionTypes } from "./index";

export const allUsers = () => (dispatch) => {
    return usersService.allUsers()
        .then((users) => {
            dispatch({ type: ActionTypes.ALL_USERS_COMPLETED, payload: users });
            return users;
        })
        .catch((err) => console.log(err));
}
