import { createStore, combineReducers } from "redux";

import { loginReducer } from './Reducers/login';

const rootReducer = combineReducers({
  login: loginReducer
});

export const store = createStore(rootReducer);