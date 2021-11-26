import { NAME_ACTIONS } from './ActionName'

export function Login(phone, password) {
    
    return {
        type: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_SCREEN,
        typeAction: NAME_ACTIONS.LOGIN_SCREEN.LOGIN,
        data: { phone, password }
    };
}
export function Logout() {
    return {
        type: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_SCREEN,
        typeAction: NAME_ACTIONS.LOGIN_SCREEN.LOGOUT,
    };
}
export function changePassword(data) {
    console.log("Action")
    return {
        type: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_SCREEN,
        typeAction: NAME_ACTIONS.LOGIN_SCREEN.CHANGE_PASSWORD,
        data: data
    };
}