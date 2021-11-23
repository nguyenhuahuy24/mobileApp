import { dataStatus } from "../../utility/config";
import { NAME_EPICS } from "../epics/bill/NameEpic";

const billState = {
    bill: {
        status: dataStatus.NONE,
        message: '',
        data: {}
    },
    billDetail: {
        status: dataStatus.NONE,
        message: '',
        data: {}
    }
};

const billReducer = (state = billState, action) => {
    switch (action.type) {
        case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_BILL:
            state = {
                ...state,
                bill: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                },
            }
            break;
        case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_BILL_FAILED:
            state = {
                ...state,
                bill: {
                    status: action.data.status,
                    message: action.data.message,
                    data: {}
                }
            }
            break;
        case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_BILL_DETAIL:
            state = {
                ...state,
                billDetail: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                }
            }
            break;
        case NAME_EPICS.EPIC_BILL_SCREEN.EPIC_BILL_DETAIL_FAILED:
            state = {
                ...state,
                billDetail: {
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
export default billReducer