import { applyMiddleware, createStore } from "redux"
import appReducer from "./reducers"
import thunk from "redux-thunk";

const middleware = [thunk];

const store = createStore(
  appReducer,
  applyMiddleware(...middleware)
);

export default store;