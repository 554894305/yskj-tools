#### 写在前面的话

#### _query
    功能：截取字符串
    参数：URL参数的键名
    用法：例如当前URL为 'https://www.yuansu.com/?id=123&name=xh'
```
_query('id') // 123
_query('name') // xh
```

#### _sex
    功能：性别映射
    参数：后端返回的表示性别的值
    用法：如下
```
_sex(0) // 女
_sex(1) // 男
_sex('female') // 女
_sex('male') // 男
```

#### _random
    功能：生成大位随机数
    参数：大于 1 的整数，需要几位数的随机数就传入几，默认为 9 位
    用法：如下
```
_random() // 170887923
_random(10) // 1213178809
```

#### _formattingTime
    功能：时间格式化
    参数：{
        time: 需要被格式化的时间(支持格式为 时间戳和'2021-04-26 16:00:00', '2021/04/26 16:00:00')
        format：返回的时间格式，默认'MM-DD' => 04-26, 还支持'MM-DD hh:mm' => 04-26 15:07   'week' => 1 (0 表示星期天， 1表示星期一，······)
    }
    用法：如下
```
_formattingTime('2021-4-26') // 04-26
_formattingTime('2021-4-26 14:59:32', 'MM-DD hh:mm') // 04-26 14:59
_formattingTime(1619424033104, 'MM-DD hh:mm') // (1619424033104为时间戳) 04-26 16:01
_formattingTime(1619424033104, 'week') // 1
```

#### _unique
    功能：数组去重
    参数：一个数组
    用法：如下
```
_unique([1,2,3,3,4,4,5]) // [1,2,3,4,5]
```

#### v_name
    功能：中国大陆姓名验证
    参数：用户输入的姓名
    用法：如下
```
v_name('刘德华') // true
v_name('周杰伦') // true
v_name('123') // false
v_name('james') // false
```

#### v_phone
    功能：手机号码验证
    参数：用户输入的手机号码
    用法：如下
```
v_phone(13188808452) // true
v_phone(11188888888) // false
v_phone(1772645777) // false
```

#### v_file
    功能：上传前校验文件是否合法
    参数：{
        file: file文件对象
        str: 当前校验的对象（video，image，word, excel）
        filesize: 自定义最大上传容量，filesize默认大小为10，单位为'MB'，目前支持的单位有'KB', 'MB', 'GB'
    }
    用法：如下
```
v_file(file, 'image', { size: 10, units: 'MB' })

// 如果上传的文件类型正确，没有超出最大上传容量，则返回：
{
    message: 'ok',
    type: 'success',
    isSize: true // 上传文件的大小没有超出限定大小
}

// 如果上传的文件超出最大上传容量，则返回：
{
    message: `上传的文件的大小不能超过${filesize.size + filesize.units}`,
    type: 'error',
    isSize: false // 上传文件的大小超出了限定大小
}
```