export const flightReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FLIGHT':
      return action.flight;
    case 'UNSET_FLIGHT':
      return {};
    default:
      return state;
  }
}