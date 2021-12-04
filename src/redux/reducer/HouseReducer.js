import { dataStatus } from "../../utility/config";
import { NAME_EPICS } from "../epics/house/NameEpic";

const houseState = {
    listHouse: {
        status: dataStatus.NONE,
        message: '',
        data: []
    },
    listRoom: {
        status: dataStatus.NONE,
        message: '',
        data: []
    }
};

const houseReducer = (state = houseState, action) => {
    switch (action.type) {
        case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_HOUSE:
            state = {
                ...state,
                listHouse: {
                    status: action.data.status,
                    message: action.data.message,
                    data: [
                        ...state.listHouse.data,
                        ...action.data.data
                    ]
                },
            }
            break;
        case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_HOUSE_FAILED:
            state = {
                ...state,
                listHouse: {
                    status: action.data.status,
                    message: action.data.message,
                    data: []
                }
            }
            break;
        case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_LIST_ROOM:
            state = {
                ...state,
                listRoom: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                },
            }
            
            break;
        case NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_LIST_ROOM_FAILED:
            state = {
                ...state,
                listRoom: {
                    status: action.data.status,
                    message: action.data.message,
                    data: []
                }
            }
            break;
        default:
            break;
    }
    return state;
};
export default houseReducer