export  default  function (state  = {token:"", profile:{}}, action) {
    switch (action.type) {
        case 'CREATE_SESSION':
          return { ...state, token: action.token };
        case 'DELETE_SESSION':
          return { ...state, token: '' };
        case 'UPDATE_PROFILE':
          return { ...state, profile: action.profile };
        default:
          return state;
    }
}