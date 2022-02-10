import { BehaviorSubject } from 'rxjs'
import { handleResponse } from '../helpers/handle-response'

const baseUrl = 'http://localhost:5128'
const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')))

export const authService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    signup,
    signin,
    signout,
}

function signup(firstname, lastname, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password })
    };

    return fetch(`${baseUrl}/api/Auth/Signup`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            userSubject.next(user);
            return user;
        });
}

function signin(email, password) {
    const requestOptions = {
        crossDomain: true,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${baseUrl}/api/Auth/Signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            userSubject.next(user);
            return user;
        });
}

function signout() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${baseUrl}/api/Auth/Logout`, requestOptions)
        .then((res) => {
            localStorage.removeItem('user');
            userSubject.next(null);
        });
}
