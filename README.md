#### 最新版本 V1.2.30
 
###### 更新说明(V1.2.x)
    新增_environ(判断当前所处的环境)基础函数
    新增p_uploadFile(上传文件)
    新增v_idCard（身份证校验）方法
    扩展_format兼容性
    新增p_uploadFile图片压缩功能
    修改p_uploadFile图片压缩改为前端处理
    优化p_initVue方法，支持直接获取用户信息
    修复p_uploadFile方法多文件上传不能正确获取length问题。*1.2.5
    修复v_idCard方法bug，兼容身份证号码中有X的情况。 *1.2.6
    新增p_uploadFile返回解密过后的字段名 *1.2.8
    修改_unique方法为：json数组去重 *1.2.9
    修改p_uploadFile多文件上传bug *1.2.10
    修复print返回bug *1.2.12
    修复p_uploadFile方法bug *1.2.13
    p_uploadFile方法支持base64上传文件 *1.2.14
    新增文件解密方法p_decryUrl *1.2.15
    文件解密方法p_decryUrl新增支持：字符串，数据，json数组格式 *1.2.17
    文件上传统一替换 *1.2.20
    修改_query方法，添加参数 *1.2.21
    加密转解密方法p_decryUrl新增加密接口的传入 *1.2.22
    解决加密转解密方法p_decryUrl bug *1.2.23
    _urlDel兼容自带传入url *1.2.24
    迁入仓库至gitee *1.2.27
    p_uploadFile方法返回参数新增原始对象 *1.2.29
    p_uploadFile方法新增文件校验字段 *1.2.30
    新增v_verifyForm表单校验 *1.2.30

###### 更新说明(V1.1.0)
    1. 由于vue-cli2不支持扩展运算符的第三方库，修改export方式

### 快捷使用
```
将方法全部注册到vue的原型链上，之后可以使用this来调用

import tools from 'yskj-tools'
for (const keys of Object.keys(tools)) {
    Vue.prototype[keys] = tools[keys]
}
```
#### 基础工具类方法
| 方法名|方法说明|
|-|:-:|
| _query| [截取URL参数值](#query)
| _random| 生成大位随机数
| _format| [时间格式化](#format)
| _unique| [JSON数组去重](#unique)
| _urlDel| 去掉Url中的某个参数,参数为需要去除掉的key
| _sex| [性别映射](#sex)
| _environ| [判断当前所处的环境](#environ)

#### 异步工具类方法
| 方法名|方法说明|
|-|:-:|
| p_tenantId| [获取租户Id](#tenant)
| p_encryToken| [token加密](#encry)
| p_decryToken| token解密
| p_initVue| [智慧校园子系统初始化Vue之前的操作](#initVue)
| p_uploadFile| [文件上传](#uploadFile)
| p_decryUrl| [文件加密转解密](#decryUrl)

#### 表单验证类方法
| 方法名|方法说明|
|-|:-:|
| v_name| [中国大陆姓名验证](#name)
| v_phone| [手机号码验证](#phone)
| v_file| [表单验证](#file)
| v_idCard| [身份证验证](#idCard)

##### <a name="query">截取URL参数值<a>
    功能：截取URL参数值
    参数：{
        paraName：URL参数的键名
        noDecode: 是否不解密url, 默认为false, 解密
    }
    用法：如下
```js
let url = 'xxx?name=张三'
_query('name') // 张三
_query('name', true) // %E5%88%98%E6%B8%85
```
##### <a name="format">时间格式化<a>
    功能：时间格式化
    参数：{
        time: 需要被格式化的时间(支持格式为 时间戳和'2021-04-26 16:00:00', '2021/04/26 16:00:00')
        format：返回的时间格式，默认'MM-DD' => 04-26, 还支持'MM-DD hh:mm' => 04-26 15:07  'YY-MM-DD hh:mm:ss' 'YY-MM-DD'  'MM-DD' 'hh:mm:ss' 'hh:mm'
        'y' => 2021     'm' => 04   'd' => 26   
        'week' => 1 (0 表示星期天， 1表示星期一，······)
    }
    用法：如下
```js
_format('2021-4-26') // 04-26
_format('2021-4-26 14:59:32', 'MM-DD hh:mm') // 04-26 14:59
_format(1619424033104, 'MM-DD hh:mm') // (1619424033104为时间戳) 04-26 16:01
_format(1619424033104, 'week') // 1
_format(new Date(), 'y') // 2021
_format(new Date(), 'm') // 04
_format(new Date(), 'd') // 26
```
##### <a name="unique">json数组去重</a>
    功能：json数组去重
    参数： {
        arr: json Array
        key: 唯一的key名，根据此键名进行去重
    }
    用法：如下
```js
var arr = [{id: 1, name: '11'}, {id: 1, name: '22'}]
_unique(arr, 'id') // [{id: 1, name: '11'}]
```

##### <a name="name">中国大陆姓名验证</a>
    功能：中国大陆姓名验证
    参数：用户输入的姓名
    用法：如下
```js
v_name('刘德华') // true
v_name('周杰伦') // true
v_name('123') // false
v_name('james') // false
```

##### <a name="phone">手机号码验证</a>
    功能：手机号码验证
    参数：用户输入的手机号码
    用法：如下
```js
v_phone(13188808452) // true
v_phone(11188888888) // false
v_phone(1772645777) // false
```

##### <a name="file">文件校验</a>
    功能：上传前校验文件是否合法
    参数：{
        file: file文件对象
        option: {
            type: 文件校验类型， 可选值：video，image，excel，word
            size: 大小 MB
        }
    }
    用法：如下
```js

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

##### <a name="tenant">获取租户Id</a>
```
参数: {
    logo: 租户标识，默认's_gtn'
    baseUrl: 基础请求地址
    url: 接口地址, 默认不传递
}

p_tenantId({
    baseUrl: 'xxxx',
    url: 'xxxx'
}).then((res) => {}).catch((err) => {})
```

##### <a name="encry">token加/解密</a>
```
参数: {
    baseUrl: 基础请求地址
    url: token加/解密接口, 默认不传递，
    token: 用户令牌，不加Bearer
}

p_encryToken({
    baseUrl: 'xxxx',
    token: 'xxxx'
}).then((res) => {}).catch((err) => {})
```

##### <a name="initVue">智慧校园子系统统一初始化前的操作</a>
```
参数: {
    baseUrl（*String）: 基础请求地址，
    url（String）: token加/解密接口, 默认不传递，
    token（*String）: 用户加密令牌，
    getInfo（Boolean），是否获取用户信息，默认为false
    infoUrl（String）：用户信息接口地址，有默认值
}

p_initVue({
    baseUrl: 'xxxx',
    token: 'xxxx'
}).then((res) => {}).catch((err) => {})
```

##### <a name="sex">性别映射</a>
```
参数: {
    sex: 后端返回的表示性别的值
}

_sex(0) // 男
_sex(1) // 女
_sex(5) // 未知
_sex('female') // 女
_sex('male') // 男
_sex('unknown') // 未知
```

##### <a name="environ">判断当前所处的环境</a>
```
    返回值为：{
        miniapp： 微信小程序中，
        wx: 微信浏览器中
        ali: 支付宝浏览器中
        browser： 普通浏览器
    }
```

##### <a name="uploadFile">文件上传</a>
```
支持：
    1. 多文件上传 
    2. 图片压缩功能 ^1.2.1 注：小程序压缩请使用wx.chooseImage自带的压缩功能
    3. 小程序，Web通用

参数: {
    files(Array): 图片集合(小程序是本地图片路径集合，Web是file对象集合)
    options(obj): {
        fileType(String): 文件类型，可选值：base64、file(默认)
        token(*String)
        width(Number): 开启图片压缩时传递，压缩的图片宽度，默认值：500
        baseUrl(*String): 应用的基本地址    注意：不要以斜杠开头结尾！！！
        uploadBaseUrl(*String)：上传的api基本地址     注意：不要以斜杠开头！！！
        uploadUrl(String)：上传的api地址，      注意：不要以斜杠开头！！！
                * 当文件类型为file时，默认为：'alpha/get_upload_url.do'，需要先调用此接口获取上传的临时地址
                * 当文件类型为base64时，地址为： 'alpha/upload_base64_file.do'
				* 小程序上传，默认地址为: 'alpha/get_upload_url_post.do'，需要先调用此接口获取上传的临时地址
        decryUrl(String): 加密转解密接口，默认为：'alpha/get_file_url_key.do'      注意：不要以斜杠开头！！！
        tokenUrl(String): 上传前的token转换接口，默认为：'base/api/file/token'      注意：不要以斜杠开头！！！
        maxLength(Number): 最大上传文件个数，默认为9
        openCompress(Boolean): 文件上传前是否开启压缩功能，默认为false
        filePath(String): 保存的文件名或者相对文件路径（不传时由服务器自动生成文件路径）
        temp(Boolean)： 是否临时文件，默认为false，当为true时返回的地址以“/temp”开头。当filePath不为空时，此字段无效
    }
}

p_uploadFile([],{}).then((res) => {}).catch((err) => {})
```

##### <a name="decryUrl">文件加密转解密</a>
```
参数: {
    decryData: 加密字符串/数组/json数组
    options{
        key:(String): 加密字段的key值，如果是json数组，则key为必传项
        token(*String)
        baseUrl(*String): 应用的基本地址    注意：不要以斜杠开头！！！
        uploadBaseUrl(*String)：上传的api基本地址     注意：不要以斜杠开头！！！
        decryUrl(String): 加密转解密接口，默认为：'alpha/get_file_url_key.do'      注意：不要以斜杠开头！！！
        tokenUrl(String): 上传前的token转换接口，默认为：'base/api/file/token'      注意：不要以斜杠开头！！！
    }
}

p_decryUrl(decryData,{
    xxx: xx
}).then((res) => {})
```