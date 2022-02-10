import React from 'react';
import { connect } from 'react-redux';
import { allDevices, getUserDevice, requestDevice } from '../store/actions/device.action';

class MyDevicePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            deviceId: null,
            showModel: false,
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(getUserDevice()).then((data) => {
            if (data == undefined) {
                return dispatch(allDevices());
            }
        });
    }

    handleOnRequest(e, deviceId) {
        e.preventDefault();

        this.setState({
            deviceId,
            loading: true,
        });

        const { dispatch } = this.props;
        dispatch(requestDevice(deviceId)).then((data) => {
            dispatch(getUserDevice());
        }).catch(() => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        return (
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle bg-blue-600">
                    <div className="p-4 grid align-middle grid-flow-col  place-content-between">
                        <label className="place-self-center py-[11px] font-bold text-white text-xl">My device</label>
                    </div>
                    <div className="bg-white p-8 grid grid-flow-row grid-cols-2">
                        {
                            this.props.myDevices.length < 1 ? this.props.devices.map(item => (<div key={item.id} className="py-6">
                                <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="w-1/3 bg-cover" style={{ backgroundImage: `url('${item.image}')` }}>
                                    </div>
                                    <div className="w-2/3 p-4">
                                        <h1 className="text-gray-900 font-bold text-2xl">{item.name}</h1>
                                        <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
                                        <div className="flex item-center justify-between mt-3">
                                            <h1 className={`${item.quantity > 0 ? "text-green-700" : "text-red-500"} font-bold text-sm place-self-center`}>{item.quantity > 0 ? `(${item.quantity}) Available` : "Not Available"}</h1>
                                            <button
                                                type="submit"
                                                onClick={(e) => {
                                                    this.handleOnRequest(e, item.id);
                                                }}
                                                disabled={item.quantity < 1}
                                                className="group w-40 relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                {this.state.loading && this.state.deviceId == item.id && (<svg className="absolute left-3 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>)}
                                                Request this
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>)) : this.props.myDevices && this.props.myDevices.map(device => {
                                console.log(device);
                                return (<div key={`device-${device.id}`} className="py-6">
                                <div className="flex h-[200px] max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="w-1/3 bg-cover" style={{ backgroundImage: `url('${device.image}')` }}>
                                    </div>
                                    <div className="w-2/3 p-4">
                                        <h1 className="text-gray-900 font-bold text-2xl">{device.name}</h1>
                                        <p className="mt-2 text-gray-600 text-sm">{device.description}</p>
                                    </div>
                                </div>
                            </div>);
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        devices: state.devices.devices,
        myDevices: state.devices.myDevices,
    };
}

export default connect(mapStateToProps)(MyDevicePage)