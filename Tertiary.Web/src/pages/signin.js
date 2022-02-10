import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '../store/actions/auth.actions';

class SigninPage extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
        this.state = {
            email: "",
            password: "",
            loading: false,
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleSignin(e) {
        e.preventDefault();

        this.setState({
            loading: true,
        });

        const { dispatch } = this.props;

        dispatch(signin(this.state.email, this.state.password)).then((data) => {
            return <Navigate to="/" />;
        }).catch(() => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Navigate to="/" />;
        }

        return (<div className="h-screen grid grid-cols-2">
            <div className="grid justify-items-center content-center bg-blue-600">
                <div>
                    <h1 className="text-white text-center text-5xl py-4 font-bold">Welcome to Tertiary</h1>
                    <p className="text-center text-white text-lg">A school system for student to request devices<br />like <span className="font-bold">Laptop</span> and <span className="font-bold">Smart Phones</span>.</p>
                </div>
            </div>
            <div className="place-self-center">
                <h1 className="text-blue-600 text-5xl py-4 font-bold">Sign in</h1>
                <form onSubmit={this.handleSignin} className="mt-8 space-y-6 w-[350px]" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="pt-4">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={this.state.loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {this.state.loading && (<svg className="absolute left-3 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>)}
                            Sign in
                        </button>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center">
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Don't have an account?
                            </label>
                        </div>

                        <div className="text-sm pl-2">
                            <NavLink to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Create one.
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.user != null,
    };
}

export default connect(mapStateToProps)(SigninPage);