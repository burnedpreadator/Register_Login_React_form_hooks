export const signupUser = (userData) => {
    return (dispatch) => {
      // Dispatch action to store the user data in the Redux store
      dispatch(signupUserSuccess(userData));
    };
  };
  
  export const signupUserSuccess = (userData) => ({
    type: "SIGNUP_USER_SUCCESS",
    payload: userData,
  });
  