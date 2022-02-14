import React from 'react';
import { connect } from 'react-redux';
import withParamsAndNavigate from '../helpers/with_params_navigate';
import { allUsers } from '../store/actions/user.action';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const { dispatch } = this.props;

        dispatch(allUsers());
    }

    render() {
        return (<div className="flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle bg-blue-600">
                    <div className="px-4 py-[22px] grid align-middle grid-flow-col auto-cols-min place-content-between">
                        <label className="place-self-center font-bold text-white text-xl">Users</label>
                        <div></div>
                    </div>
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y table-fixed">
                            <thead className="bg-blue-500">
                                <tr>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                        Names
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                        Email
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-white">
                                        Role
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    this.props.users.map(item => (<tr key={item.id} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{item.firstname + " " + item.lastname}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">{item.email}</td>
                                    <td className={`py-4 px-6 text-sm font-medium ${item.role === "ADMIN" ? 'text-blue-600' : 'text-gray-900'} whitespace-nowrap`}>{item.role}</td>
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
        users: state.users.users,
    };
}

export default connect(mapStateToProps)(withParamsAndNavigate(UsersPage));