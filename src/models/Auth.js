import APIConfig from "../configs/APIConfig";
import customFetch from "../libraries/customFetch"
import { processBodyFormUrlEncode } from "../libraries/GlobalFunction";

export const modelAuth = {
    login: (postData, update) => {

        const formBody = processBodyFormUrlEncode(postData)

        return customFetch(update, APIConfig.API_LOGIN, 'POST', false, formBody)
    }
}