import { combineReducers } from "redux";
import AuthenticateReducer from './AuthenticateReducer'
import BillReducer from './BillReducer'
import ContractReducer from './ContractReducer'
import HouseReducer from "./HouseReducer";

const RootReducer = combineReducers({
    AuthenticateReducer, ContractReducer, BillReducer, HouseReducer
});

export default RootReducer;