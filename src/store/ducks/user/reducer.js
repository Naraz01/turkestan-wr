const initialState = {
    data: null,
    isAuth: false
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ('SET_USER') : {
            return { ...state, data: action.payload, isAuth: true };
        }
        case ('LOG_OFF') : {
            console.log('LOG_OFF')
            return { ...state, data: null, isAuth: false };
        }
        default : {
            return state
        }
      }
};
