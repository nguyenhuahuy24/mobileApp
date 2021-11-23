import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/bill/ActionName';
import { NAME_EPICS } from './NameEpic';

import BillBusiness from '../../../business/BillBusiness'

 
let messageError = {};

const resolver = (action) => {
    const billBusiness = new BillBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.BILL_SCREEN.BILL:
                billBusiness.getListBillCustomer(success => {
                    resolve({
                        actionType: NAME_ACTIONS.BILL_SCREEN.BILL,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.BILL_SCREEN.BILL_FAILED));
                })
                break;
            case NAME_ACTIONS.BILL_SCREEN.BILL_DETAIL:
                billBusiness.getInfoBill(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.BILL_SCREEN.BILL_DETAIL,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.BILL_SCREEN.BILL_DETAIL));
                })
                break;
            default:
                console.error('Error when resolver Bill Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.BILL_SCREEN.BILL:
            return {
                type: NAME_EPICS.EPIC_BILL_SCREEN.EPIC_BILL,
                data: data.data
            }
        case NAME_ACTIONS.BILL_SCREEN.BILL_DETAIL:
            return {
                type: NAME_EPICS.EPIC_BILL_SCREEN.EPIC_BILL_DETAIL,
                data: data.data
            };
        default:
            console.error('Error when dispatch Bill Epic.');
            return new Error('Error when dispatch Bill Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.BILL_SCREEN.BILL_FAILED:
            return {
                type: NAME_EPICS.EPIC_BILL_SCREEN.EPIC_BILL_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.BILL_SCREEN.BILL_DETAIL_FAILED:
            return {
                type: NAME_EPICS.EPIC_BILL_SCREEN.EPIC_BILL_DETAIL_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Bill Epic.');
            return new Error('Error when dispatch error Bill Epic.');
    }
};

const BillEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );

export default BillEpic;