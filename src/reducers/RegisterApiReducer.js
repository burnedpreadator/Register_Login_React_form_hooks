const initialState = {
    userRegistered:null,
}

const RegisterApiReducer = (state = initialState, action) => {
    switch(action.type) {
        case"REGISTER_API_CALLED":
            return{
                ...state,
                userRegistered: action.payload,
            };
        default:
            return state;
    }
};

export default RegisterApiReducer;