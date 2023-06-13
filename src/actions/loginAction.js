export const loginUser = (credentials) => {
  return {
    type: "LOGIN_USER",
    payload: credentials,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
