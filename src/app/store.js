import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../reducers/signupReducer';
import loginReducer from '../reducers/loginReducer';
import LoginApiReducer from '../reducers/LoginApiReducer';
import RegisterApiReducer from '../reducers/RegisterApiReducer';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    RegisterApiCall: RegisterApiReducer,
    LoginApiCall: LoginApiReducer,
  },
});

export default store;
