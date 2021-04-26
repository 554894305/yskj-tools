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
