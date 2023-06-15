const initialState = {
    isLoggedIn: false,
    loginApiCalled: null,
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
          loginApiCalled: null,
        };
      default:
        return state;
    }
  };
  
  export default loginReducer;
  