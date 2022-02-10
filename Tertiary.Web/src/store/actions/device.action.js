import { deviceService } from "../../services/device.service";
import { ActionTypes } from "../actions/index";


export const newDevice = (data) => (dispatch) => {
    return deviceService.newDevice(data)
        .then((device) => {
            dispatch({ type: ActionTypes.SAVING_DEVICE_COMPLETED, payload: device });
            return device;
        })
        .catch((err) => console.log(err));
}

export const allDevices = () => (dispatch) => {
    return deviceService.allDevices()
        .then((devices) => {
            dispatch({ type: ActionTypes.ALL_DEVICE_COMPLETED, payload: devices });
            return devices;
        })
        .catch((err) => console.log(err));
}

export const getUserDevice = () => (dispatch) => {
    return deviceService.getUserDevice()
        .then((request) => {
            dispatch({ type: ActionTypes.USER_DEVICE_COMPLETED, payload: request.device });
            return request.device;
        })
        .catch((err) => console.log(err));
}

export const requestDevice = (deviceId) => (dispatch) => {
    return deviceService.requestDevice(deviceId)
        .then((device) => {
            dispatch({ type: ActionTypes.USER_DEVICE_COMPLETED, payload: device });
            return device;
        })
        .catch((err) => console.log(err));
}

export const deviceRequests = () => (dispatch) => {
    return deviceService.deviceRequests()
        .then((requests) => {
            dispatch({ type: ActionTypes.DEVICE_REQUESTS_COMPLETED, payload: requests });
            return requests;
        })
        .catch((err) => console.log(err));
}