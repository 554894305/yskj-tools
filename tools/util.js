/**
 * 数据节流
 */
let enterTime = 0
export function _throttle(fn, interval) {
    let gapTime = interval || 300
    return function() {
        let context = this
        let backTime = new Date()
        if (backTime - enterTime > gapTime) {
            fn.call(context, arguments)
            enterTime = backTime
        }
    }
}

/**
 * 数据防抖
 */
 let timer
 export function _debounce(fn, interval) {
     let gapTime = interval || 800
     clearTimeout(timer)
     timer = setTimeout(function() {
         fn()
     }, gapTime)
 }

 /**
  * 截取字符串
  */
export function _query(paraName) {
    let url = decodeURIComponent(document.location.toString())
    let arrObj = url.split('?')
    if (arrObj.length > 2) {
        for (let x = 1; x < arrObj.length; x++) {
            let arrPara = arrObj[x].split('&')
            let arr
            for (let i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split('=')
                if (arr != null && arr[0] == paraName) {
                    return arr[1]
                }
            }
        }
        return ''
    } else if (arrObj.length > 1) {
        let arrPara = arrObj[1].split('&')
        let arr
        for (let x = 0; x < arrPara.length; x++) {
            arr = arrPara[x].split('=')
            if (arr != null && arr[0] == paraName) {
                return arr[1]
            }
        }
        return ''
    } else {
        return ''
    }
}

/** 
 * 性别映射
 */
export function _sex(str) {
    if (typeof str === 'string') {
        return str === 'female' ? '女' : str === 'male' ? '男' : '--'
    } else if (typeof str === 'number') {
        return str === 0 ? '女' : str === 1 ? '男' : '--'
    }
}

/**
 * 生成大位随机数
 */
export function _random(num = 9) {
    return Math.floor(Math.random() * Math.pow(10, num-1) + Math.pow(10, num-1))
}

/**
 * 时间格式化 
 * format: 默认值为 'MM-DD'，返回值例如：04-25；
 *         'MM-DD hh:mm' => 04-25 17:43
 *         'week' => 0 (周日)
 */
 export function _formattingTime(time, format = 'MM-DD') {
    let date = new Date(time)
    var YY = date.getFullYear() //获取当前年份
    var MM = date.getMonth() + 1 //获取当前月份
    var DD = date.getDate() //获取当前日
    var hh = date.getHours() //获取小时
    var mm = date.getMinutes() //获取分钟
    var ss = date.getSeconds() //获取秒
    var week = date.getDay() //获取星期几

    MM = MM < 10 ? '0' + MM : MM
    DD = DD < 10 ? '0' + DD : DD
    hh = hh < 10 ? '0' + hh : hh
    mm = mm < 10 ? '0' + mm : mm
    ss = ss < 10 ? '0' + ss : ss

    if (format === 'MM-DD hh:mm') {
        return MM + '-' + DD + ' ' + hh + ':' + mm
    } else if (format === 'MM-DD') {
        return MM + '-' + DD
    } else if (format === 'week') {
        return week
    }
}

/**
 * 数组去重
 */
export function _unique(data) {
    let arr = new Set(data)
    return [...arr]
}

/**
 * 人名姓名验证
 */
export function _isName(name) {
    let regName = /^[\u4e00-\u9fa5]{2,6}$/
    if (!regName.test(name)) {
        return false
    }
    return true
}

/**
 * 手机号码验证
 */
export function isPhoneAvailable(phoneInput) {
    phoneInput = Number(phoneInput)
    let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    if (!myreg.test(phoneInput)) {
        return false
    } else {
        return true
    }
}

/**
 * 上传前校验文件是否合法
 * param1: file文件对象
 * param2: 当前校验的对象（video， image）
 * param3: filesize默认大小为10，单位为'MB'，目前支持的单位有'KB', 'MB', 'GB'
 */
export function _checkFile(file, str, filesize = { size: 10, units: 'MB' }) {
    let Dsize

    if (filesize.units === 'MB') {
        Dsize = file.size / 1024 / 1024
    } else if (filesize.units === 'GB') {
        Dsize = file.size / 1024 / 1024 / 1024
    } else if (filesize.units === 'KB') {
        Dsize = file.size / 1024
    }

    if (Dsize > filesize.size) {
        return {
            message: `上传的文件的大小不能超过${filesize.size + filesize.units}`,
            type: 'error',
            isSize: false // 上传文件的大小超出了限定大小
        }
    } else {
        switch (str) {
            case 'video':
                if (
                    !/(mp4|m3u8|rmvb|avi|suf|3gp|mkv|flv)/gi.test(file.name)
                ) {
                    return {
                        message: '您上传的文件类型不正确，请上传视频文件',
                        type: 'error',
                        isSize: true // 上传文件的大小没有超出限定大小
                    }
                } else {
                    return {
                        message: 'ok',
                        type: 'success',
                        isSize: true // 上传文件的大小没有超出限定大小
                    }
                }
            // break
            case 'image':
                if (!/(png|jpg|jpeg|gif|apng)/gi.test(file.name)) {
                    return {
                        message: '请上传png|jpg|jpeg|gif|apng格式的图片',
                        type: 'error',
                        isSize: true // 上传文件的大小没有超出限定大小
                    }
                } else {
                    return {
                        message: 'ok',
                        type: 'success',
                        isSize: true // 上传文件的大小没有超出限定大小
                    }
                }
            // break
            case 'excel':
                if (!/(xls|xlsx)/gi.test(file.name)) {
                    return {
                        message: '您上传的文件类型不正确，请上传excel文件',
                        type: 'error',
                        isSize: true // 上传文件的大小没有超出限定大小
                    } 
                } else {
                    return {
                        message: 'ok',
                        type: 'success',
                        isSize: true // 上传文件的大小没有超出限定大小
                    }
                }
            case 'word':
                if (!/(docx|doc)/gi.test(file.name)) {
                    return {
                        message: '您上传的文件类型不正确，请上传word文件',
                        type: 'error',
                        isSize: true // 上传文件的大小没有超出限定大小
                    } 
                } else {
                    return {
                        message: 'ok',
                        type: 'success',
                        isSize: true // 上传文件的大小没有超出限定大小
                    }
                }
        }
    }
}
