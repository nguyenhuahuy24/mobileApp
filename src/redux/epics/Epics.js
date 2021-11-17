import { combineEpics } from 'redux-observable';
import AuthenticationEpic from './authenticate/AuthenticateEpic';

export default combineEpics(
    AuthenticationEpic
)