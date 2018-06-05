import {DataAdapter} from 'tg-turing'
import adapter from "../../components/adapter";
export default class extends DataAdapter{
    constructor() {
        super()
        let views = {
            "default": {
                "WID": {"caption": "WID","hidden": true},
                "XSBH": {"caption": "登录名"},
                "XH": {"caption": "学号"},
                "XM": {"caption": "姓名"},
                "XMPY": {"caption": "姓名拼音"},
                "CYM": {"caption": "曾用名"},
                "XBDM": {"caption": "性别"},
                "CSRQ": {"caption": "出生日期"},
                "MZDM": {"caption": "民族"},
                "SFZJLXDM": {"caption": "身份证件类型"},
                "SFZJH": {"caption": "身份证件号"},
                "JG": {"caption": "籍贯","hidden": true},
                "CSDDM": {"caption": "出生地"},
                "SYDDM": {"caption": "生源地"},
                "HKSZD": {"caption": "户口所在地"},
                "GJDQDM": {"caption": "国家地区"},
                "HKXZDM": {"caption": "入学前户口性质"},
                "GATQDM": {"caption": "港澳台侨"},
                "ZZMMDM": {"caption": "政治面貌"},
                "XYZJDM": {"caption": "信仰宗教"},
                "HYZKDM": {"caption": "婚姻状态"},
                "YKTKH": {"caption": "一卡通卡号"},
                "KHM": {"caption": "开户名"},
                "KKYH": {"caption": "开户行"},
                "YHZH": {"caption": "银行账号"},
                "CCQJ": {"caption": "乘车区间"},
                "JKZKDM": {"caption": "健康状况"},
                "XXDM": {"caption": "血型"},
                "TZ": {"caption": "体重（KG）"},
                "SG": {"caption": "身高（CM）"},
                "TC": {"caption": "特长"},
                "BS": {"caption": "病史"},
                "SFDSZN": {"caption": "是否独生子女"},
                "XJZTDM": {"caption": "学籍状态"},
                "PYFSDM": {"caption": "培养方式"},
                "DWDM": {"caption": "院系"},
                "ZYDM": {"caption": "专业"},
                "XZNJ": {"caption": "现在年级"},
                "BJDM": {"caption": "班级"},
                "XZ": {"caption": "学制"},
                "XSLBDM": {"caption": "学生类别"},
                "PYCCDM": {"caption": "培养层次"},
                "LWDBRQ": {"caption": "论文答辩日期"},
                "YJBYRQ": {"caption": "预计毕业日期"},
                "SJBYRQ": {"caption": "实际毕业日期"},
                "WPDW": {"caption": "委培单位"},
                "DSZGH": {"caption": "导师职工号"},
                "XSLXDM": {"caption": "学生类型"},
                "XXXSDM": {"caption": "学习形式"},
                "ZYDLDM": {"caption": "专业大类"},
                "KSH": {"caption": "考生号"},
                "KSLBDM": {"caption": "考生类别"},
                "RXNY": {"caption": "入学年月"},
                "RXQDW": {"caption": "入学前单位"},
                "RXFSDM": {"caption": "入学方式"},
                "RXJJDM": {"caption": "入学季节"},
                "TZSH": {"caption": "通知书号"},
                "GKZF": {"caption": "高考总分"},
                "KM1FS": {"caption": "科目1分数"},
                "KM2FS": {"caption": "科目2分数"},
                "KM3FS": {"caption": "科目3分数"},
                "KM4FS": {"caption": "科目4分数"},
                "KM5FS": {"caption": "科目5分数"},
                "SJH": {"caption": "手机号"},
                "DZXX": {"caption": "电子信箱"},
                "LXDH": {"caption": "联系电话"},
                "QQH": {"caption": "QQ号"},
                "WXH": {"caption": "微信号"},
                "ZXYZBM": {"caption": "在校邮政编码"},
                "ZXTXDZ": {"caption": "在校通讯地址"},
                "JTDZ": {"caption": "家庭地址"},
                "JTDZQH": {"caption": "家庭地址区划"},
                "JTYB": {"caption": "家庭邮编"},
                "JTDH": {"caption": "家庭电话"},
                "ZSDZ": {"caption": "住宿地址"},
                "XSZP": {"caption": "学生照片","hidden": true},
                "RDSJ": {"caption": "入党日期","hidden": true},
                "SSDZB": {"caption": "所属党支部","hidden": true},
                "SJCJ": {"caption": "四级成绩","hidden": true},
                "LJCJ": {"caption": "六级成绩","hidden": true},
                "XQDM": {"caption": "校区","hidden": true},
                "SSQ": {"caption": "宿舍区","hidden": true},
                "SSL": {"caption": "宿舍楼","hidden": true},
                "BZ6": {"caption": "毕业去向信息","hidden": true},
                "BZ1": {"caption": "备注1","hidden": true},
                "BZ2": {"caption": "备注2","hidden": true},
                "BZ3": {"caption": "备注3","hidden": true},
                "BZ4": {"caption": "备注4","hidden": true},
                "BZ5": {"caption": "备注5","hidden": true},
                "BZ7": {"caption": "备注7","hidden": true},
                "BZ8": {"caption": "备注8","hidden": true},
                "BZ9": {"caption": "备注9","hidden": true},
                "BZ10": {"caption": "备注10","hidden": true},
                "BZ11": {"caption": "备注11","hidden": true},
                "BZ12": {"caption": "备注12","hidden": true},
                "BZ13": {"caption": "备注13","hidden": true},
                "BZ14": {"caption": "备注14","hidden": true},
                "BZ15": {"caption": "备注15","hidden": true},
                "BZ16": {"caption": "备注16","hidden": true},
                "BZ17": {"caption": "备注17","hidden": true},
                "BZ18": {"caption": "备注18","hidden": true},
                "BZ19": {"caption": "备注19","hidden": true},
                "BZ20": {"caption": "备注20","hidden": true}
            },
            "默认列表:grid": {
                "WID": {},
                "XSBH": {},
                "XH": {},
                "XM": {},
                "XMPY": {},
                "CYM": {},
                "XBDM": {},
                "CSRQ": {},
                "MZDM": {},
                "SFZJLXDM": {},
                "SFZJH": {},
                "JG": {},
                "CSDDM": {},
                "SYDDM": {},
                "HKSZD": {},
                "GJDQDM": {},
                "HKXZDM": {},
                "GATQDM": {},
                "ZZMMDM": {},
                "XYZJDM": {},
                "HYZKDM": {},
                "YKTKH": {},
                "KHM": {},
                "KKYH": {},
                "YHZH": {},
                "CCQJ": {},
                "JKZKDM": {},
                "XXDM": {},
                "TZ": {},
                "SG": {},
                "TC": {},
                "BS": {},
                "SFDSZN": {},
                "XJZTDM": {},
                "PYFSDM": {},
                "DWDM": {},
                "ZYDM": {},
                "XZNJ": {},
                "BJDM": {},
                "XZ": {},
                "XSLBDM": {},
                "PYCCDM": {},
                "LWDBRQ": {},
                "YJBYRQ": {},
                "SJBYRQ": {},
                "WPDW": {},
                "DSZGH": {},
                "XSLXDM": {},
                "XXXSDM": {},
                "ZYDLDM": {},
                "KSH": {},
                "KSLBDM": {},
                "RXNY": {},
                "RXQDW": {},
                "RXFSDM": {},
                "RXJJDM": {},
                "TZSH": {},
                "GKZF": {},
                "KM1FS": {},
                "KM2FS": {},
                "KM3FS": {},
                "KM4FS": {},
                "KM5FS": {},
                "SJH": {},
                "DZXX": {},
                "LXDH": {},
                "QQH": {},
                "WXH": {},
                "ZXYZBM": {},
                "ZXTXDZ": {},
                "JTDZ": {},
                "JTDZQH": {},
                "JTYB": {},
                "JTDH": {},
                "ZSDZ": {},
                "XSZP": {},
                "RDSJ": {},
                "SSDZB": {},
                "SJCJ": {},
                "LJCJ": {},
                "XQDM": {},
                "SSQ": {},
                "SSL": {},
                "BZ6": {},
                "BZ1": {},
                "BZ2": {},
                "BZ3": {},
                "BZ4": {},
                "BZ5": {},
                "BZ7": {},
                "BZ8": {},
                "BZ9": {},
                "BZ10": {},
                "BZ11": {},
                "BZ12": {},
                "BZ13": {},
                "BZ14": {},
                "BZ15": {},
                "BZ16": {},
                "BZ17": {},
                "BZ18": {},
                "BZ19": {},
                "BZ20": {}
            },
            "默认表单:form": {
                "WID": {"xtype": "text","dataSize": 40},
                "XSBH": {"xtype": "text","dataSize": 40},
                "XH": {"xtype": "text","dataSize": 20},
                "XM": {"xtype": "text","dataSize": 90},
                "XMPY": {"dataSize": 120},
                "CYM": {"dataSize": 120},
                "XBDM": {"url": "/axsfw/code/b2738d0d-0eb1-4b03-b0f6-98f509a88c8c.do","xtype": "select","dataSize": 1},
                "CSRQ": {"xtype": "date-local","dataSize": 10},
                "MZDM": {"url": "/axsfw/code/e8bdc02d-2d5b-4367-b832-cd47e6ac42c1.do","xtype": "select","dataSize": 2},
                "SFZJLXDM": {"url": "/axsfw/code/553c0263-42d7-45c5-9cc3-049e371ce9d4.do","xtype": "select","dataSize": 1},
                "SFZJH": {"xtype": "text","dataSize": 20},
                "JG": {"url": "/axsfw/code/80f9d8aa-d053-4312-b725-016642b74e3e.do","xtype": "tree","dataSize": 6},
                "CSDDM": {"url": "/axsfw/code/80f9d8aa-d053-4312-b725-016642b74e3e.do","xtype": "tree","dataSize": 6},
                "SYDDM": {"url": "/axsfw/code/80f9d8aa-d053-4312-b725-016642b74e3e.do","xtype": "tree","dataSize": 6},
                "HKSZD": {"xtype": "text","dataSize": 180},
                "GJDQDM": {"url": "/axsfw/code/9ea2317c-be66-428d-b1f4-7f0f5bc5ad09.do","xtype": "select","dataSize": 3},
                "HKXZDM": {"url": "/axsfw/code/a6308f2e-d206-4bd3-aa79-7a839998120c.do","xtype": "select","dataSize": 1},
                "GATQDM": {"url": "/axsfw/code/0e53b529-ecdc-4c9c-8c8c-5e26a0a1f304.do","xtype": "select","dataSize": 2},
                "ZZMMDM": {"url": "/axsfw/code/1079937e-d441-448d-b7e9-1e45bea76e8d.do","xtype": "select","dataSize": 2},
                "XYZJDM": {"url": "/axsfw/code/492af6f5-4048-4034-beda-8c051a7fcc3d.do","xtype": "select","dataSize": 2},
                "HYZKDM": {"url": "/axsfw/code/7303c198-94dd-4b89-b972-2e08f622dd28.do","xtype": "select","dataSize": 2},
                "YKTKH": {"xtype": "text","dataSize": 30},
                "KHM": {"dataSize": 300},
                "KKYH": {"dataSize": 20},
                "YHZH": {"xtype": "text","dataSize": 40},
                "CCQJ": {"xtype": "selecttable","url": "/axsfw/sys/swpubapp/*default/ggmk/hczzdmhss.do","dataSize": 300},
                "JKZKDM": {"url": "/axsfw/code/70302a56-36d1-4f5f-b61f-c2e149d27413.do","xtype": "select","dataSize": 2},
                "XXDM": {"url": "/axsfw/code/bed9e2f1-18fc-47d1-bdd9-0ea71214b7fb.do","xtype": "select","dataSize": 1},
                "TZ": {"xtype": "text","dataSize": [5,2]},
                "SG": {"checkSize": 6,"checkType": "custom[number]","xtype": "text","dataSize": 10},
                "TC": {"xtype": "text","dataSize": 600},
                "BS": {"dataSize": 600},
                "SFDSZN": {"url": "/axsfw/code/67dbb4e6-5283-4da2-ae0c-37414988b50b/SFSY.do","xtype": "select","dataSize": 3},
                "XJZTDM": {"url": "/axsfw/code/12eb4f7c-69a1-41c2-b21e-c99fe850264a.do","xtype": "select","dataSize": 6},
                "PYFSDM": {"url": "/axsfw/code/9afe2f0b-75ed-44a2-b81c-8ed54b235a2c.do","xtype": "select","dataSize": 2},
                "DWDM": {"url": "/axsfw/code/ffcf5f04-e557-4b90-8528-f22019bd8cf0.do","xtype": "select","dataSize": 40},
                "ZYDM": {"url": "/axsfw/code/94b15a8a-9b45-4455-b254-1ec2065028d9.do","xtype": "select","dataSize": 40},
                "XZNJ": {"xtype": "text","dataSize": 10},
                "BJDM": {"url": "/axsfw/code/ab43d66a-9778-49b1-b3e0-0ce46317fed9.do","xtype": "select","dataSize": 100},
                "XZ": {"xtype": "text","dataSize": 10},
                "XSLBDM": {"url": "/axsfw/code/42122d93-9df9-492b-b647-253817691287.do","xtype": "select","dataSize": 5},
                "PYCCDM": {"url": "/axsfw/code/9ec58134-0517-4664-8969-5342ffcaf190.do","xtype": "select","dataSize": 1},
                "LWDBRQ": {"xtype": "date-local","dataSize": 20},
                "YJBYRQ": {"xtype": "date-local","dataSize": 30},
                "SJBYRQ": {"xtype": "date-local","dataSize": 10},
                "WPDW": {"dataSize": 180},
                "DSZGH": {"dataSize": 40},
                "XSLXDM": {"xtype": "select","url": "/axsfw/code/eb92b121-4462-41de-9958-82e356fe64c6.do","dataSize": 10},
                "XXXSDM": {"xtype": "select","url": "/axsfw/code/ba8b3565-59c1-4251-a749-8f9c3dc358a1.do","dataSize": 10},
                "ZYDLDM": {"xtype": "select","url": "/axsfw/code/c7d50532-bcba-4bb8-84b1-ffd6820c2d0a.do","dataSize": 10},
                "KSH": {"xtype": "text","dataSize": 20},
                "KSLBDM": {"url": "/axsfw/code/acc2e70d-21d8-48fd-8c11-762fb2d01c47.do","xtype": "select","dataSize": 10},
                "RXNY": {"xtype": "date-ym","dataSize": 10},
                "RXQDW": {"xtype": "text","dataSize": 300},
                "RXFSDM": {"url": "/axsfw/code/e3c96900-7acb-4265-a81b-45079c3485b8.do","xtype": "select","dataSize": 2},
                "RXJJDM": {"xtype": "select","url": "/axsfw/code/67dbb4e6-5283-4da2-ae0c-37414988b50b/RXJJ.do","dataSize": 10},
                "TZSH": {"xtype": "text","dataSize": 20},
                "GKZF": {"xtype": "text","dataSize": [5,2]},
                "KM1FS": {"xtype": "text","dataSize": [5,2]},
                "KM2FS": {"xtype": "text","dataSize": [5,2]},
                "KM3FS": {"xtype": "text","dataSize": [5,2]},
                "KM4FS": {"xtype": "text","dataSize": [5,2]},
                "KM5FS": {"xtype": "text","dataSize": [5,2]},
                "SJH": {"checkType": "custom[phone]","xtype": "text","dataSize": 40},
                "DZXX": {"checkType": "custom[email]","xtype": "text","dataSize": 100},
                "LXDH": {"xtype": "text","dataSize": 300},
                "QQH": {"xtype": "text","dataSize": 20},
                "WXH": {"xtype": "text","dataSize": 40},
                "ZXYZBM": {"xtype": "text","dataSize": 6},
                "ZXTXDZ": {"col": 3,"xtype": "text","dataSize": 300},
                "JTDZ": {"col": 3,"xtype": "text","dataSize": 300},
                "JTDZQH": {"url": "/axsfw/code/80f9d8aa-d053-4312-b725-016642b74e3e.do","xtype": "tree","dataSize": 6},
                "JTYB": {"checkType": "custom[chinaZip]","xtype": "text","dataSize": 6},
                "JTDH": {"xtype": "text","dataSize": 100},
                "ZSDZ": {"xtype": "text","dataSize": 300},
                "XSZP": {"dataSize": 40},
                "RDSJ": {"xtype": "date-local","dataSize": 20},
                "SSDZB": {"dataSize": 120},
                "SJCJ": {"dataSize": 10},
                "LJCJ": {"dataSize": 10},
                "XQDM": {"url": "/axsfw/code/24a8b754-7532-4a76-b07b-4aea4e402382.do","xtype": "select","dataSize": 40},
                "SSQ": {"url": "/axsfw/code/f4fbe313-bcf7-4599-90ff-f89db2716417.do","xtype": "select","dataSize": 40},
                "SSL": {"url": "/axsfw/code/c043b195-d8a2-498d-86b5-09e27da23b2d.do","xtype": "select","dataSize": 40},
                "BZ6": {"xtype": "text","dataSize": 200},
                "BZ1": {"xtype": "text","dataSize": 200},
                "BZ2": {"xtype": "text","dataSize": 200},
                "BZ3": {"xtype": "text","dataSize": 200},
                "BZ4": {"xtype": "text","dataSize": 200},
                "BZ5": {"xtype": "text","dataSize": 200},
                "BZ7": {"dataSize": 300},
                "BZ8": {"dataSize": 300},
                "BZ9": {"dataSize": 300},
                "BZ10": {"dataSize": 300},
                "BZ11": {"dataSize": 300},
                "BZ12": {"dataSize": 300},
                "BZ13": {"dataSize": 300},
                "BZ14": {"dataSize": 300},
                "BZ15": {"dataSize": 300},
                "BZ16": {"dataSize": 300},
                "BZ17": {"dataSize": 300},
                "BZ18": {"dataSize": 300},
                "BZ19": {"dataSize": 300},
                "BZ20": {"dataSize": 300}
            },
            "search": {
                "WID": {},
                "XSBH": {},
                "XH": {},
                "XM": {},
                "XMPY": {},
                "CYM": {},
                "XBDM": {},
                "CSRQ": {},
                "MZDM": {},
                "SFZJLXDM": {},
                "SFZJH": {},
                "JG": {},
                "CSDDM": {},
                "SYDDM": {},
                "HKSZD": {},
                "GJDQDM": {},
                "HKXZDM": {},
                "GATQDM": {},
                "ZZMMDM": {},
                "XYZJDM": {},
                "HYZKDM": {},
                "YKTKH": {},
                "KHM": {},
                "KKYH": {},
                "YHZH": {},
                "CCQJ": {},
                "JKZKDM": {},
                "XXDM": {},
                "TZ": {},
                "SG": {},
                "TC": {},
                "BS": {},
                "SFDSZN": {},
                "XJZTDM": {},
                "PYFSDM": {},
                "DWDM": {},
                "ZYDM": {},
                "XZNJ": {},
                "BJDM": {},
                "XZ": {},
                "XSLBDM": {},
                "PYCCDM": {},
                "LWDBRQ": {},
                "YJBYRQ": {},
                "SJBYRQ": {},
                "WPDW": {},
                "DSZGH": {},
                "XSLXDM": {},
                "XXXSDM": {},
                "ZYDLDM": {},
                "KSH": {},
                "KSLBDM": {},
                "RXNY": {},
                "RXQDW": {},
                "RXFSDM": {},
                "RXJJDM": {},
                "TZSH": {},
                "GKZF": {},
                "KM1FS": {},
                "KM2FS": {},
                "KM3FS": {},
                "KM4FS": {},
                "KM5FS": {},
                "SJH": {},
                "DZXX": {},
                "LXDH": {},
                "QQH": {},
                "WXH": {},
                "ZXYZBM": {},
                "ZXTXDZ": {},
                "JTDZ": {},
                "JTDZQH": {},
                "JTYB": {},
                "JTDH": {},
                "ZSDZ": {},
                "XSZP": {},
                "RDSJ": {},
                "SSDZB": {},
                "SJCJ": {},
                "LJCJ": {},
                "XQDM": {},
                "SSQ": {},
                "SSL": {},
                "BZ6": {},
                "BZ1": {},
                "BZ2": {},
                "BZ3": {},
                "BZ4": {},
                "BZ5": {},
                "BZ7": {},
                "BZ8": {},
                "BZ9": {},
                "BZ10": {},
                "BZ11": {},
                "BZ12": {},
                "BZ13": {},
                "BZ14": {},
                "BZ15": {},
                "BZ16": {},
                "BZ17": {},
                "BZ18": {},
                "BZ19": {},
                "BZ20": {}
            }
        }
        this.actions.find.url = "/api/user";
        this.actions.save.url = "/api/user/save";
        this.actions.delete.url = "/api/user";
        this.actions.delete.method = "delete"

        this.initView(views);
    }
    view(name, params) {
        let props = name.split(":")
        let iviewtype = props[1];
        return adapter(iviewtype, this.getView(name), params);
    }
    // metaAG(metaid, type, params) {
    //     return aggridAdapter(type, this.getMeta(metaid), params);
    // }
    getAllCreatedTime() {
        return this.execute({url:"/api/user/getAllCreatedTime", method:"get"}).then(datas => datas.data.data)
    }
    setUserToDept(dept, users){
        return this.execute({url:"/api/user/setUserToDept", method:"post", params:{dept, users}}).then(datas => datas.data.data)
    }
}