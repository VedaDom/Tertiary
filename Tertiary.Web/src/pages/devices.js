import React from 'react';
import { connect } from 'react-redux';
import withParamsAndNavigate from '../helpers/with_params_navigate';
import { allDevices } from '../store/actions/device.action';

class DevicesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: []
        }
    }

    componentDidMount(){
        const { dispatch } = this.props;

        dispatch(allDevices()).then((data) => {
            this.setState({
                devices: data
            });
        }).catch(() => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        return (<div className="flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle bg-blue-600">
                    <div className="px-4 py-[22px] grid align-middle grid-flow-col auto-cols-min place-content-between">
                        <label className="place-self-center font-bold text-white text-xl">Devices</label>
                        <button
                            onClick={()=>{this.props.navigate("/new-device");}}
                            className="group relative w-52 flex justify-center py-2 px-4 border-none border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-blue-500"
                        >
                            New device
                        </button>
                    </div>
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y table-fixed">
                            <thead className="bg-blue-500">
                                <tr>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                        Device name
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                        Device type
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                        Brand
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                        Quantity
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    this.state.devices.map(item => (<tr key={item.id} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{item.name}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">{item.type}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{item.brand}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{item.quantity}</td>
                                </tr>))
                                }                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        devices: state.devices,
    };
}

export default connect(mapStateToProps)(withParamsAndNavigate(DevicesPage));