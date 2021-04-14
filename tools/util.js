export function _gotos(url, str) {
    if(!str) str = 'page'
    if(str == 'page') {
        uni.navigateTo({
            url
        })
    }
    if(str == 'tab') {
        uni.switchTab({
            url
        })
    }
    if(str == 'redirect') {
        uni.redirectTo({
           url
        })
    }
}
/**
 * 返回星期
 */
 export function _forWeek(week, str) {
    if(!str) {
        str = '周'
    }
    let arr = [{
        key: 1,
        label: '一'
    },{
        key: 2,
        label: '二'
    },{
        key: 3,
        label: '三'
    },{
        key: 4,
        label: '四'
    },{
        key: 5,
        label: '五'
    },{
        key: 6,
        label: '六'
    },{
        key: 7,
        label: '日'
    }]
    let result = ''
    if(week) {
        arr.map((item) => {
            if(item.key === Number(week)) {
                result = str +  item.label
            }
        })
        return result
    }else {
        return ''
    }
}