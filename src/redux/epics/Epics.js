import { combineEpics } from 'redux-observable';
import AuthenticationEpic from './authenticate/AuthenticateEpic';
import ContractEpic from './contract/ContractEpic';
import BillEpic from './bill/BillEpic';

export default combineEpics(
    AuthenticationEpic,BillEpic,ContractEpic
)