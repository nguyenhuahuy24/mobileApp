import { dataStatus } from "../../utility/config";
import { NAME_EPICS } from "../epics/contract/NameEpic";

const contractState = {
    contract: {
        status: dataStatus.NONE,
        message: '',
        data: {}
    },
    confirmContract: {
        status: dataStatus.NONE,
        message: '',
        data: {}
    }
};

const contractReducer = (state = contractState, action) => {
    switch (action.type) {
        case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CONTRACT:
            state = {
                ...state,
                contract: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                },
            }
            break;
        case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CONTRACT_FAILED:
            state = {
                ...state,
                contract: {
                    status: action.data.status,
                    message: action.data.message,
                    data: {}
                }
            }
            break;
        case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CONFIRM_CONTRACT:
           
            state = {
                ...state,
                confirmContract: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                }
                
            }
             console.log("reducer", state)
            break;
        case NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CONFIRM_CONTRACT_FAILED:
            state = {
                ...state,
                confirmContract: {
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
export default contractReducer