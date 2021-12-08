import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from '../configs/GlobalConfig'

const isJSON = (str) => {
    try {
        const obj = JSON.parse(str);
        if (obj && typeof obj === `object`) {
            return true;
        }
    } catch (err) {
        return false;
    }
    return false;
}

export default async (update, API, requestType = 'GET', useToken = false, post_data = null, params_data = null, debugMode = false) => {
    let token
    if (useToken) {
        AsyncStorage.getItem(StorageKey.USER_TOKEN, (err, res) => {
            token = res
        })
    }

    const FETCH_API = `${API}${params_data ? `?${params_data}` : ``}`

    return fetch(FETCH_API, {
        method: requestType,
        headers: post_data ?
            { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } : {},
        body: post_data ? post_data : ''
    })
        .then((response) => {
            const { status } = response
            return Promise.all([status, response.text()])
        })
        .then(([statusCode, result]) => {
            if (result.length > 0) {
                if (isJSON(result)) {
                    const response = {
                        FETCH_API,
                        statusCode,
                        post_data,
                        result: JSON.parse(result)
                    }

                    if (statusCode != 200) console.error('\nLOG', JSON.stringify(response, null, 4))

                    update(response)
                }
                else {
                    const response = {
                        FETCH_API,
                        statusCode,
                        post_data: JSON.parse(post_data)
                    }
                    console.error('\nLOG', JSON.stringify(response, null, 4))
                    console.log('\nPHP ERR', `\n${result}`)

                    throw 'Return NOT JSON'
                }
            }
            else {
                throw ({
                    FETCH_API,
                    statusCode,
                    type: 'Empty Result'
                })
            }
        })
        .catch(err => {
            throw ({
                FETCH_API,
                type: err
            })
        })
}