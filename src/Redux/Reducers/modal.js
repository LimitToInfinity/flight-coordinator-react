const initialState = { showModal: false, innerComponent: null };

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { showModal: true, innerComponent: action.innerComponent };
    case 'HIDE_MODAL':
      return { showModal: false, innerComponent: null };
    default:
      return state;
  }
}