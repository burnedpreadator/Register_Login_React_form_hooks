export const LoginApi = (credentials) =>{
    return{
        type: "LOGIN_API_CALLED",
        payload:credentials,
    };
};
export const RegisterApi = (credentials) =>{
    return(dispatch) => {
        dispatch(registerApiSuccess(credentials));
    }
};

export const registerApiSuccess=(userData) => ({
    type: "REGISTER_API_CALLED",
    payload:userData,
})