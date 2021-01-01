const userReducer = (state = {type: '', message: ''}, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGE':
      return { ...state, type: action.typeMessage, message: action.message };
    default:
      return state;
  }
};

export default userReducer;