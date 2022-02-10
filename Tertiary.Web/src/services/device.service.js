import { handleResponse } from "../helpers/handle-response";
import { authService } from "./auth.service";

const baseUrl = 'http://localhost:5128'

export const deviceService = {
    newDevice,
    allDevices,
    getUserDevice,
    requestDevice,
    deviceRequests
}

function newDevice(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authService.userValue.token}`
        },
        body: JSON.stringify(data)
    };
    return fetch(`${baseUrl}/api/Device`, requestOptions).then(handleResponse);
}

function allDevices() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authService.userValue.token}`
        },
    };
    return fetch(`${baseUrl}/api/Device`, requestOptions).then(handleResponse);
}

function getUserDevice() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authService.userValue.token}`
        },
    };
    return fetch(`${baseUrl}/api/Device/Request?UserId=${authService.userValue.id}`, requestOptions).then(handleResponse);
}


function requestDevice(deviceId) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authService.userValue.token}`
        },
        body: JSON.stringify({
            userId: authService.userValue.id,
            deviceId
        })
    };
    return fetch(`${baseUrl}/api/Device/Request`, requestOptions).then(handleResponse);
}

function deviceRequests() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authService.userValue.token}`
        },
    };
    return fetch(`${baseUrl}/api/Device/Requests`, requestOptions).then(handleResponse);
}