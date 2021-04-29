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

/*
 *描述: 截取字符串
 *作者: xiehuan
 *参数: {
    paraName：URL参数的键名
 }
 *Date: 2021-04-26 14:32:10
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
/*
 *描述: 生成大位随机数
 *作者: xiehuan
 *参数: {
     num: 大于 1 的整数，需要几位数的随机数就传入几，默认为 9 位
 }
 *Date: 2021-04-26 15:02:46
*/
export function _random(num = 9) {
    return Math.floor(Math.random() * Math.pow(10, num-1) + Math.pow(10, num-1))
}

/*
 *描述: 性别映射
 *作者: xiehuan
 *参数: {
     sex: 后端返回的值
 }
 *Date: 2021-04-29 15:13:49
*/
export function _sex(sex) {
    if (typeof sex === 'string') {
        return sex === 'female' ? '女' : sex === 'male' ? '男' : sex === 'unknown' ? '未知' : '请传入 male 或 female 或 unknown'
    } else if (typeof sex === 'number') {
        return sex === 0 ? '男' : sex === 1 ? '女' : sex === 5 ? '未知' : '请传入 0 或 1 或 5'
    }
}

/*
 *描述: 时间格式化
 *作者: xiehuan
 *参数: {
    time: 需要被格式化的时间
    format：返回的时间格式，默认'MM-DD' => 04-26, 还支持'MM-DD hh:mm' => 04-26 15:07   'week' => 1 (0 表示星期天， 1表示星期一，······)
 }
 *Date: 2021-04-26 15:07:04
*/
export function _format(time, format = 'MM-DD') {
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

/*
 *描述: 数组去重
 *作者: xiehuan
 *参数: {
    arr: 一个数组
 }
 *Date: 2021-04-26 15:13:05
*/
export function _unique(arr) {
    return [...new Set(arr)]
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

/*
 *描述: 去掉Url中的某个参数
 *作者: liuqing
 *参数: {
    name: 需要截取掉的字段名 
 }
 *Date: 2021-04-28 15:11:03
*/
export function _urlDel(name){
    let url = window.location.href
    let urlArr = url.split('?')
    if(urlArr.length > 1 && urlArr[1].indexOf(name) > -1){
        let query = urlArr[1]
        let obj = {}
        let arr = query.split("&");
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=")
            obj[arr[i][0]] = arr[i][1]
        };
        delete obj[name];
        let urlte = urlArr[0] +'?'+ JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&")
        if(!urlte.split('?')[1]) {
            urlte =  urlte.split('?')[0]
        }
        return urlte
    }else{
        return url
    }
}