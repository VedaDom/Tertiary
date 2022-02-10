import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import withParamsAndNavigate from '../helpers/with_params_navigate';
import { deviceRequests } from '../store/actions/device.action';

class RequestsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(deviceRequests());
    }

    render() {
        const { navigate } = this.props;
        return (
            <div className="flex flex-col">
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="inline-block min-w-full align-middle bg-blue-600">
                        <div className="px-4 py-[18px] grid align-middle grid-flow-col auto-cols-min place-content-between">
                            <label className="place-self-center font-bold text-white text-xl">Requests</label>
                            <div className="relative mt-1">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="table-search" className="text-sm rounded-lg w-80 pl-10 p-2.5  bg-white placeholder-gray-400 focus:outline-none text-blue-600" placeholder="Search for items" />
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y table-fixed">
                                <thead className="bg-blue-500">
                                    <tr>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                            Requested By
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                            Device name
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                            Device type
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                            Device brand
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                            Date time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        this.props.requests.map(item => (<tr key={item.id} className="hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                                            navigate(`/requests/${item.id}`);
                                        }}>
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{item.user.firstname +" "+item.user.lastname}</td>
                                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">{item.device.name}</td>
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{item.device.type}</td>
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{item.device.brand}</td>
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{moment(item.requestedAt).format("MMM Do YYYY, h:mm:ss A")}</td>
                                        </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
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

export default connect(mapStateToProps)(withParamsAndNavigate(RequestsPage));