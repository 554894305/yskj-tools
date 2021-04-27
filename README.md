#### 基础工具类方法
| 方法名|参数说明|参数类型|是否必传|默认值|方法说明|
|-|:-:|:-:|:-:|:-:|:-:|
| _query(param1)|url的键| String | 是 | '' | 截取URL参数值
| _random(param1)|需要生成的随机数位数| Number | 否 | 9 | 生成大位随机数
| _format(param1, param2)|param1: 需要被格式化的时间格式</br>param2: 返回的时间格式| String | 是 | '' | [时间格式化](#format)

#### _format
    功能：时间格式化
    参数：{
        time: 需要被格式化的时间(支持格式为 时间戳和'2021-04-26 16:00:00', '2021/04/26 16:00:00')
        format：返回的时间格式，默认'MM-DD' => 04-26, 还支持'MM-DD hh:mm' => 04-26 15:07   'week' => 1 (0 表示星期天， 1表示星期一，······)
    }
    用法：如下
```js
_formattingTime('2021-4-26') // 04-26
_formattingTime('2021-4-26 14:59:32', 'MM-DD hh:mm') // 04-26 14:59
_formattingTime(1619424033104, 'MM-DD hh:mm') // (1619424033104为时间戳) 04-26 16:01
_formattingTime(1619424033104, 'week') // 1
```

#### _unique
    功能：数组去重
    参数：一个数组
    用法：如下
```js
_unique([1,2,3,3,4,4,5]) // [1,2,3,4,5]
```

#### v_name
    功能：中国大陆姓名验证
    参数：用户输入的姓名
    用法：如下
```js
v_name('刘德华') // true
v_name('周杰伦') // true
v_name('123') // false
v_name('james') // false
```

#### v_phone
    功能：手机号码验证
    参数：用户输入的手机号码
    用法：如下
```js
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
```js
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


##### <a name="format">时间格式化<a>
    功能：时间格式化
    参数：{
        time: 需要被格式化的时间(支持格式为 时间戳和'2021-04-26 16:00:00', '2021/04/26 16:00:00')
        format：返回的时间格式，默认'MM-DD' => 04-26, 还支持'MM-DD hh:mm' => 04-26 15:07   'week' => 1 (0 表示星期天， 1表示星期一，······)
    }
    用法：如下
```js
_format('2021-4-26') // 04-26
_format('2021-4-26 14:59:32', 'MM-DD hh:mm') // 04-26 14:59
_format(1619424033104, 'MM-DD hh:mm') // (1619424033104为时间戳) 04-26 16:01
_format(1619424033104, 'week') // 1
```