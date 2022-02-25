const initialState = {
    data: [],
};

export const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ('SET_GENERAL') : {
            return { ...state, data: action.payload };
        }
        default : {
            return state
        }
      }
};
