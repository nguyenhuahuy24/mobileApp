import { URL } from "../utility/config";
import { dataStatus } from "../utility/config";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class BillBusiness {
    getListBillCustomer = async (success, failed) => {  
        const response = await axios.get(`${URL}/bill`,{headers:{Authorization:'Bearer ' + await AsyncStorage.getItem('accessToken')}})
        const resData = { ...response.data }
        if (!("error" in response.data)) {
            success({
                status: dataStatus.SUCCESS,
                message: 'Get data success',
                data: resData
            })
        }
        else (
            failed({
                status: dataStatus.FAILED,
                message: response.data["error"],
                data: resData
            })
        )
    }
    getInfoBill = async (data,success, failed) => {
        const response = await axios.get(`${URL}/bill/`+ data)
        const resData = { ...response.data }
        if (!("error" in response.data)) {
            success({
                status: dataStatus.SUCCESS,
                message: 'Get data success',
                data: resData
            })
        }
        else (
            failed({
                status: dataStatus.FAILED,
                message: response.data["error"],
                data: resData
            })
        )
    }
    
}