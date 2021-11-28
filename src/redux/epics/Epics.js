import { combineEpics } from 'redux-observable';
import AuthenticationEpic from './authenticate/AuthenticateEpic';
import ContractEpic from './contract/ContractEpic';
import BillEpic from './bill/BillEpic';
import HouseEpic from './house/HouseEpic';

export default combineEpics(
    AuthenticationEpic, BillEpic, ContractEpic, HouseEpic
)