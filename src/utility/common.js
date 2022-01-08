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
    if(uid==undefined){
        return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
    else return `${url_image}/${uid}`;
}