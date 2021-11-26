import { dataStatus } from "../../utility/config";
import { NAME_EPICS } from "../epics/authenticate/NameEpic";

const loginState = {
    user: {
        status: dataStatus.NONE,
        message: '',
        data: {}
    },
    logoutStatus: {
        status: dataStatus.NONE,
        message: ''
    },
    changePasswordStatus: {
        status: dataStatus.NONE,
        message: ''
    },
};

const authenticateReducer = (state = loginState, action) => {
    switch (action.type) {
        case NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGIN:
            state = {
                ...state,
                user: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                },
            }
            console.log("user Reducer:",state)
            break;
        case NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGIN_FAILED:
            state = {
                ...state,
                user: {
                    status: action.data.status,
                    message: action.data.message,
                    data: {}
                }
            }
            break;
        case NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGOUT:
            state = {
                ...state,
                logoutStatus: {
                    status: action.data.status,
                    message: action.data.message
                }
            }
            break;
        case NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGOUT_FAILED:
            state = {
                ...state,
                logoutStatus: {
                    status: action.data.status,
                    message: action.data.message
                }
            }
            break;
        case NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_CHANGE_PASSWORD:
            state = {
                ...state,
                changePasswordStatus: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                }
            }
            break;
        case NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_CHANGE_PASSWORD_FAILED:
            state = {
                ...state,
                changePasswordStatus: {
                    status: action.data.status,
                    message: action.data.message,
                    data: {}
                }
            }
            break;
        default:
            break;
    }
    return state;
};
export default authenticateReducer