import { combineReducers } from "redux";
import { generalReducer } from "./ducks/general/reducer";
import { userReducer } from "./ducks/user/reducer"
export const rootReducer = combineReducers({
    general: generalReducer,
    user: userReducer
});
