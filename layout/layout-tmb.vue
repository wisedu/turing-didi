<template>
    <div>
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    name: "layout-tmb",
    props: {
        appName: String,
        menu: {
            type: Array,
            default: function() {
                return [];
            }
        },
        footer: {
            type:Object,
            default: function() {
                return {}
            }
        },
        navPath: Array,
        dropMenu: Array,
        logo: String,
        logoutUrl: String,
        userImage: String,
        userName: String,
        userInfo: {
            type:Object,
            default: function() {
                return {};
            }
        },
        activeName:String
    },
    computed: {
        currentRole(){
            let role = this.dropMenu.find(item => item.active === "true");
            if (role === undefined) {
                role = {text: ""}
            }
            return role;
        }
    },
    methods:{
        roleDropdown(name) {
            this.$emit("role-change", name);
        },
        userDropdown (name) {
            let clickitem = this.dropMenu.find(item => item.name === name);
            if (clickitem !== undefined){ 
                if (clickitem.url !== undefined) {
                    window.location.href = clickitem.url;
                }
                if (clickitem.callback !== undefined) {
                    clickitem.callback();
                }
            }
        },
        menuSelect(name) {
            let clickitem = this.menu.find(item => item.name === name);
            if (clickitem !== undefined){ 
                if (clickitem.url !== undefined && clickitem.url !== "") {
                    window.location.href = clickitem.url;
                }
            }
        },
        logOut(){
            window.location.href = this.logoutUrl;
        }
    }
};
</script>

<style>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    float: left;
}
.layout-logo img.logo{
    height: 48px;
}
.layout-logo .appName {
    color: white;
    font-size: 24px;
    font-weight: 700;
    line-height: 60px;
}
.layout-nav{
    float: right;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
    font-size: 12px;
}
.user-dropdown-menu-con{
    width: 180px;
    float: right;
    text-align: right;
}
.user-dropdown-menu-con .main-user-name{
    display: inline-block;
    width: 80px;
    font-size: 14px;
    word-break: keep-all;
    white-space: nowrap;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
}
.user-dropdown-menu-con .avatar{
    margin-left: 10px;
    text-align: right;
    max-width: 40px;
    max-height: 40px;
    border-radius: 4px;
}

.userDropdown-userInfo{
    width: 200px;
    padding: 8px;
}
.userDropdown-userInfo .username {
}
.delimiter{
    border-bottom: 1px solid #ddd;
    margin: 8px 0;
}
.dropdown-title {
    padding: 8px;
    line-height: 32px;
    font-size: 12px;
    color: #666;
}
</style>