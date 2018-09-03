<template>
    <div class="bh-upload-wrap">
        <didi-fc-cell :model="model" :class="{'didi-fc-item-error':isValidate,'didi-cell-noshadow':true}">
        </didi-fc-cell>
        <div class="didi-imgs">
            <template v-for="(item,index) in fileData">
                <template v-if="isImage(item) === true">
                    <div class="upload_item">
                        <i v-if='!readonly' class="iconfont icon-weiwancheng cancel_upload_img" @click="deleteImg(item.id)"></i>
                        <img class="upload_img" @click="previewImg(index)" :src="getFileByUrl(item.fileUrl)" alt="">
                    </div>
                </template>
                <template v-if="isImage(item) === false">
                    <div class="upload_item">
                        <i v-if='!readonly' class="iconfont icon-weiwancheng cancel_upload_img" @click="deleteImg(item.id)"></i>
                        <a :href="item.fileUrl"><i @click="previewFile(item)" class="iconfont" :class="getFileType(item)" style="font-size:75px;"></i></a>
                    </div>
                </template>
            </template>
            <template v-if="fileData.length < maxNumber && !readonly">
                <div class="upload_item">
                    <img class="upload_img" :src="defaultImage" alt="无" @click="handleClick">
                </div>
            </template>
            <!-- <template v-if="fileData.length <= 0 && readonly">
                <div class="upload_item upload_item_none">   
                    暂无图片
                </div>            
            </template> -->
        </div>
        <tg-action-sheet
			v-model="materialSheetVisible"
			:data="materialActions"
			@select="handleSelect"
			@cancel="handleCancel"
		></tg-action-sheet>
        <!-- <mt-actionsheet :actions="materialActions" v-model="materialSheetVisible"></mt-actionsheet> -->
    </div>
</template>
<script>
    var defaultImage = "data:image/png;base64,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";
    import Vue from 'vue';
    import utils from '../utils';
    import DidiFcCell from './cell';
    import {ConnectItem} from 'tg-turing';

    export default {
        name : "didi-fc-uploadimg", 
        extends: ConnectItem,
        props: {},
        watch: {
            // token(val) {
            //     this.myToken = val;
            //     this.getImgsToDom();
            // },
            // myToken(val) {
            //     this.$emit('on-token-change', val,this.index);
            // }
        },
        data() {
            var _this = this;
            return {
                host: "",
                myToken: this.token,
                fileData: [],
                previewUrl: [],
                materialSheetVisible: false,
                materialActions: [{
                    content: "拍照",
                    id:'takePhoto'
                    //method: _this.handleShootClick
                }, {
                    content: "从相册中选择",
                    id:'takeCamera'
                    //method: _this.handleSelectClick
                }],
                defaultImage:defaultImage,
                isValidate:false,
                maxNumber:9
            }
        },
        mounted() {
            //debugger
            // var path = this.hostPathname;
            // var pArr = [];
            // for(var i=0;i<path.length;i++){
            //     if(path[i] == "/"){
            //         pArr.push(i)
            //     }
            // }
            // this.host = path.substring(0,pArr[pArr.length-1]);
            this.getImgsToDom();
        },
        methods: {
            getImgsToDom() {
                console.log('getImgsToDom----'+this.myToken)
                if (this.myToken) {
                    let url = window["tg-turing"].utils.getContextPath() + '/sys/emapcomponent/file/getUploadedAttachment/' + this.myToken + '.do';                    
                    //debugger
                    window.MINT.Indicator.open();
                    // 根据token获取 图片链接数组
                    utils.Get(url).then(({ data: resp }) => {
                        window.MINT.Indicator.close();
                        this.fileData = resp.items || []
                        this.previewUrl = [];
                        this.fileData.map(item => {
                            this.previewUrl.push({
                                isImage:item.isImage,
                                fileUrl:item.fileUrl
                            });
                        });
                        // 2018-08-16 人事 王长春 已有token但无图片，保持token不变 by xujiabin
                        // if(this.previewUrl.length === 0){
                        //     this.myToken = '';
                        // }
                    },() => {
                        window.MINT.Indicator.close();
                    })
                } else {
                    this.fileData = [];
                }
            },
            previewImg(index){
                let imgs = [];
                this.previewUrl.map(item => {
                    if (item.isImage) {
                        let opt = {};
                        opt.url = this.host + item.fileUrl;
                        imgs.push(opt);
                    }
                })
                utils.getJsSDK().preViewImages(imgs,index);
            },
            getFileByUrl(url) {
                return this.host + url;
            },
            handleClick() {
                this.materialSheetVisible = true;
            },
            handleSelect(item) {
                //debugger
                this.materialSheetVisible = false;
                let num = this.maxNumber - this.fileData.length;
                if(item.id === "takePhoto"){
                   utils.getJsSDK().takePhoto((ret) => {
                        //console.log('start-------actionUpload');
                        //alert(JSON.stringify(ret));
                        this.actionUpload(ret);
                    }, num); 
                }else {
                    utils.getJsSDK().takeCamera((ret) => {
                        //console.log('start-------actionUpload');
                        //console.log(ret);
                        this.actionUpload(ret)
                    }, num)
                } 
            },
            handleCancel(){
                this.materialSheetVisible = false;
            },
            deleteImg(wid) {
                console.log('--1--2--------')
                console.log(window.MINT.MessageBox)
                window.MINT.MessageBox({
                    message: "确定删除该照片",
                    title: "提示",
                    showCancelButton: true,
                    confirmButtonClass: "confirm_btn_class",
                    cancelButtonClass: "cancel_btn_class"
                }).then(action => {
                    if (action == "confirm") {
                        let url1 = this.hostPathname + '/sys/emapcomponent/file/deleteFileByWid/' + wid + '.do';
                        let url2 = this.hostPathname + '/sys/emapcomponent/file/deleteFileByWid/' + wid + "_1" + '.do';
                        let url3 = this.hostPathname + '/sys/emapcomponent/file/deleteFileByWid/' + wid + "_2" + '.do';
                        window.MINT.Indicator.open();
                        //测试发现现在emap底座的删除接口，在删除图片时，必须保证 _1 和 _2 都已经删除成功了才能删除原图
                        utils.Get(url2).then(data => {
                            utils.Get(url3).then(data => {
                                utils.Get(url1).then(data => {
                                    window.MINT.Indicator.close();
                                    this.getImgsToDom();
                                })
                            })
                        })
                    }
                })
            },
            actionUpload(retData) {
                var that = this;
                if (retData.length == 0) {
                    return
                }
                let url = [];
                //alert(JSON.stringify(url))
                let sizeFlag = 0;
                // alert('retData.length:'+retData.length)
                // alert('isArray:'+(retData instanceof Array))
                // alert('isString:'+(retData instanceof String))
                if (Array.isArray(retData)) {
                    retData.map(item => {
                        url.push(item.url);
                        //alert(JSON.stringify(url))
                        if(item.size >= this.size  * 1024){
                            sizeFlag ++;
                        }
                    })
                    if(sizeFlag > 0){
                        window.MINT.Toast('图片大小限制在'+ this.size + 'KB以内');
                        return
                    }
                } else {
                    if (retData.url) {
                        url[0] = retData.url;
                    } 
                    // else {
                    //     retData.map(item => {
                    //         url.push(item.url);
                    //     }) 
                    // }
                    //alert(JSON.stringify(url))
                    if(retData.size >= this.size  * 1024){
                        window.MINT.Toast('图片大小限制在'+ this.size + 'KB以内');
                        return
                    }
                }
                
                window.MINT.Indicator.open();
                let config = {
                    token: this.myToken || ''
                };
                if (this.fileName && this.maxNumber === 1) {
                    config.fileName = this.fileName;
                }
                console.log('uploadImgsToEmap~~~~~~~~')
                //alert(JSON.stringify(url))
                utils.getJsSDK().uploadImgsToEmap({
                    host: that.hostPathname,
                    urls: url,
                    config: config
                }).then(resp => {
                    window.MINT.Indicator.close();
                    console.log('uploadImgsToEmap---------'+JSON.stringify(resp))
                    //resp.data.token 兼容学工线的微信上传图片
                    if (resp.token || resp.data.token) {
                        this.myToken = resp.token || resp.data.token;
                        this.getImgsToDom();
                        window.MINT.Toast('图片上传成功')
                    } else {
                        window.MINT.Toast(resp.msg || '图片上传失败')
                    }
                }, error => {
                    console.log('error-----------1')
                    console.log(JSON.stringify(error))
                    window.MINT.Indicator.close();
                    window.MINT.Toast('图片上传失败~')
                })
            },
            isImage(fileItemData) {
                if (fileItemData.name === undefined) return
                if (/.(jpg|jpeg|png|gif|bmp)$/.test(fileItemData.name.toLowerCase())) return true
                return false
            },
            getFileType(fileItemData){
                if (/.(xls|xlsx)$/.test(fileItemData.name.toLowerCase())) return 'icon-xlsx color-xlsx';
                if (/.(pdf)$/.test(fileItemData.name.toLowerCase())) return 'icon-pdf color-pdf';
                if (/.(zip)$/.test(fileItemData.name.toLowerCase())) return 'icon-zip';
                if (/.(doc|docx)$/.test(fileItemData.name.toLowerCase())) return 'icon-doc color-doc';
                if (/.(ppt|pptx)$/.test(fileItemData.name.toLowerCase())) return 'icon-ppt color-ppt';
                return 'icon-others color-others';
            },
            previewFile(item){
                if (utils.getJsSDK().bh) {
                    var lastIndex = item.name.lastIndexOf('.');
                    var type = item.name.slice(lastIndex + 1,item.name.length);
                    console.log('filesType:'+type)
                    utils.getJsSDK().bh.file.filePreview(item.fileUrl,type,''); 
                }
            }
        },
        
        // components: { 
        //     [Actionsheet.name]: Actionsheet,
        // },
    }
</script>
<style>
    .confirm_btn_class {
        font-size: 14px;
    }
    .cancel_btn_class {
        font-size: 14px;
    }
</style>
<style scoped>
    .bh-upload-wrap {
        position: relative;
        /* overflow: hidden; */
        width: 100%;
        /* display: flex!important; */
    }
    .didi-imgs {
        /* padding-top:2px; */
        margin-left: 17px;
        box-shadow: inset 0 -1px 0 0 #EDF2FB;
    }
    .bh-upload_required{
        color: red;
    }
    .upload_item {
        display: inline-block;
        /* width: 75px;
        height: 75px; */
        margin: 0px 8px 4px 0;
        position: relative;
        vertical-align: top;
    }
    .upload_item_none{
        line-height: 75px;
        margin: 0;
    }
    .cancel_upload_img {
        position: absolute;
        top: -13px;
        right: -7px;
        font-size: 18px;
    }
    .upload_img {
        width: 75px;
        height: 75px;
    }
    .upload_img_wrong{
        width: 100px;
        margin: 0;
        line-height: 75px;        
    }
    .bh-upload-wrap .color-pdf {
        color: #F26666;
    }

    .bh-upload-wrap .color-doc {
        color: #4A90E2;
    }

    .bh-upload-wrap .color-xlsx {
        color: #A2D06B;
    }

    .bh-upload-wrap .color-ppt {
        color: #F26666;
    }

    .bh-upload-wrap .color-zip {
        color: #92969C;
    }

    .bh-upload-wrap .color-others {
        color: #FFB950;
    }

</style>