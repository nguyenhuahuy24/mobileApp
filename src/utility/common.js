import { dataStatus } from './config'

export const isEmptyObject = (ojb) => {
    return (Object.entries(ojb).length === 0)
}
export const checkLogout = (logoutStatus) => {
    if (logoutStatus.status === dataStatus.SUCCESS) {
        return true
    }
    else { return false }
}