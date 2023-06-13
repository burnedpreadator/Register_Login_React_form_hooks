
const initialState = {
    users: [],
  };
  
  const signupReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SIGNUP_USER_SUCCESS":
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default signupReducer;
  