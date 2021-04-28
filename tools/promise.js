import {
    _query,
    _getDomain
} from './util'
/*
 *描述: 获取租户Id
 *作者: liuqing
 *参数: {
    logo: 租户标识，默认's_gtn'
    baseUrl: 基础请求地址
    url: 接口地址，必传
 }
 *Date: 2021-04-26 14:31:07
*/
export function p_tenantId({
    logo = 's_gtn',
    baseUrl = '',
    url = 'base/api/tenant/query',
}) {
    return new Promise(async (resolve, reject) => {
        // 根据Url生成租户信息
        let tenantStr = ''
        if(_query(logo)) {
            tenantStr = _query(logo)
        }else {
            tenantStr = _getDomain()
        }
        try {
            let  req = new Request(`${baseUrl}/${url}?uniqueName=${tenantStr}`, {method: 'GET', cache: 'reload'})
            const tenant = await fetch(req)
            const responseJson = await tenant.json()
            resolve(responseJson)
        } catch (error) {
            reject(error)
        }
    })
}

/*
 *描述: token加密
 *作者: liuqing
 *参数: {
    baseUrl: 基础请求地址，
    url: token加/解密接口, 默认不传递，
    token: 用户令牌，不加Bearer
 }
 *Date: 2021-04-27 15:59:29
*/
export function p_encryToken({
    baseUrl = '',
    url = 'base/api/auth/swap/once/token',
    token = ''
}) {
    return new Promise(async (resolve, reject) => {
        try {
            let req = new Request(`${baseUrl}/${url}`, {method: 'POST', cache: 'reload', body: {}, headers: {
                Authorization: `Bearer ${token}`
            }})
            const data = await fetch(req)
            const responseJson = await data.json()
            resolve(responseJson)
        } catch (error) {
            reject(error)
        }
    })
}

/*
 *描述: token解密
 *作者: liuqing
 *参数: {}
 *Date: 2021-04-27 15:59:29
*/
export function p_decryToken({
    baseUrl = '',
    url = 'base/api/auth/swap/token/byonce',
    token = ''
}) {
    return new Promise(async (resolve, reject) => {
        try {
            let req = new Request(`${baseUrl}/${url}?oncetoken=${token}`, {method: 'GET', cache: 'reload'})
            const data = await fetch(req)
            const responseJson = await data.json()
            resolve(responseJson)
        } catch (error) {
            reject(error)
        }
    })
}

/*
 *描述: 智慧校园子系统统一初始化前的操作
 *作者: liuqing
 *参数: {
    baseUrl: 基础请求地址，
    url: token加/解密接口, 默认不传递，
    token: 用户加密令牌
 }
 *Date: 2021-04-28 10:51:28
*/
export function p_initVue({
    baseUrl = '',
    url = 'base/api/auth/swap/token/byonce',
    token = ''
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await p_decryToken({
                baseUrl,
                url,
                token
            })
            if(data.success) {
                resolve(data.data.accessToken)
            }else {
                reject(data)
            }
        } catch (error) {
            reject(error)
        }
    })
}