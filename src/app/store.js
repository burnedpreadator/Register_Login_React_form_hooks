// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers/rootReducer';

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [thunk],
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '../reducers/signupReducer';
import loginReducer from '../reducers/loginReducer';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    // logout:logoutReducer,
  },
});

export default store;
