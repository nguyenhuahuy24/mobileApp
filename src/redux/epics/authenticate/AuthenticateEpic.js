import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/authenticateAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import AuthenticationBusiness from '../../../business/Authentication'


let messageError = {};

const resolver = (action) => {
    const authenticationBusiness = new AuthenticationBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.LOGIN_SCREEN.LOGIN:
                authenticationBusiness.login(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.LOGIN_SCREEN.LOGIN,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.LOGIN_SCREEN.LOGIN_FAILED));
                })
                break;
            case NAME_ACTIONS.LOGIN_SCREEN.LOGOUT:
                authenticationBusiness.logout(success => {
                    resolve({
                        actionType: NAME_ACTIONS.LOGIN_SCREEN.LOGOUT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.LOGIN_SCREEN.LOGOUT_FAILED));
                })
                break;
            case NAME_ACTIONS.LOGIN_SCREEN.CHANGE_PASSWORD:
                authenticationBusiness.changePassword(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.LOGIN_SCREEN.CHANGE_PASSWORD,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.LOGIN_SCREEN.CHANGE_PASSWORD_FAILED));
                })
                break;
            case NAME_ACTIONS.LOGIN_SCREEN.GET_RATING:
                authenticationBusiness.getRating(success => {
                    resolve({
                        actionType: NAME_ACTIONS.LOGIN_SCREEN.GET_RATING,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.LOGIN_SCREEN.GET_RATING_FAILED));
                })
                break;
            case NAME_ACTIONS.LOGIN_SCREEN.RATING:
                authenticationBusiness.rating(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.LOGIN_SCREEN.RATING,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.LOGIN_SCREEN.RATING_FAILED));
                })
                break;
            default:
                console.error('Error when resolver Authentication Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.LOGIN_SCREEN.LOGIN:
            return {
                type: NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGIN,
                data: data.data
            }
        case NAME_ACTIONS.LOGIN_SCREEN.LOGOUT:
            return {
                type: NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGOUT,
                data: data.data
            };
        case NAME_ACTIONS.LOGIN_SCREEN.CHANGE_PASSWORD:
            return {
                type: NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_CHANGE_PASSWORD,
                data: data.data
            }
        case NAME_ACTIONS.LOGIN_SCREEN.GET_RATING:
            return {
                type: NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_GET_RATING,
                data: data.data
            }
        case NAME_ACTIONS.LOGIN_SCREEN.RATING:
            return {
                type: NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_RATING,
                data: data.data
            }
        default:
            console.error('Error when dispatch Authentication Epic.');
            return new Error('Error when dispatch Authentication Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.LOGIN_SCREEN.LOGIN_FAILED:
            return {
                type: NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGIN_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.LOGIN_SCREEN.LOGOUT_FAILED:
            return {
                type: NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGOUT_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.LOGIN_SCREEN.CHANGE_PASSWORD_FAILED:
            return {
                type: NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_CHANGE_PASSWORD_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.LOGIN_SCREEN.GET_RATING_FAILED:
            return {
                type: NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_GET_RATING_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.LOGIN_SCREEN.RATING_FAILED:
            return {
                type: NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_RATING_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Authentication Epic.');
            return new Error('Error when dispatch error Authentication Epic.');
    }
};

const AuthenticationEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.LOGIN_SCREEN.LOGIN_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );

export default AuthenticationEpic;