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

/*
 *描述: 
 *作者: liuqing
 *参数: {}
 *Date: 2021-04-26 15:01:58
*/
export function _getDomain() {
    let url = window.location.href
    let domain = url.split("/")
    if (domain[2]) {
        if(domain[2].includes('.') && domain[2].split('.')[0]) {
            if(isNaN(domain[2].split('.')[0])) {
                domain = domain[2].split('.')[0]
            }else {
                domain = domain[2]
            }
        }
    } else {
        retdomain = ""
    }
    return domain
}