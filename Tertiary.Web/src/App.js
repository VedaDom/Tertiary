import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, NavLink } from "react-router-dom";
import { RequireAuth } from "./components/require_auth";

import { browserHistory } from "./helpers/browserHistory";
import DevicesPage from "./pages/devices";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import { authService } from "./services/auth.service";
import { Role } from "./models/role";
import RequestsPage from "./pages/requests";
import { signout } from "./store/actions/auth.actions";
import { connect } from "react-redux";
import RequestPage from "./pages/request";
import MyDevicePage from "./pages/my_device";
import NewDevicePage from "./pages/new_device";
import UsersPage from "./pages/users";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignout = this.handleSignout.bind(this);

    this.state = {
      user: null,
      isAdmin: false,
      loading: false
    };
  }

  componentDidMount() {
    authService.user.subscribe(user => this.setState({
      user: user,
      isAdmin: user && user.role === Role.Admin
    }));
  }

  handleSignout(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const { dispatch } = this.props;

    dispatch(signout()).then(() => {
      this.setState({
        loading: false
      });
      return <Navigate to="/signin" />;
    }).catch(() => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    const { isAdmin } = this.props;
    return (
      <Router history={browserHistory}>
        <Routes>
          <Route exact path="/" element={<RequireAuth>
            <div className="h-[100vh] grid grid-cols-[300px_auto] items-center">
              <div className="w-[250px] h-[90vh] place-self-center bg-blue-600 rounded-[0.75rem] drop-shadow-md grid grid-rows-[97px_auto_100px]">
                <div className="text-white text-3xl font-bold py-4 border-b-[0.5px] border-white mb-4 text-center">Tertiary</div>
                <div className="grid grid-flow-row auto-rows-min">
                  {isAdmin ? <>
                    <NavLink to="requests" className={`py-2 px-8 my-2 mx-4 text-white cursor-pointer rounded-[0.375rem] hover:text-white hover:bg-white hover:bg-opacity-[0.30] ${browserHistory.location.pathname == "requests" ? "active:bg-white" : ""}`}>Requests</NavLink>
                    <NavLink to="devices" className={`py-2 px-8  my-2 mx-4 text-white cursor-pointer rounded-[0.375rem] hover:text-white hover:bg-white hover:bg-opacity-[0.30] ${browserHistory.location.pathname == "devices" ? "active:bg-white" : ""}`}>Devices</NavLink>
                    <NavLink to="users" className={`py-2 px-8  my-2 mx-4 text-white cursor-pointer rounded-[0.375rem] hover:text-white hover:bg-white hover:bg-opacity-[0.30] ${browserHistory.location.pathname == "users" ? "active:bg-white" : ""}`}>Users</NavLink>
                  </> : <NavLink to="my-device" className={`py-2 px-8 my-2 mx-4 text-white cursor-pointer rounded-[0.375rem] hover:text-white hover:bg-white hover:bg-opacity-[0.30] ${browserHistory.location.pathname == "my-device" ? "active:bg-white" : ""}`}>My device</NavLink>
                  }
                </div>
                <div className="grid items-center justify-items-stretch">
                  <button onClick={this.handleSignout} className="group relative flex justify-center py-2 px-8 m-4 text-white cursor-pointer rounded-[0.375rem] hover:text-white hover:bg-red-500">
                    {this.state.loading && (<svg className="absolute left-3 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>)}
                    Logout
                  </button>
                </div>
              </div>
              <div className="h-[90vh] grid grid-flow-row items-stretch pr-[25px]">
                <Outlet />
              </div>
            </div>
          </RequireAuth>}>
            <Route exact path="/" element={<Navigate to={isAdmin ? "/requests" : "/my-device"} />} />
            <Route path="/devices" element={<RequireAuth><DevicesPage /></RequireAuth>} />
            <Route path="/my-device" element={<RequireAuth><MyDevicePage /></RequireAuth>} />
            <Route path="/new-device" element={<RequireAuth><NewDevicePage/></RequireAuth>} />
            <Route path="/requests" element={<RequireAuth><RequestsPage /></RequireAuth>} />
            <Route path="/requests/:id" element={<RequireAuth><RequestPage /></RequireAuth>} />
            <Route path="/users" element={<RequireAuth><UsersPage /></RequireAuth>} />
          </Route>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAdmin: state.auth.user && state.auth.user.role === Role.Admin
  };
}

export default connect(mapStateToProps)(App);
