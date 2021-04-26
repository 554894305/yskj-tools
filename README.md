#### 写在前面的话

#### _query
    功能：截取字符串
    参数：URL参数的键名
    用法：例如当前URL为 'https://www.yuansu.com/?id=123&name=xh/?cateId=456&msg=good'
```
_query('id') // 123
_query('name') // xh
_query('cateId') // 456
_query('msg') // good
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

#### _unique
    功能：数组去重
    参数：一个数组
    用法：如下
```
_unique([1,2,3,3,4,4,5]) // [1,2,3,4,5]
```