const initialState = {
  isLoggedIn: false,
  currentUser: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
