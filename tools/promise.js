import {
    _query,
    _getDomain,
    _environ
} from './util'

function print(data, flag, options) {
    !options && (options = {})
    let obj
    if(flag) {
        obj = {
            code: 0,
            success: true,
            data,
            msg: 'ok'
        }
        for (const [key, value] of Object.entries(options)) {
            obj[key] = value
        }
    }else {
        obj = {
            code: 500,
            success: false,
            data: null,
            msg: data
        }
    }
    return obj
}

export function p_fetch(url, method, body, headers) {
    return new Promise(async (resolve, reject) => {
        if(_environ() === 'miniapp') {
            uni.request({
                url,
				method,
                data: body,
                header: headers,
                success (res) {
                    resolve(res.data)
                }
            })
        }else {
            let req
            if(method === 'GET') {
                req = new Request(url, {method, headers})
            }else {
                req = new Request(url, {method, body, headers})
            }
            const data = await fetch(req)
            const responseJson = await data.json()
            resolve(responseJson)
        }
    })
}


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
    baseUrl（*String）: 基础请求地址，
    url（String）: token加/解密接口, 默认不传递，
    token（*String）: 用户加密令牌，
    getInfo（Boolean），是否获取用户信息，默认为false
    infoUrl（String）：用户信息接口地址，有默认值
 }
 *Date: 2021-04-28 10:51:28
*/
export function p_initVue({
    baseUrl = '',
    url = 'base/api/auth/swap/token/byonce',
    token = '',
    getInfo = false,
    infoUrl = 'base/api/auth/user/current/detail'
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await p_decryToken({
                baseUrl,
                url,
                token
            })
            if(data.success) {
                if(getInfo) {
                    p_fetch(`${baseUrl}/${infoUrl}`, 'GET', {}, {
                        'Authorization': 'Bearer ' + data.data.accessToken
                    }).then((res) => {
                        if(res.success) {
                            resolve(print({
                                token: data.data.accessToken,
                                userInfo: res.data
                            }, true))
                        }
                    }).catch((err) => {
                        reject(print(err, false))
                    })
                }else {
                    resolve(print({
                        token: data.data.accessToken
                    }, true))
                }
            }else {
                reject(print(data, false))
            }
        } catch (error) {
            reject(print(error, false))
        }
    })
}
/*
 *描述: 上传文件通用方法：
 *      1. 多文件上传 
 *      2. 图片压缩功能 ^1.2.1 注：小程序压缩请使用wx.chooseImage自带的压缩功能
 *      3. 小程序，Web通用
 *作者: liuqing
 *参数: {
    files(Array): 图片集合(小程序是本地图片路径集合，Web是file对象集合)
    options(obj): {
        fileType(String): 文件类型，可选值：base64、file(默认)
        token(*String)
        width(Number): 开启图片压缩时传递，压缩的图片宽度，默认值：500
        baseUrl(*String): 应用的基本地址    注意：不要以斜杠开头！！！
        uploadBaseUrl(*String)：上传的api基本地址     注意：不要以斜杠开头！！！
        uploadUrl(String)：上传的api地址，默认为：'alpha/upload_file.do'      注意：不要以斜杠开头！！！
        decryUrl(String): 加密转解密接口，默认为：'alpha/get_file_url_key.do'      注意：不要以斜杠开头！！！
        tokenUrl(String): 长传前的token转换接口，默认为：'base/api/file/token'      注意：不要以斜杠开头！！！
        maxLength(Number): 最大上传文件个数，默认为9
        openCompress(Boolean): 文件上传前是否开启压缩功能，默认为false
    }
 }
 *Date: 2021-05-12 13:51:50
*/
function getHttpUrl(url, token) {
    return new Promise(async (resolve, reject) => {
        try {
            const url1 = await p_fetch(url, 'GET', {}, {
                token
            })
            if(url1.success) {
                resolve(url1.data)
            }else {
                reject('解密失败')
            }
        } catch (error) {
            reject('解密失败')
        }
    })
}
let uploadimg_success = []
let compressImageArr = []
let failData = {
	number: 0,
	arr: []
}
function compressImage(src, quality) {
	return new Promise((resolve) => {
		uni.compressImage({
			src,
			quality,
			success: (e) => {
				resolve(e.tempFilePath)
			},
			fail: () => {
				resolve(src)
			}
		})
	})
}
function getCompressImage(data, options, callback) {
	let i = data.i ? data.i : 0
	compressImage(data.files[i], options.quality).then((newSrc) => {
		compressImageArr.push(newSrc)
		i++
		if (i == data.files.length) {
		    callback(compressImageArr)
		} else {
		    data.i = i
		    getCompressImage(data, options, callback)
		}
	})
}
function uploadimg(api1, data, options, callback) {
	let i = data.i ? data.i : 0
	let success = data.success ? data.success : 0
	let fail = data.fail ? data.fail : 0
    if(_environ() === 'miniapp') {
        uni.uploadFile({
            url: `${options.uploadBaseUrl}/${options.uploadUrl}`,
            filePath: data.files[i],
            name: 'file',
            header: {
                token: api1.data
            },
            success: async (res) => {
                success++
                let _data = JSON.parse(res.data)
                uploadimg_success.push({
                    encryUrl: _data.data,
                    decryUrl: await getHttpUrl(`${options.uploadBaseUrl}/${options.decryUrl}?filePath=${_data.data}`, api1.data),
                    msg: 'ok'
                })
            },
            fail: (err) => {
                fail++
                failData.arr.push(i)
            },
            complete: () => {
                setTimeout(() => {
                    i++
                    if (i == data.files.length) {
                        failData.number = fail
                        callback(uploadimg_success, failData)
                    } else {
                        data.i = i
                        data.success = success
                        data.fail = fail
                        uploadimg(api1, data, options,callback)
                    }
                }, 200)
            }
        })
    }else {
        if(options.openCompress) {
            let img = document.createElement('img')
            let cvs = document.createElement('canvas')
            let reader = new FileReader()
            reader.readAsDataURL(data.files[i])
            reader.onload = function(e) {
                let naturalBase64 = e.target.result
                img.src = naturalBase64
                img.onload = async function () {
                    let ratio = img.naturalWidth / img.naturalHeight
                    let width = options.width
                    let height = width / ratio
                    cvs.width = width
                    cvs.height = height
                    let ctx = cvs.getContext('2d')
                    ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
                    let zipBase64 = cvs.toDataURL()
                    const api2 = await p_fetch(`${options.uploadBaseUrl}/${options.uploadUrl}`, 'POST', zipBase64, {
                        token: api1.data
                    })
                    try{
                        if(api2.success) {
                            success++
                            uploadimg_success.push({
                                encryUrl: api2.data,
                                decryUrl: await getHttpUrl(`${options.uploadBaseUrl}/${options.decryUrl}?filePath=${api2.data}`, api1.data),
                                msg: 'ok'
                            })
                        }else {
                            fail++
                            failData.arr.push(i) 
                        }
                    }catch(e){
                        fail++
                        failData.arr.push(i)
                    }
                    setTimeout(() => {
                        i++
                        if (i == data.files.length) {
                            failData.number = fail
                            callback(uploadimg_success, failData)
                        } else {
                            data.i = i
                            data.success = success
                            data.fail = fail
                            uploadimg(api1, data, options,callback)
                        }
                    }, 200)
                }
            }
        }else {
            let formData = new FormData()
            formData.append('file', data.files[i])
            if(options.fileType === 'file') {
                p_fetch(`${options.uploadBaseUrl}/${options.uploadUrl}`, 'POST', formData, {
                    token: api1.data
                }).then(async (api2) => {
                    if(api2.success) {
                        success++
                        uploadimg_success.push({
                            encryUrl: api2.data,
                            decryUrl: await getHttpUrl(`${options.uploadBaseUrl}/${options.decryUrl}?filePath=${api2.data}`, api1.data),
                            msg: 'ok'
                        })
                    }else {
                        fail++
                        failData.arr.push(i) 
                    }
                }).catch(() => {
                    fail++
                    failData.arr.push(i) 
                }).finally(() => {
                    setTimeout(() => {
                        i++
                        if (i == data.files.length) {
                            failData.number = fail
                            callback(uploadimg_success, failData)
                        } else {
                            data.i = i
                            data.success = success
                            data.fail = fail
                            uploadimg(api1, data, options,callback)
                        }
                    }, 200)
                })
            }else {
                p_fetch(`${options.uploadBaseUrl}/${options.uploadUrl}`, 'POST', data.files[i], {
                    token: api1.data
                }).then(async (api2) => {
                    if(api2.success) {
                        success++
                        uploadimg_success.push({
                            encryUrl: api2.data,
                            decryUrl: await getHttpUrl(`${options.uploadBaseUrl}/${options.decryUrl}?filePath=${api2.data}`, api1.data),
                            msg: 'ok'
                        })
                    }else {
                        fail++
                        failData.arr.push(i) 
                    }
                }).catch(() => {
                    fail++
                    failData.arr.push(i) 
                }).finally(() => {
                    setTimeout(() => {
                        i++
                        if (i == data.files.length) {
                            failData.number = fail
                            callback(uploadimg_success, failData)
                        } else {
                            data.i = i
                            data.success = success
                            data.fail = fail
                            uploadimg(api1, data, options,callback)
                        }
                    }, 200)
                })
            }
        }
    }
}
export function p_uploadFile(files, options) {
    uploadimg_success = []
    compressImageArr = []
    failData = {
        number: 0,
        arr: []
    }
    !options.openCompress && (options.openCompress = false)
	!options.quality && (options.quality = 80)
    if(_environ() === 'miniapp') {
        !options.uploadUrl && (options.uploadUrl = 'alpha/upload_file.do')
    }else {
        if(options.openCompress || options.fileType === 'base64') {
            !options.uploadUrl && (options.uploadUrl = 'alpha/upload_base64_file.do')
        }else {
            !options.uploadUrl && (options.uploadUrl = 'alpha/upload_file.do')
        }
    }
    !options.tokenUrl && (options.tokenUrl = 'base/api/file/token')
    !options.fileType && (options.fileType = 'file')
    !options.decryUrl && (options.decryUrl = 'alpha/get_file_url_key.do')
    !options.width && (options.width = 500)
    !options.maxLength && (options.maxLength = 9)
    return new Promise(async (resolve, reject) => {
        // 基本入参验证
        if(!files.length) {
            resolve(print('至少上传一项', false))
            return
        }
        if(!options.baseUrl) {
            resolve(print('应用的基本请求地址未传-baseUrl', false))
            return
        }
        if(!options.uploadBaseUrl) {
            resolve(print('文件上传基本请求地址未传-uploadBaseUrl', false))
            return
        }
        if(!options.token) {
            resolve(print('token未传', false))
            return
        }
        if(files.length > options.maxLength) {
            resolve(print('超出最大上传个数-' + options.maxLength, false))
            return
        }
        const api1 = await p_fetch(`${options.baseUrl}/${options.tokenUrl}`, 'GET', {}, {
            Authorization: `Bearer ${options.token}`
        })
        if(api1.success) {
			if(_environ() === 'miniapp') {
				if(options.openCompress) {
					getCompressImage({files}, options, (newarr) => {
						console.log('newarr', newarr)
						uploadimg(api1, {files: newarr}, options, (arr, failData) => {
						    resolve(print(arr, true, {failData}))
						})
					})
				}else {
					uploadimg(api1, {files}, options, (arr, failData) => {
					    resolve(print(arr, true, {failData}))
					})
				}
			}else {
				uploadimg(api1, {files}, options, (arr, failData) => {
				    resolve(print(arr, true, {failData}))
				})
			}
        }
    })
}