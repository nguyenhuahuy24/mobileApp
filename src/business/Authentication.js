import { URL } from "../utility/config";
import { dataStatus } from "../utility/config";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from "underscore";
export default class Authentication {
    login = async (data, success, failed) => {
        const { phone, password } = data
        const params = { Phone: phone, Password: password }
        const response = await axios.post(`${URL}/login`, params)
        const resData = { ...response.data }
        if (!("error" in response.data)) {
            const existPhone = await AsyncStorage.getItem('phone')
            if (existPhone !== phone) {
                await AsyncStorage.setItem('phone', phone)
            }
            try {
                await AsyncStorage.setItem('accessToken', response.data.accessToken)
            } catch (e) {
                console.log(e)
            }
            //save token device
            const deviceToken = await AsyncStorage.getItem('token-device')
            if (resData.customerInfo.DeviceToken !== deviceToken) {
                const tokenParams = { DeviceToken: deviceToken }
                await axios.patch(`${URL}/device-token`, tokenParams, { headers: { Authorization: 'Bearer ' + resData.accessToken } })
                console.log("change token")
            }
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
    logout = async (success, failed) => {
        await AsyncStorage.removeItem('accessToken').then(
            success({
                status: dataStatus.SUCCESS,
                message: 'Logout success',
                data: {}
            })
        ).catch(err => {
            failed({
                status: dataStatus.FAILED,
                message: err,
                data: {}
            })
        })
    }
    changePassword = async (data, success, failed) => {
        const response = await axios.patch(`${URL}/changePassword`, data, { headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('accessToken') } })
        console.log("response: ", response)
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
    getRating = async (success, failed) => {
        const response = await axios.get(`${URL}/rating`, { headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('accessToken') } })
        if (!("error" in response.data)) {
            success({
                status: dataStatus.SUCCESS,
                message: 'Get data success',
                data: response.data
            })
        }
        else (
            failed({
                status: dataStatus.FAILED,
                message: response.data["error"],
                data: {}
            })
        )
    }
    rating = async (data, success, failed) => {
        const { point } = data
        const response = await axios.post(`${URL}/rating`, { rating: point }, { headers: { Authorization: 'Bearer ' + await AsyncStorage.getItem('accessToken') } })
        if (!("error" in response.data)) {
            success({
                status: dataStatus.SUCCESS,
                message: 'Get data success',
                data: response.data
            })
        }
        else (
            failed({
                status: dataStatus.FAILED,
                message: response.data["error"],
                data: {}
            })
        )
    }
}