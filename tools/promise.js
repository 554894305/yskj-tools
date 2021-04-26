import {
    _query,
    _getDomain
} from './util'
/*
 *描述: 获取url的主域名
 *作者: liuqing
 *参数: {
    logo: 租户标识
    request： Request对象。new Request(URL, {method: 'GET', cache: 'reload', body: {}})
 }
 *Date: 2021-04-26 14:31:07
*/
export function p_tenantId({
    logo = 's_gtn',
    url,
    method = 'GET',
    body = {}
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
            let req = null
            if(method.toUpperCase() === 'GET') {
                req = new Request(`${url}?uniqueName=${tenantStr}`, {method, cache: 'reload'})
            }else {
                req = new Request(url, {method, cache: 'reload', body})
            }
            const tenant = await fetch(req)
            const responseJson = await tenant.json()
            resolve(responseJson)
        } catch (error) {
            reject(error)
        }
    })
}