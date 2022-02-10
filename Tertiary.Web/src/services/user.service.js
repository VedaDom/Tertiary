import { handleResponse } from "../helpers/handle-response";
import { authService } from "./auth.service";

const baseUrl = 'http://localhost:5128'

export const usersService = {
    allUsers,
}

function allUsers() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authService.userValue.token}`
        },
    };
    return fetch(`${baseUrl}/api/Users`, requestOptions).then(handleResponse);
}
