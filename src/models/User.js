import {DataAdapter} from 'tg-turing'
import {Adapter} from "../../components/Adapter";
export default class extends DataAdapter{
    constructor() {
        super()
        let views = {
            "default": {
                opt:{ caption:"" },
                name: { caption: "姓名" },
                workcode: { caption: "工号" },
                photo: { caption: "照片" },
                created_at: { caption: "创建" },
                updated_at: { caption: "更新" },
                deleted_at: { caption: "删除" }
            },
            "默认列表:table": {
                opt: {type: 'selection',width: 60,align: 'center'},
                name: {sortable: "custom"},
                workcode: {sortable: "custom"},
                photo: { },
                created_at: {filters:[]},
                updated_at: {},
                deleted_at: {}
            },
            "默认表单:form": {
                name: {readonly:true},
                workcode: {xtype:"text"},
                photo: {xtype:"date"},
            },
            "默认查询": {
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
        return Adapter(iviewtype, this.getView(name), params);
    }
    getAllCreatedTime() {
        return this.execute({url:"/api/user/getAllCreatedTime", method:"get"}).then(datas => datas.data.data)
    }
    setUserToDept(dept, users){
        return this.execute({url:"/api/user/setUserToDept", method:"post", params:{dept, users}}).then(datas => datas.data.data)
    }
}