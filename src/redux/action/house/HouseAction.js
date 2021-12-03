import { NAME_ACTIONS } from './ActionName'

export function getHouse(province, district, page, limit, currentList) {
    return {
        type: NAME_ACTIONS.HOUSE_SCREEN.HOUSE_SCREEN,
        typeAction: NAME_ACTIONS.HOUSE_SCREEN.GET_HOUSE,
        data: { province, district, page, limit, currentList }
    };
}
export function getListRoom(houseId) {
    return {
        type: NAME_ACTIONS.HOUSE_SCREEN.HOUSE_SCREEN,
        typeAction: NAME_ACTIONS.HOUSE_SCREEN.GET_LIST_ROOM,
        data: { houseId }
    };
}
