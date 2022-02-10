import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import withParamsAndNavigate from '../helpers/with_params_navigate';

class RequestPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    render() {
        const { id } = this.props.params;

        var request = this.props.requests.find(item => item.id == id);

        return (
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle bg-blue-600">
                    <div className="p-4 grid align-middle grid-flow-col auto-cols-min place-content-between">
                        <label className="place-self-center py-[11px] font-bold text-white text-xl">Request</label>
                    </div>
                    <div className="bg-white p-8">
                        <form className="grid grid-cols-2">
                            <div className="pr-4 border-r-[1px] border-r-gray-300">
                                <div className="mb-6">
                                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                                    <input
                                        id="firstname"
                                        name="firstname"
                                        type="text"
                                        autoComplete="text"
                                        disabled
                                        value={request.user.firstname}
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        autoComplete="text"
                                        disabled
                                        value={request.user.lastname}
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Last name"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        autoComplete="text"
                                        disabled
                                        value={request.user.email}
                                        required
                                        className="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Email"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lavel</label>
                                    <input
                                        id="level"
                                        name="lavel"
                                        type="text"
                                        autoComplete="text"
                                        disabled
                                        required
                                        className="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Lavel"
                                    />
                                </div>
                            </div>
                            <div className="pl-4">
                                <div className="mb-6">
                                    <label htmlFor="device-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Device name</label>
                                    <input
                                        id="device-name"
                                        name="devicename"
                                        type="text"
                                        autoComplete="text"
                                        disabled
                                        value={request.device.name}
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Device name"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="device-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Device type</label>
                                    <input
                                        id="device-type"
                                        name="devicetype"
                                        type="text"
                                        autoComplete="text"
                                        disabled
                                        value={request.device.type}
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Device type"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Brand</label>
                                    <input
                                        id="brand"
                                        name="brand"
                                        type="text"
                                        autoComplete="text"
                                        disabled
                                        value={request.device.brand}
                                        required
                                        className="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Brand"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="datetime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date time</label>
                                    <input
                                        id="datetime"
                                        name="datetime"
                                        type="text"
                                        autoComplete="text"
                                        disabled
                                        value={moment(request.device.requestedAt).format("MMM Do YYYY, h:mm:ss A")}
                                        required
                                        className="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Date time"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        requests: state.devices.requests,
    };
}

export default connect(mapStateToProps)(withParamsAndNavigate(RequestPage));