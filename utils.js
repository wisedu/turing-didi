import axios from 'axios'
// import api from './api'

const UA = navigator.userAgent.toLowerCase()

function serialize(data) {
    if (!data) return '';
    var pairs = [],
        value;
    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue;
        if (typeof data[name] === 'function') continue;
        if (data[name] === undefined) continue;
        if (data[name] === null) {
            value = '';
        } else {
            value = data[name].toString();
        }
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        pairs.push(name + '=' + value);
    }
    if (pairs.length) {
        return pairs.join('&');
    } else {
        return '';
    }
}

// function getApi (name) {
//   return api[name] || name
// }
let utils = {
    axios: axios
};

/**
 * @method Post
 * @description post请求
 * @param {String} url - 请求地址，可以是api中定义的名称，或者具体的url地址
 * @param {Object} data - 请求参数
 * @param {*} config - 请求配置，详见axios文档 [https://github.com/mzabriskie/axios]
 */
utils.Post = (url, data = null, config = {}) => {
    return axios({
        method: 'post',
        url: url,
        data: serialize(data),
        withCredentials: true,
        headers: {
            contentType: "application/json"
        },
        ...config
        // adapter: config.mockFlag ? () => MOCK_DATA[config.mock] : null
    })
}

/**
 * @method Get
 * @description get请求, 判断运行环境为今日校园时，使用原生壳子提供的get方法（此方法可以解决跨域问题）；若运行环境不是今日校园，则使用axios的get请求方法
 * @param {String} url - 请求地址，可以是api中定义的名称，或者具体的url地址
 * @param {Object} data - 请求参数
 * @param {*} config - 运行环境是今日校园时，此参数为header参数；运行环境不是今日校园时，此参数为请求配置，详见axios文档 [https://github.com/mzabriskie/axios]；
 */
utils.Get = (url, data = null, config = {}) => {
    //   使用今日校园壳子的ajax，在特定的版本再开启，如公有云跨域版本
    // if (/wisedu/.test(UA)) {
    //     // 今日校园 原生壳子 get方法
    //     let requestUrl = url + serialize(data)
    //     return new Promise((resolve, reject) => {
    //         SDK.bh.http.sendGetRequest(requestUrl, (response) => {
    //             if (response.code !== 200) {
    //                 reject(response)
    //             }
    //             resolve({
    //                 data: JSON.parse(response.data)
    //             })
    //         }, config)
    //     })
    // } else {
    return axios({
        method: 'get',
        url: url,
        params: data,
        ...config
    })
    // }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
utils.formatDate = (date, fmt) => {
    if (date && date.getFullYear) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    return '';
}

//根据字符串和格式返回Date对象
//例子：
//parseDate('2017-10-30','yyyy-MM-dd')
utils.parseDate = (str, fmt) => {
    let now = new Date();
    if (str && fmt) {
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDate();
        let o = [
            "y", //年
            "M", //月份
            "d", //日
            "H", //小时
            "m", //分
            "s", //秒
            "S" //毫秒
        ];
        let dates = [year, month, day];
        let times = [];
        o.forEach(function(f) {
            let start = fmt.indexOf(f);
            if (start > -1) {
                let end = fmt.lastIndexOf(f) + 1;
                let val = str.substring(start, end) * 1;
                if (Number.isFinite(val)) {
                    switch (f) {
                        case 'y':
                            dates[0] = val;
                            break;
                        case 'M':
                            dates[1] = val - 1;
                            break;
                        case 'd':
                            dates[2] = val;
                            break;
                        default:
                            times.push({
                                name: f,
                                value: val
                            });
                            break;
                    }
                }
            }
        });
        let date = new Date(...dates);
        times.forEach(function(item) {
            let val = item.value;
            switch (item.name) {
                case 'H':
                    date.setHours(val);
                    break;
                case 'm':
                    date.setMinutes(val);
                    break;
                case 's':
                    date.setSeconds(val);
                    break;
                case 'S':
                    date.setMilliseconds(val);
                    break;
                default:
                    break;
            }
        });
        return date;
    }
    return now;
}

utils.getJsSDK = () => {
    debugger
    if (window.BH_MIXIN_SDK) {
        return window.BH_MIXIN_SDK;
    }
    //产品线说是用变量为SDK，当页面在iframe中，SDK为父页面的SDK，此时不存在BH_MIXIN_SDK
    if (window.SDK) {
        return window.SDK;
    }
}

export default utils;