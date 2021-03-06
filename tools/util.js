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
    noDecode: 是否不解密url, 默认为false, 解密
 }
 *Date: 2021-04-26 14:32:10
*/
export function _query(paraName, noDecode) {
    let url = noDecode ? document.location.toString() :decodeURIComponent(document.location.toString())
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
     sex: 后端返回的表示性别的值
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
    format：返回的时间格式，默认'MM-DD' => 04-26, 还支持'MM-DD hh:mm' => 04-26 15:07  'YY-MM-DD hh:mm:ss' 'YY-MM-DD'  'MM-DD' 'hh:mm:ss' 'hh:mm'
        'y' => 2021     'm' => 04   'd' => 26   
        'week' => 1 (0 表示星期天， 1表示星期一，······)
 }
 *Date: 2021-04-26 15:07:04
*/
export function _format(time, format = 'MM-DD') {
    if (typeof time === 'number') {
        if (String(time).length === 10) {
            time = time * 1000
        }
    }
    time = time.toLocaleString().replace(/\-/g, '/')
    if (time.indexOf('下午') !== -1) {
        time = time.replace(/下午/g, ' ')
    }
    if (time.indexOf('上午') !== -1) {
        time = time.replace(/上午/g, ' ')
    }
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

    if (format === 'YY-MM-DD hh:mm:ss') {
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss
    } else if (format === 'YY-MM-DD hh:mm') {
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm
    } else if (format === 'MM-DD hh:mm') {
        return MM + '-' + DD + ' ' + hh + ':' + mm
    } else if (format === 'YY-MM-DD') {
        return YY + '-' + MM + '-' + DD
    } else if (format === 'MM-DD') {
        return MM + '-' + DD
    } else if (format === 'hh:mm:ss') {
        return hh + ':' + mm + ':' + ss
    } else if (format === 'hh:mm') {
        return hh + ':' + mm
    } else if (format === 'week') {
        return week
    }else if (format === 'y') {
        return YY
    } else if (format === 'm') {
        return MM
    } else if (format === 'd') {
        return DD
    }
}

/*
 *描述: json数组去重
 *作者: xiehuan, *1.2.9修改：刘清
 *参数: {
    arr: json Array
    key: 唯一的key名，根据此键名进行去重
 }
 *Date: 2021-04-26 15:13:05
*/
export function _unique(arr, key) {
    var result = [arr[0]]
    for(var i = 1; i < arr.length; i++){
        var item = arr[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
                repeat = true
            break;
        }
    }
    if (!repeat) {
      result.push(item)
    }
  }
  return result
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
    _url: 自定义href
 }
 *Date: 2021-04-28 15:11:03
*/
export function _urlDel(name, _url){
    let url = _url ? _url : window.location.href
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

/*
 *描述: 判断当前所处的环境
 *作者: liuqing
 *参数: {}
 *Date: 2021-05-13 09:22:43
*/
export function _environ() {
    if(window) {
        let ua = window.navigator.userAgent
        if (/miniProgram/i.test(ua)) {
            // 微信小程序
            return 'miniapp'
        } else if (/micromessenger/i.test(ua)) {
            // 微信
            return 'wx'
        } else if (/alipayclient/i.test(ua)) {
            // 支付宝
            return 'ali'
        } else {
            // 浏览器
            return 'browser'
        }
    }else {
        return 'miniapp'
    }
}