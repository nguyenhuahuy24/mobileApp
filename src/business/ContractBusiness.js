import { URL } from "../utility/config";
import { dataStatus } from "../utility/config";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ContractBusiness {
    getContract = async (success, failed) => {
        const response = await axios.get(`${URL}/contract`,{headers:{Authorization:'Bearer ' + await AsyncStorage.getItem('accessToken')}})
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
    confirmContract = async (data,success, failed) => {
        const response = await axios.patch(`${URL}/contract/confirm`, data,{headers:{Authorization:'Bearer ' + await AsyncStorage.getItem('accessToken')}})
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