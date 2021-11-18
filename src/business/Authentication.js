import { URL } from "../utility/config";
import { dataStatus } from "../utility/config";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
}