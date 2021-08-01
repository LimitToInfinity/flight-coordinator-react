export const personReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_PERSON':
      return action.person;
    case 'DESELECT_PERSON':
      return {};
    default:
      return state;
  }
}