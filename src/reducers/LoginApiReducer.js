const initialState = {
    isLoginApi: false,
    userLogin:null
}

const LoginApiReducer = (state = initialState, action) => {
    switch(action.type) {
        case"LOGIN_API_CALLED":
            return{
                ...state,
                isLoginApi: true,
                userLogin: action.payload,
            };
        default:
            return state;
    }
};

export default LoginApiReducer;