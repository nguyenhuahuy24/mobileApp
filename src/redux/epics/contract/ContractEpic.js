import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/contract/ActionName';
import { NAME_EPICS } from './NameEpic';

import ContractBusiness from '../../../business/ContractBusiness'

 
let messageError = {};

const resolver = (action) => {
    const contractBusiness = new ContractBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT:
                contractBusiness.getContract( success => {
                    resolve({
                        actionType: NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT_FAILED));
                })
                break;
            case NAME_ACTIONS.CONTRACT_SCREEN.CONFIRM_CONTRACT:
                contractBusiness.confirmContract(action.data,success => {
                    console.log("Epic")
                    resolve({
                        actionType: NAME_ACTIONS.CONTRACT_SCREEN.CONFIRM_CONTRACT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.CONTRACT_SCREEN.CONFIRM_CONTRACT_FAILED));
                })
                break;
            default:
                console.error('Error when resolver CONTRACT Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT:
            return {
                type: NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CONTRACT,
                data: data.data
            }
        case NAME_ACTIONS.CONTRACT_SCREEN.CONFIRM_CONTRACT:
            return {
                type: NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CONFIRM_CONTRACT,
                data: data.data
            };
        default:
            console.error('Error when dispatch CONTRACT Epic.');
            return new Error('Error when dispatch CONTRACT Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT_FAILED:
            return {
                type: NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CONTRACT_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.CONTRACT_SCREEN.CONFIRM_CONTRACT_FAILED:
            return {
                type: NAME_EPICS.EPIC_CONTRACT_SCREEN.EPIC_CONFIRM_CONTRACT_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error CONTRACT Epic.');
            return new Error('Error when dispatch error CONTRACT Epic.');
    }
};

const ContractEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );

export default ContractEpic;