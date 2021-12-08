import APIConfig from "../configs/APIConfig"
import customFetch from "../libraries/customFetch"
import { processBodyFormUrlEncode } from "../libraries/GlobalFunction"

export const modelData = {
    dashboard: (postData, update) => {

        const formBody = processBodyFormUrlEncode(postData)

        return customFetch(update, APIConfig.API_DASHBOARD, 'POST', false, formBody)
    },
    list: (update) => {
        return customFetch(update, APIConfig.API_LIST)
    },
}