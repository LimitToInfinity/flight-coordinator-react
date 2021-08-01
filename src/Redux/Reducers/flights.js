export const flightsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FLIGHTS':
      return action.flights;
    case 'ADD_FLIGHT':
      return [...state, action.newFlight];
    case 'UPDATE_RIDE':
      return updateRide(state, action.modifiedFlightId, action.ride);
    case 'REMOVE_RIDE':
      return removeRide(state, action.modifiedFlightId);
    default:
      return state;
  }
}

function updateRide(flights, modifiedFlightId, newRide) {
  const updated = updateFlights(flights, modifiedFlightId, newRide);
  return [...updated.flights, updated.flight];
}

function updateFlights(flights, modifiedFlightId, newRide) {
  const updatedFlights = flights.filter(flight => flight.id !== modifiedFlightId);
  const updatedFlight = flights.find(flight => flight.id === modifiedFlightId);
  updatedFlight.ride = newRide;

  return { flights: updatedFlights, flight: updatedFlight };
}

function removeRide(flights, modifiedFlightId) {
  const updated = updateFlights(flights, modifiedFlightId, null);
  return [...updated.flights, updated.flight];
}