import Utils from '../utils.js';

export { Utils };

export const parseParam = function(JSONParam) {
    if (JSONParam) {
        if (typeof JSONParam === 'string') {
            try {
                return JSON.parse(JSONParam.replace(/'/g, '"'));
            } catch (e) {
                return {};
            }
        }
        if (typeof JSONParam === 'object') {
            return JSONParam;
        }
    }
    return {};
};

export const debounce = function(action, duration) {
    var timer = null;
    return function() {
        var ctx = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            action.apply(ctx, args);
        }, duration);
    };
};

export const queryDic = function(uri, param) {
    return queryData(uri, param);
};

export const queryData = function(uri, param) {
    MINT.Indicator.open();
    return Utils.Get(uri, param).then(({ data }) => {
        MINT.Indicator.close();
        if (data.code === '0') {
            if (data.datas) {
                return Object.values(data.datas)[0].rows;
            }
        }
        return [];
    }, function() {
        MINT.Indicator.close();
    });
};

/**
 * @method toDateStp
 * @description 日期格式转化成时间戳
 * @example 
 * toDateStp('2017-01-22');
 * // 返回 1485072901
 */
let toDateStp = function(str, fmt = 'yyyy-MM-dd HH:mm:ss') {
    return +Utils.parseDate(str, fmt);
};


/**
 * @description 校验规则库, 配合校验组件使用，emap开发时，可以将规则名称配置在模型配置的【校验类型】一项中，
 *  非emap开发时， 将规则名称配置在字段meta信息的checkType属性上
 * @prop {Object} required - 必填校验
 * @prop {Object} double - 小数
 * @prop {Object} tele/tel - 电话号码
 * @prop {Object} phone - 手机号
 * @prop {Object} email/mail - 邮箱
 * @prop {Object} integer - 整数
 * @prop {Object} integer+0 - 非负整数
 * @prop {Object} integer+ - 正整数
 * @prop {Object} money - 金额数
 * @prop {Object} score - 分数
 * @prop {Object} number - 数字
 * @prop {Object} date - 日期 YYYY-MM-DD
 * @prop {Object} ipv4 - ip地址
 * @prop {Object} url - url地址
 * @prop {Object} onlyNumberSp - 只能填写数字
 * @prop {Object} onlyLetterSp - 只能填写英文字母
 * @prop {Object} onlyLetterNumber - 只能填写数字与英文字母
 * @prop {Object} chinese - 只能填写中文汉字
 * @prop {Object} chinaId - 身份证号
 * @prop {Object} chinaIdLoose - 身份证号宽松匹配
 * @prop {Object} chinaZip - 中国邮编
 * @prop {Object} qq - qq
 * @prop {Object} maxLength - 长度校验
 * @prop {Object} before - 日期早于联动字段，联动校验配置示例 before@CSRQ，其中CSRQ为联动字段的name
 * @prop {Object} before= - 日期早于等于联动字段，联动校验配置示例 before=@CSRQ，其中CSRQ为联动字段的name
 * @prop {Object} after - 日期晚于联动字段，联动校验配置示例 after@CSRQ，其中CSRQ为联动字段的name
 * @prop {Object} after= - 日期晚于等于联动字段，联动校验配置示例 after=@CSRQ，其中CSRQ为联动字段的name
 */
let validateRules = {
    "required": {
        "func": function(value) {
            return value !== undefined && value.toString().trim() !== '';
        },
        "alertText": '不能为空'
    },
    "double": {
        "regex": /^(\-)?\d+(\.\d+)?$/,
        "alertText": '无效的数字格式'
    },
    // "dateRange": {
    //  "regex": "none",
    //  "alertText": "* 无效的 ",
    //  "alertText2": " 日期范围"
    // },
    // "dateTimeRange": {
    //  "regex": "none",
    //  "alertText": "* 无效的 ",
    //  "alertText2": " 时间范围"
    // },
    "minSize": {
        "regex": "none",
        "alertText": '最少*个字符'
    },
    "maxSize": {
        "regex": "none",
        "alertText": '最多*个字符'
    },
    // "groupRequired": {
    //  "regex": "none",
    //  "alertText": "* 至少填写其中一项"
    // },
    "min": {
        "regex": "none",
        "alertText": '最小值为*'
    },
    "max": {
        "regex": "none",
        "alertText": '最大值为*'
    },
    "tele": {
        "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
        "alertText": '无效的电话号码'
    },
    "tel": {
        "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
        "alertText": '无效的电话号码'
    },
    "phone": {
        // credit:jquery.h5validate.js / orefalo
        "regex": /^(0|86|17951)?(1[1-9][0-9]{1,3})[0-9]{8}$/,
        "alertText": '无效的手机号码'
    },
    "email": {
        // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
        "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
        "alertText": '无效的邮件地址'
    },
    "mail": {
        // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
        "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
        "alertText": '无效的邮件地址'
    },
    "integer": {
        "regex": /^[\-\+]?\d+$/,
        "alertText": '只能填写整数'
    },
    "integer+0": {
        "regex": /^\d+$/,
        "alertText": '只能填写非负整数'
    },
    "integer+": {
        "regex": /^[1-9](\d+)?$/,
        "alertText": '只能填大于零的整数'
    },
    "money": {
        "regex": /^\d+(\.\d{1,2})?$/,
        "alertText": '无效的金额'
    },
    //qiyu 2016-9-1 XQGL-25
    "score": {
        "regex": /^\d+(\.\d{1,2})?$/,
        "alertText": '无效的分数'
    },
    "number": {
        // Number, including positive, negative, and floating decimal. credit:orefalo
        "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
        "alertText": '只能填写数字'
    },
    "date": {
        "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
        "alertText": '无效的日期，格式必需为 YYYY-MM-DD'
    },
    "ipv4": {
        "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
        "alertText": '无效的 IP 地址'
    },
    "url": {
        "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
        "alertText": '无效的网址'
    },
    "onlyNumberSp": {
        "regex": /^[0-9\ ]+$/,
        "alertText": '只能填写数字'
    },
    "onlyLetterSp": {
        "regex": /^[a-zA-Z\ \']+$/,
        "alertText": '只能填写英文字母'
    },
    "onlyLetterNumber": {
        "regex": /^[0-9a-zA-Z]+$/,
        "alertText": '只能填写数字与英文字母'
    },
    //tls warning:homegrown not fielded
    "dateFormat": {
        "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
        "alertText": '无效的日期格式'
    },
    //tls warning:homegrown not fielded
    "dateTimeFormat": {
        "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
        "alertText": '无效的日期或时间格式，可接受的格式：* mm/dd/yyyy hh:mm:ss AM|PM 或  *yyyy-mm-dd hh:mm:ss AM|PM'
    },

    /**
     * 正则验证规则补充
     * Author: ciaoca@gmail.com
     * Date: 2013-10-12
     */
    "chinese": {
        "regex": /^[\u4E00-\u9FA5]+$/,
        "alertText": '只能填写中文汉字'
    },
    "chinaId": {
        /**
         * 2013年1月1日起第一代身份证已停用，此处仅验证 18 位的身份证号码
         * 如需兼容 15 位的身份证号码，请使用宽松的 chinaIdLoose 规则
         * /^[1-9]\d{5}[1-9]\d{3}(
         *    (
         *        (0[13578]|1[02])
         *        (0[1-9]|[12]\d|3[01])
         *    )|(
         *        (0[469]|11)
         *        (0[1-9]|[12]\d|30)
         *    )|(
         *        02
         *        (0[1-9]|[12]\d)
         *    )
         * )(\d{4}|\d{3}[xX])$/i
         */
        "regex": /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
        "alertText": '无效的身份证号码'
    },
    "chinaIdLoose": {
        "regex": /^(\d{18}|\d{15}|\d{17}[xX])$/,
        "alertText": '无效的身份证号码'
    },
    "chinaZip": {
        "regex": /^\d{6}$/,
        "alertText": '无效的邮政编码'
    },
    "qq": {
        "regex": /^[1-9]\d{4,10}$/,
        "alertText": '无效的 QQ 号码'
    },
    "maxLength": {
        func: function(val, max) {
            var len = 0;
            for (var index = 0; index < val.length; index++) {
                if (val[index].match(/[^\x00-\xff]/ig) !== null) {
                    len += 3;
                } else {
                    len++;
                }
            }
            return len - max;
        },
        alertText: '长度超出限制'
    },
    "before": {
        func: function(val, field, compareVal) {
            if (!val) {
                return true;
            }
            var valStp = toDateStp(val);
            var nStp;
            if (field === 'now') {
                // 小于当前时间
                nStp = parseInt(new Date().getTime());
            } else {
                if (!compareVal) {
                    return true;
                }
                // 小于给定字段时间
                nStp = toDateStp(compareVal);
            }
            return valStp < nStp;
        },
        alertText: '不能晚于*'
    },
    "before=": {
        func: function(val, field, compareVal) {
            if (val === '' || val === undefined) return true;
            var valStp = toDateStp(val);
            var nStp;
            if (field === 'now') {
                // 小于当前时间
                nStp = parseInt(new Date().getTime());
            } else {
                if (!compareVal) {
                    return true;
                }
                // 小于给定字段时间
                nStp = toDateStp(compareVal);
            }
            return valStp <= nStp;
        },
        alertText: '不能晚于*'
    },
    "after": {
        func: function(val, field, compareVal) {
            if (val === '' || val === undefined) return true;
            var valStp = toDateStp(val);
            var nStp;
            if (field === 'now') {
                // 大于当前时间
                nStp = parseInt(new Date().getTime());
            } else {
                if (!compareVal) {
                    return true;
                }
                // 大于给定字段时间
                nStp = toDateStp(compareVal);
            }
            return valStp > nStp;
        },
        alertText: '不能早于*'
    },
    "after=": {
        func: function(val, field, compareVal) {
            if (val === '' || val === undefined) { return true; }
            var valStp = toDateStp(val);
            var nStp;
            if (field === 'now') {
                // 大于当前时间
                nStp = parseInt(new Date().getTime());
            } else {
                if (!compareVal) {
                    return true;
                }
                // 大于给定字段时间 
                nStp = toDateStp(compareVal);
            }
            return valStp >= nStp;
        },
        alertText: '不能早于*'
    }
};

const findModel = function(models, callback) {
    let target;
    models.some(function(model, i) {
        if (callback(model, i)) {
            target = model;
            return true;
        }
    });
    return target;
};

const getAlertText = function(caption, str, ...args) {
    args.forEach(function(w) {
        str = str.replace('*', w);
    });
    return caption + str;
};

const toastErrorMsg = function() {
    MINT.Toast(getAlertText.apply(null, arguments));
};

const validRule = function(checkType, val, caption) {
    let rule = validateRules[checkType];
    if ((rule.func && !rule.func(val)) || (rule.regex && !rule.regex.test(val))) {
        toastErrorMsg(caption, validateRules[checkType].alertText);
        return false;
    }
};

//表单校验
export const validate = function(models, values) {
    return models.every(function(model) {
        if (model.initParam.hidden || model.initParam.readonly || model.initParam.disabled) {
            return true;
        }
        let val = values[model.name] || '';
        let caption = model.caption;
        if (model.initParam.required) {
            if (validRule('required', val, caption) === false) {
                return false;
            }
        }
        //如果值为空，只做必填校验
        if (val === '') {
            return true;
        }
        if (model.dataType === 'int') {
            if (validRule('integer', val, caption) === false) {
                return false;
            }
        }
        if (model.dataType === 'double') {
            if (validRule('double', val, caption) === false) {
                return false;
            }
        }
        if (model.xtype === 'text' || model.xtype === 'textarea' || model.xtype === 'number') {
            if (model.dataType === 'double') {
                //判断精度，不得大于整数位数和小数点位数
                //dataSize:[3,2]，1位整数，2位小数
                if (model.dataSize) {
                    if (typeof(model.dataSize) === "string") {
                        var size = model.dataSize.split(',').map(s => s.replace(/\D/g, '') * 1)
                    } else if(typeof(model.dataSize) === "object" && (model.dataSize instanceof Array)) {
                        var size = model.dataSize.map(s => String(s).replace(/\D/g, '') * 1)
                    }else if(typeof(model.dataSize) === "number"){
                        var size = [model.dataSize];
                    }
                    let valid = String(val).replace('-', '').split('.').every(function(s, i) {
                        if (!size[i]) {
                            return false;
                        }
                        if (i === 0 && size.length === 2) {
                            return s.length <= (size[0] - size[1]);
                        }
                        if (s.length > size[i]) {
                            return false
                        }
                        return true;
                    });
                    if (!valid) {
                        toastErrorMsg(caption, '输入数字不符合精度要求');
                        return false;
                    }
                }
            }
            let len = 0;
            if (model.xtype === 'textarea' && model.initParam.textareaEasyCheck) {
                if (model.checkSize) {
                    len = val.length - Math.floor(model.checkSize * 1);
                } else {
                    len = val.length - Math.floor(model.dataSize / 3);
                }
            } else {
                if (model.checkSize) {
                    len = validateRules['maxLength'].func(val, model.checkSize * 1);
                } else {
                    len = validateRules['maxLength'].func(val, model.dataSize * 1);
                }
            }
            if (len > 0) {
                toastErrorMsg(caption, validateRules['maxLength'].alertText, len);
                return false;
            }
        }
        //模型配置的校验规则
        if (model.checkType) {
            let checkType = model.checkType.replace(/\[|\]|\"|\{|\}|custom/g, "");
            if (checkType) {
                //联动校验
                if (checkType.indexOf('@') > -1 || checkType.indexOf('after') > -1 || checkType.indexOf('before') > -1) {
                    let linkType = '';
                    let compareType = '';
                    if (checkType.indexOf('@') > -1) { // 字段联动校验  after@CSRQ
                        let linkArray = checkType.split('@');
                        linkType = linkArray[0];
                        compareType = linkArray[1];
                    } else if (checkType.indexOf('after') > -1 || checkType.indexOf('before') > -1) {
                        if (/^before=/g.test(checkType)) {
                            linkType = 'before=';
                        } else if (/^before/g.test(checkType)) {
                            linkType = 'before';
                        } else if (/^after=/g.test(checkType)) {
                            linkType = 'after=';
                        } else if (/^after/g.test(checkType)) {
                            linkType = 'after';
                        } else if (/^validate\:\s?(\"|\')?after\w+(\"|\')?/g.test(checkType)) {
                            linkType = 'after';
                            checkType = checkType.replace(/(validate|\'|\:|\s)/g, '');
                        } else if (/^validate\:\s?(\"|\')?before\w+(\"|\')?/g.test(checkType)) {
                            linkType = 'before';
                            checkType = checkType.replace(/(validate|\'|\:|\s)/g, '');
                        } else if (/^validate\:\s?(\"|\')?after=\w+(\"|\')?/g.test(checkType)) {
                            linkType = 'after=';
                            checkType = checkType.replace(/(validate|\'|\:|\s)/g, '');
                        } else if (/^validate\:\s?(\"|\')?before=\w+(\"|\')?/g.test(checkType)) {
                            linkType = 'before=';
                            checkType = checkType.replace(/(validate|\'|\:|\s)/g, '');
                        }
                        compareType = checkType.replace(linkType, '');
                    }
                    if (linkType && !validateRules[linkType].func(val, compareType, values[compareType])) {
                        if (compareType === 'now') {
                            toastErrorMsg(caption, validateRules[linkType].alertText, '当前时间');
                        } else {
                            let compareModel = findModel(models, item => item.name === compareType);
                            if (compareModel) {
                                toastErrorMsg(caption, validateRules[linkType].alertText, compareModel.caption);
                            }
                        }
                        return false;
                    }
                } else {
                    let rule = validateRules[checkType];
                    if (rule) {
                        if (rule.regex && !rule.regex.test(val)) {
                            toastErrorMsg(caption, rule.alertText);
                            return false;
                        }
                    } else {
                        console.warn('不支持校验规则', checkType);
                    }
                }
            }
        }
        //自定义正则校验
        if (model.checkExp) {
            let checkExp = new RegExp(model.checkExp.replace(/^\/(\^)?|(\$)?\/$/g, ''));
            if (!checkExp.test(val)) {
                toastErrorMsg(caption, '不正确');
                return false;
            }
        }
        return true;
    });
};