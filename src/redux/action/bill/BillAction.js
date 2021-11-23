import { NAME_ACTIONS } from './ActionName'

export function getListBillCustomer() {
    console.log("Action")
    return {
        type: NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN,
        typeAction: NAME_ACTIONS.BILL_SCREEN.BILL,
        data: {}
    };
}
export function getInfoBill(data) {
    return {
        type: NAME_ACTIONS.BILL_SCREEN.BILL_SCREEN,
        typeAction: NAME_ACTIONS.BILL_SCREEN.BILL_DETAIL,
        data: data
    };
}