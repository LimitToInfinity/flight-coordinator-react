import { createStore, combineReducers } from 'redux';

import { loginReducer } from './Reducers/login';
import { modalReducer } from './Reducers/modal';
import { personReducer } from './Reducers/person';
import { flightReducer } from './Reducers/flight';

const rootReducer = combineReducers({
  login: loginReducer,
  modal: modalReducer,
  person: personReducer,
  flight: flightReducer
});

export const store = createStore(rootReducer);