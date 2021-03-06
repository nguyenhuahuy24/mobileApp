import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/house/ActionName';
import { NAME_EPICS } from './NameEpic';

import HouseBusiness from '../../../business/HouseBusiness'


let messageError = {};

const resolver = (action) => {
    const houseBusiness = new HouseBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE:
                houseBusiness.getListHouse(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE_FAILED));
                })
                break;
            case NAME_ACTIONS.HOUSE_SCREEN.GET_LIST_ROOM:
                houseBusiness.getListRoom(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.HOUSE_SCREEN.GET_LIST_ROOM,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.HOUSE_SCREEN.GET_LIST_ROOM_FAILED));
                })
                break;
            case NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE_TOP_RATE:
                houseBusiness.getHouseTopRate(success => {
                    resolve({
                        actionType: NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE_TOP_RATE,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE_TOP_RATE_FAILED));
                })
                break;
            case NAME_ACTIONS.HOUSE_SCREEN.GET_ROOM_RELATE_POST:
                houseBusiness.getRoomRelatePost(success => {
                    resolve({
                        actionType: NAME_ACTIONS.HOUSE_SCREEN.GET_ROOM_RELATE_POST,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.HOUSE_SCREEN.GET_ROOM_RELATE_POST_FAILED));
                })
                break;
            default:
                console.error('Error when resolver House Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_HOUSE,
                data: data.data
            }
        case NAME_ACTIONS.HOUSE_SCREEN.GET_LIST_ROOM:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_LIST_ROOM,
                data: data.data
            }

        case NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE_TOP_RATE:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_HOUSE_TOP_RATE,
                data: data.data
            }
        case NAME_ACTIONS.HOUSE_SCREEN.GET_ROOM_RELATE_POST:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_ROOM_RELATE_POST,
                data: data.data
            }
        default:
            console.error('Error when dispatch House Epic.');
            return new Error('Error when dispatch House Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE_FAILED:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_HOUSE_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.HOUSE_SCREEN.GET_LIST_ROOM_FAILED:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_LIST_ROOM_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE_TOP_RATE_FAILED:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_HOUSE_TOP_RATE_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.HOUSE_SCREEN.GET_ROOM_RELATE_POST_FAILED:
            return {
                type: NAME_EPICS.EPIC_HOUSE_SCREEN.EPIC_GET_ROOM_RELATE_POST_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error House Epic.');
            return new Error('Error when dispatch error House Epic.');
    }
};

const HouseEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.HOUSE_SCREEN.HOUSE_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );

export default HouseEpic;