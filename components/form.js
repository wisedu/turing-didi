export default {
    "static": {
        name: "didi-fc-static"
    },
    "text": {
        name: "didi-fc-text",
        required: {
            message: "不能为空"
        }
    },
    "textarea": {
        name: "didi-fc-textarea",
        required: {
            message: "不能为空"
        }
    },
    "date": {
        name: "didi-fc-date",
        required: {
            message: "不能为空"
        }
    },
    "date-ym": {
        name: "didi-fc-date",
        required: {
            message: "不能为空"
        }
    },
    "date-range": {
        name: "didi-fc-date-range",
        required: {
            type: "array",
            message: "不能为空"
        }
    },
    "date-local": {
        name: "didi-fc-date",
        required: {
            message: "不能为空"
        }
    },
    "date-full": {
        name: "didi-fc-date",
        required: {
            message: "不能为空"
        }
    },
    "select": {
        name: "didi-fc-select",
        default: {
            async: false
        },
        required: {
            message: "请选择一项"
        }
    },
    "multi-select": {
        name: "didi-fc-select",
        default: {
            multiple: true
        },
        required: {
            type: 'array',
            min: 1,
            message: "请选择一项"
        }
    },
    "buttonlist": {
        name: "didi-fc-buttonlist",
        required: {
            message: "不能为空"
        }
    },
    "number-range": {
        name: "didi-fc-number-range",
        required: {
            message: "不能为空"
        }
    },
    "number": {
        name: "didi-fc-number",
        required: {
            type: "number",
            message: "请填写数字"
        }
    },
    "uploadfile": {
        name: "didi-fc-uploadfile",
        required: {
            message: "请选择一项"
        }
    },
    "tree": {
        name: "didi-fc-tree",
        required: {
            message: "请选择一项"
        }
    },
    "autocomplete": {
        name: "didi-fc-autocomplete",
        required: {
            message: "不能为空"
        }
    },
    "selecttable": {
        name: "didi-fc-autocomplete",
        required: {
            message: "不能为空"
        }
    },
    "radiolist": {
        name: "didi-fc-radiolist",
        required: {
            message: "请选择一项"
        }
    },
    "checkboxlist": {
        name: "didi-fc-checkboxlist",
        required: {
            type: 'array',
            min: 1,
            message: "请选择一项"
        }
    },
    "switcher": {
        name: "didi-fc-switcher",
        required: {
            message: "不能为空"
        }
    }
}