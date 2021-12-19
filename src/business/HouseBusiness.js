import { URL } from "../utility/config";
import { dataStatus } from "../utility/config";
import axios from "axios";


export default class HouseBusiness {
    getListHouse = async (data, success, failed) => {
        const { province, district, page, limit, currentList } = data
        const response = await axios.get(`${URL}/house?province=${province}&district=${district}&page=${page}&limit=${limit}`)
        //console.log(response.data)
        const list = [...currentList, ...response.data]
        if (!("error" in response.data)) {
            success({
                status: dataStatus.SUCCESS,
                message: 'Get data success',
                data: list
            })
        }
        else (
            failed({
                status: dataStatus.FAILED,
                message: response.data["error"],
                data: response.data
            })
        )
    }
    getListRoom = async (data, success, failed) => {
        const { houseId } = data
        const listRoom = await axios.get(`${URL}/house/${houseId}`)
        if (!("error" in listRoom.data)) {
            success({
                status: dataStatus.SUCCESS,
                message: 'Get data success',
                data: listRoom.data
            })
        }
        else (
            failed({
                status: dataStatus.FAILED,
                message: response.data["error"],
                data: listRoom.data
            })
        )
    }
    getHouseTopRate = async (success, failed) => {
        const response = await axios.get(`${URL}/top-rating-house`)

        let customRes = [...response.data]
        customRes.map((value) => {
            value.UserId = value.UserId[0]
        })
        if (!("error" in response.data)) {
            success({
                status: dataStatus.SUCCESS,
                message: 'Get data success',
                data: customRes
            })
        }
        else (
            failed({
                status: dataStatus.FAILED,
                message: response.data["error"],
                data: customRes
            })
        )
    }
    getRoomRelatePost = async (success, failed) => {
        const response = await axios.get(`${URL}/room-relate-post`)
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
                data: response.data
            })
        )
    }
}