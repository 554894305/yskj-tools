/*
 *描述: 中国大陆姓名验证
 *作者: xiehuan
 *参数: {
    name: 用户输入的姓名
 }
 *Date: 2021-04-26 16:30:04
*/
export function v_name(name) {
    let regName = /^[\u4e00-\u9fa5]{2,6}$/
    if (!regName.test(name)) {
        return false
    }
    return true
}

/**
 * 
 */
/*
 *描述: 手机号码验证
 *作者: xiehuan
 *参数: {
    phoneInput: 用户输入的手机号码
 }
 *Date: 2021-04-26 16:27:43
*/
export function v_phone(phoneInput) {
    phoneInput = Number(phoneInput)
    let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    if (!myreg.test(phoneInput)) {
        return false
    } else {
        return true
    }
}

/*
 *描述: 身份证号码验证
 *作者: duqining
 *参数: {
    idCardNum(String || Number): 用户输入的身份证号码
 }
 *Date: 2021-05-17 10:24:42
*/
export function v_idCard(idCardNum) {
    let myreg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (!myreg.test(idCardNum)) {
        return false
    } else {
        return true
    }
}

/*
 *描述: 上传前校验文件是否合法
 *作者: xiehuan 修改者：刘清
 *参数: {
    file: file文件对象
    option: {
        type: 文件校验类型， 可选值：video，image，excel，word
        size: 大小 MB
    }
 }
 *Date: 2021-04-26 16:24:58
*/
export function v_file(file, option) {
    let Dsize = file.size / 1024 / 1024
    if (Dsize > option.size) {
        return false
    } else {
        switch (option.type) {
            case 'video':
                if (
                    !/(mp4|m3u8|rmvb|avi|suf|3gp|mkv|flv)/gi.test(file.name)
                ) {
                    return false
                } else {
                    return true
                }
            // break
            case 'image':
                if (!/(png|jpg|jpeg|gif|apng)/gi.test(file.name)) {
                    return false
                } else {
                    return true
                }
            // break
            case 'excel':
                if (!/(xls|xlsx)/gi.test(file.name)) {
                    return false
                } else {
                    return true
                }
            case 'word':
                if (!/(docx|doc)/gi.test(file.name)) {
                    return false
                } else {
                    return true
                }
            default:
                return true
        }
    }
}

/**
 * 表单校验(适用于async-validator的表单校验)
 * ruleName: 验证方法的名称， 如下
 *   name 姓名
 *   phone 手机号码
 *   idCard 身份证号码
 *   email 电子邮箱
 * 
 * 例如： rule: {
        ruleName: 'idCard',
        validator: proxy.verify,
        trigger: 'blur',
    },
*/
export function v_verifyForm (rule, value) {
    if (!rule.required) {
        if (!value) return Promise.resolve()
    }
    if (rule.ruleName === 'name') {
        // 姓名
        const regName = /^[\u4e00-\u9fa5]{2,6}$/
        if (!regName.test(value)) {
            return Promise.reject('请输入正确的姓名')
        } else {
            return Promise.resolve()
        }
    } else if (rule.ruleName === 'phone') {
        // 手机号码
        const regPhone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (!regPhone.test(value)) {
            return Promise.reject('请输入正确的手机号')
        } else {
            return Promise.resolve()
        }
    } else if (rule.ruleName === 'idCard') {
        // 身份证号码
        const regIdCard =
            /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (!regIdCard.test(value)) {
            return Promise.reject('请输入正确的身份证号码')
        } else {
            return Promise.resolve()
        }
    } else if (rule.ruleName === 'email') {
        // 电子邮箱
        const regEmail =
            /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!regEmail.test(value)) {
            return Promise.reject('请输入正确的电子邮箱')
        } else {
            return Promise.resolve()
        }
    }
}
