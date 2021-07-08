import { userService } from "../../services";
import { SAVE_LOGIN, DESTROY_LOGIN, SAVE_USER } from "../type";

export const saveLogin = (data: any) => ({
    type: SAVE_LOGIN,
    payload: data
})

export const saveProfile = (data: any) => ({
    type: SAVE_USER,
    payload: data
})

export const destroyLogin = () => ({
    type: DESTROY_LOGIN
})

export const refreshProfile = () => ( async (dispatch: any) => {
    const response = await userService.me();
    dispatch(response.data.data ? saveProfile(response.data.data) : destroyLogin())
})
