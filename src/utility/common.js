import { dataStatus } from './config'
import { url_image } from './config'
export const isEmptyObject = (ojb) => {
    return (Object.entries(ojb).length === 0)
}
export const checkLogout = (logoutStatus) => {
    if (logoutStatus.status === dataStatus.SUCCESS) {
        return true
    }
    else { return false }
}
export const getAvartar = (uid) => {
    return `${url_image}/uploads/images/${uid}`;
}