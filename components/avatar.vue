<template>
    <div class="bh-avatar-upload" :style="{width:width+'px',height:width*ratio +'px'}">
        <img v-if="disabled" :src="imgUrl" :style="{width:width+'px',height:width*ratio +'px',borderRadius:radius+'px'}" />
        <a v-else href="javascript:void(0)" class="bh-btn bh-btn-default bh-emapAvatar-upload">
            <img class="bh-emapAvatar-avatar" :src="imgUrl" :style="{width:width+'px',height:width*ratio +'px',borderRadius:radius+'px'}" />
            <input type="file" :style="{width:width+'px',height:width*ratio +'px'}" />
        </a>
        <transition name="slide">
            <div class="select-container mt-bg-lv2" :style="{height: (clientHeight) + 'px'}" v-show="selectorShow" @click.stop>
                <img class="bh-avatar-img" style="" /> 
                <div class="avatar-buttons" :style="{bottom:bottomPosition}">
                    <tg-button class="avatar-button" size="large" type="default" @click="actionGoback">返回</tg-button>
                    <tg-button class="avatar-button" size="large" type="primary" @click="actionCut">裁剪</tg-button>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Vue from 'vue';
    import utils from '../utils';
    import './emap__jquery.fileupload.js';
    var tmpFlag = '';
    var defaultPhoto = 'data:image/jpeg;base64,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';
    var options = {};
    export default {
        name : "Avatar", 
        props: {
            mode:{
                default:'',
                type:String
            },
            storeId: {
                default:'image',
                type:String
            },
            contextPath: {
                default:function(){
                    return location.pathname.substring(0, location.pathname.indexOf("/", 1))
                },
                type:String
            },
            value: {
                default:'',
                type:String
            },
            radius:{
                default:40,
                type:Number
            },
            ratio: {
                default:1,
                type:Number
            },
            width: {
                default:80,
                type:Number
            },
            actualWidth: {
                default:80,
                type:Number
            }, // 需要图片的实际尺寸
            type: {
                default:function(){
                    return ['jpg', 'png', 'jpeg']
                },
                type:Array
            },
            size: {
                default:5120,
                type:Number
            },
            disabled: {
                default:false,
                type:Boolean
            },
            autoSave: {
                default:false,
                type:Boolean
            },
            saveParams: {
                default:function(){
                   return {}
                },
                type:Object
            },
            hostPathname: { //带二级域名：用于图片上传需要整个域名前缀
                default: location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)),
                type: String
            },
            defaultAvatar:{
                default:'',
                type:String
            },
            fileId:{
                default:'',
                type:String
            }
        },
        watch: {
            value(){
                if (!tmpFlag) {
                    this.initAvatar()
                }
            }
        },
        data() {
            var _this = this;
            return {
                imgUrl: this.defaultAvatar?this.defaultAvatar:defaultPhoto,
                uploadImgUrl:'',
                clientHeight:'',
                selectorShow:false,
                options:{},
                bottomPosition:'0'
            }
        },
        mounted() {
            // 初始化 上传控件
            this.clientHeight = document.body.clientHeight;
            this.initAvatar();
            var isIphone = function() {
                return /iphone/.test(navigator.userAgent.toLowerCase());
            };
            console.log(navigator.userAgent.toLowerCase())
            if(isIphone()){
                this.bottomPosition = '82px';
            }
        },
        methods: {
            initAvatar(){
                options = {
                    "storeId":this.storeId,
                    "contextPath":this.contextPath,
                    "ratio":this.ratio,
                    "width":this.width,
                    "actualWidth":this.actualWidth,
                    "type":this.type,
                    "size":this.size,
                    "disabled":this.disabled,
                    "autoSave":this.autoSave,
                    "saveParams":this.saveParams,
                    "defaultAvatar":this.defaultAvatar,
                    "scope":"",
                    "token":this.value,
                    "displayAvatar":"",
                    "newToken":"",
                    "winContent":".bh-avatar-upload",
                    "uploadUrl":"",
                    "fileId":this.fileId
                };
                if (this.value && this.value != null) {
                    // 已有图片
                    options.token = this.value;
                    options.scope = options.token.substring(0, options.token.length - 1);
                    // options.displayAvatar = options.contextPath + '/sys/emapcomponent/file/getFileByToken/' + options.token + '.do?date=' + new Date().getTime();
                    options.displayAvatar = options.contextPath + '/sys/emapcomponent/file/getSingleImageByToken.do?fileToken=' + options.token + '&date=' + new Date().getTime();
                    this.imgUrl = options.displayAvatar;
                    options.newToken = false;
                } else {
                    // 新上传
                    options.scope = new Date().getTime() + "" + parseInt(Math.random() * 100).toString();
                    options.token = options.scope + 1;
                    options.displayAvatar = options.defaultAvatar;
                    options.newToken = true;
                }
                options.uploadUrl = options.contextPath + '/sys/emapcomponent/file/uploadTempFile/' + options.scope + '/' + options.token + '.do';
                //options.uploadUrl = options.contextPath + '/sys/emapcomponent/file/uploadTempFile/' + options.scope + '/' + options.token + '.do';
                this.options = options;
                this.initUpload($('input[type=file]', '.bh-emapAvatar-upload'), options)
            },
            initUpload (input, options) {
                /***
                 * emap 相关逻辑代码
                 *
                 */
                var that = this;
                var fileReader = 'FileReader' in window;
                input.fileupload({
                    url: options.uploadUrl,
                    autoUpload: true,
                    multiple: false,
                    dataType: 'json',
                    limitMultiFileUploads: 1,
                    formData: {
                        storeId: that.storeId
                    },
                    submit: function(e, data) {
                        var file = data.files[0];
                        // 文件的大小 和类型校验
                        if (that.type && that.type.length > 0) {
                            // console.log('submit~~~~~~~~~~~~~~~~~~')
                            // console.log(that.type.join('|').toUpperCase())
                            // console.log(file.name.toUpperCase())
                            // console.log(new RegExp(that.type.join('|').toUpperCase()).test(file.name.toUpperCase()))
                            if (!new RegExp(that.type.join('|').toUpperCase()).test(file.name.toUpperCase())) {
                                //window.MINT.Toast('图片类型不对！');
                                return false;
                            }
                        }
                        if (fileReader && that.size) {
                            if (file.size / 1024 > that.size) {
                                //window.MINT.Toast('图片大小限制在'+ that.size + 'KB以内');
                                return false;
                            }
                        }
                    },
                    done: function(e, data) {
                        var file = data.files[0];
                        if (data.result.success) {
                            // 上传成功
                            if (that.mode === 'single') { //单独使用的场景
                                //emit data 学工 2018-0806
                                that.$emit('uploadDone',data);
                                that.$emit('input', options.token);
                                $('.bh-emapAvatar-avatar', options.winContent).attr('src',data.result.tempFileUrl)
                            } else {
                                //debugger
                                that.selectorShow = true;
                                //$('.bh-avatar-img', options.winContent).attr('src','https://www.baidu.com/img/bd_logo1.png').cropper('destroy');
                                $('.bh-avatar-img', options.winContent).attr('src',"http://localhost:8080"+data.result.tempFileUrl).cropper('destroy');
                                that.initCrop($('.bh-avatar-img', options.winContent), options);
                                //$('.bh-avatar-img-block', options.winContent).show();
                                // 上传成功后删除原有的 临时文件图片
                                that.deleteTempFile(options);
                            }
                            that.options.fileId = data.result.id;
                        } else {
                            // 上传失败
                            //window.MINT.Toast('上传失败!');
                            //$('.bh-emapAcatar-error-msg', options.winContent).html($.i18n('bh-au-imageUploadFail')).show();
                        }
                        
                    },
                    fail: function(e, data) {
                        var file = data.files[0];
                        //window.MINT.Toast('上传失败~');
                    }
                });
            },
            initCrop (ele, options) {
                var that = this;
                ele.cropper({
                    aspectRatio: 1/(that.ratio?that.ratio:1),
                    dragMode:'move',
                    viewMode: 1,
                    movable : false,
                    resizable : true,//是否允许改变剪裁框的大小
                    cropBoxMovable :true,//是否允许拖动裁剪框  
                    cropBoxResizable :true,//是否允许拖动 改变裁剪框大小
                    zoomOnWheel: true
                });
            },
            // 删除原有的临时文件
            deleteTempFile(options) {
                var that = this;
                if (options.fileId) {
                    return that.doRequest(
                        options.contextPath + '/sys/emapcomponent/file/deleteTempFile/' + options.scope + '/' + options.token + '/' + options.fileId + '.do', {}
                    );
                }
                return {
                    success: true
                };
            },
            actionGoback(){
                this.selectorShow = false;
            },
            actionCut(){
                var options = this.options;
                var that = this;
                if (options.fileId) {
                    var cutResult = that.cutTempFile(options);
                    if (cutResult.success && that.deleteTempFile(options).success) {
                        that.$emit('input', options.token);
                        tmpFlag = 1;
                        if (options.autoSave && that.deleteFileByToken(options).success && that.saveAttachment(options).success) {
                            options.onSubmit && options.onSubmit(options.token);
                            that.selectorShow = false;
                            $('.bh-emapAvatar-avatar', '.bh-avatar-upload').attr('src', options.contextPath + '/sys/emapcomponent/file/getSingleImageByToken.do?fileToken=' + options.token + '&date=' + new Date().getTime());
                            options.displayAvatar = options.contextPath + '/sys/emapcomponent/file/getSingleImageByToken.do?fileToken=' + options.token + '&date=' + new Date().getTime();
                            return true;
                        } else {
                            that.selectorShow = false;
                            // 调整了onSubmit触发的位置，避免保存成功后临时文件取不到的问题
                            $('.bh-emapAvatar-avatar', '.bh-avatar-upload').attr('src', 'http://localhost:8080'+cutResult.tempFileUrl);
                            $('.bh-emapAvatar-avatar', '.bh-avatar-upload').one('load', function() {
                                options.displayAvatar = cutResult.tempFileUrl;
                                options.onSubmit && options.onSubmit(options.token);
                            })
                        }
                    } else {
                        if (!cutResult.success) {
                            //$('.bh-emapAcatar-error-msg', options.winContent).html(cutResult.error ? cutResult.error : $.i18n('bh-au-avatarFail')).show();
                            //window.MINT.Toast('剪裁失败~');
                            return false;
                        }
                    }
                } else {
                    if (options.newToken) {
                        options.onSubmit && options.onSubmit();
                    } else {
                        options.onSubmit && options.onSubmit(options.token);
                    }
                }
            },
            // 裁剪图片
            cutTempFile(options) {
                var that = this;
                var cutData = $('.bh-avatar-img', options.winContent).cropper('getData', true);
                if (that.actualWidth) {
                    cutData.actualWidth = that.actualWidth;
                    cutData.actualHeight = parseInt(that.actualWidth * (that.ratio?that.ratio:1));
                }
                return that.doRequest(
                    options.contextPath + '/sys/emapcomponent/file/cutTempFile/' + options.scope + '/' + options.token + '/' + options.fileId + '.do',
                    cutData
                );
            },
            deleteFileByToken(options) {
                var that = this;
                return that.doRequest(
                    options.contextPath + '/sys/emapcomponent/file/deleteFileByToken/' + options.token + '.do', {}
                );
            },
            saveAttachment(options) {
                var that = this;
                var saveParams = $.extend({}, {
                    attachmentParam: JSON.stringify({
                        storeId: options.storeId
                    })
                }, options.saveParams);
                return that.doRequest(options.contextPath + '/sys/emapcomponent/file/saveAttachment/' + options.scope + '/' + options.token + '.do', saveParams);
            },
            doRequest(url, param) {
                var result;
                $.ajax({
                    type: 'post',
                    data: param,
                    url: url,
                    dataType: 'json',
                    async: false
                }).done(function(res) {
                    result = res;
                }).fail(function(res) {
                    //$('.bh-emapAcatar-error-msg').html($.i18n('bh-au-requestFail')).show();
                    result = res;
                });
                return result;
            },
            saveAction(){
                if (this.options.fileId) {
                    var result = this.deleteFileByToken(this.options).success && this.saveAttachment(this.options).success;
                    delete this.options.fileId;
                    tmpFlag = '';
                    return result;
                }
            }
        }
    }
</script>
<style>

</style>
<style scoped>
.bh-avatar-upload {
    display: inline-block;
}
.bh-emapAvatar-upload {
    position: relative;
    display: block;
}
.bh-emapAvatar-upload input{
    opacity: 0;
    position:absolute;
    top:0;
    left:0;
}
.avatar-buttons {
    width:100%;
    position: absolute;
    /* bottom: 0; */
    right: 0;
}
.avatar-button {
    width:50%;
    float:left;
}
.select-container {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 998;
    overflow: auto;
}
</style>