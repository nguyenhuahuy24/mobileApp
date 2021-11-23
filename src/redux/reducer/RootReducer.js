import { combineReducers } from "redux";
import AuthenticateReducer from './AuthenticateReducer'
import BillReducer from './BillReducer'

import ContractReducer from './ContractReducer'

const RootReducer = combineReducers({
    AuthenticateReducer,ContractReducer,BillReducer
});

export default RootReducer;