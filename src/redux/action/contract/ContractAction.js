import { NAME_ACTIONS } from './ActionName'

export function getContract() {
    console.log("Action")
    return {
        type: NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT_SCREEN,
        typeAction: NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT,
        data: {}
    };
}
export function confirmContract(data) {
    return {
        type: NAME_ACTIONS.CONTRACT_SCREEN.CONTRACT_SCREEN,
        typeAction: NAME_ACTIONS.CONTRACT_SCREEN.CONFIRM_CONTRACT,
        data: data 
    };
}