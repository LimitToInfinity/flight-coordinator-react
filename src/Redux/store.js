import { createStore, combineReducers } from 'redux';

import { loginReducer } from './Reducers/login';
import { modalReducer } from './Reducers/modal';
import { personReducer } from './Reducers/person';
import { flightReducer } from './Reducers/flight';
import { peopleReducer } from './Reducers/people';
import { flightsReducer } from './Reducers/flights';

const rootReducer = combineReducers({
  login: loginReducer,
  modal: modalReducer,
  person: personReducer,
  flight: flightReducer,
  people: peopleReducer,
  flights: flightsReducer
});

export const store = createStore(rootReducer);