<template>
    <div class="__em-attachment-list">
        <didi-fc-cell :model="model" :class="{'didi-fc-item-error':isValidate,'didi-cell-noshadow':attachments.length}" :ref="name">
        </didi-fc-cell>
        <div class="__em-files">
            <div v-for="(file,index) in attachments" @click="handleClick(file,index)">
                <i class="iconfont" :class="getTypeIcon(file)" slot="icon" v-if="!_isImage(file)"></i>
                <img :src="file.fileUrl" class="__em-img-icon" slot="icon" v-if="_isImage(file)"></img>
                <div class="__em-file-info">
                    <p class="__em-file-info_name">{{param.fileName?(param.fileName + (index + 1)):file.name}}</p>
                    <p class="__em-file-info_size">{{getFileSize(file)}}</p>
                </div>
            </div>
            <md-image-viewer
                v-model="isViewerShow"
                :list="imgs"
                :has-dots="true"
                :initial-index="viewerIndex">
            </md-image-viewer>
        </div>
    </div>
</template>
<script>
import {ConnectItem} from 'tg-turing';
import { Utils } from './formUtils';
import DidiFcCell from './cell';
import ImageViewer from 'mand-mobile/lib/image-viewer';
export default {

    name: 'didi-fc-uploadfile',
    extends: ConnectItem,
    props: {
        // model: {
        //     type: Object,
        //     default: function() {
        //         return {};
        //     }
        // },
        // value: null,
        // titlewidth:{
        //     type: String,
        //     default: function() {
        //         return '';
        //     }
        // },
        // textalign:{
        //     type: String,
        //     default: function() {
        //         return '';//flex-start
        //     }
        // }
    },

    data() {
        return {
            imgs: [
                'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
                'http://manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
                'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/6ee5a0ba9340ca452cbc827902e76be0',
                'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/d751dd4487e265de3b8587f504eee2c3',
            ],
            attachments: [{
                name: 'xxx0.jpg',
                size: '11',
                fileUrl: 'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a'
            },{
                name: 'xxx1.jpg',
                size: '11',
                fileUrl: 'http://manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7'
            },{
                name: 'xxx2.jpg',
                size: '11',
                fileUrl: 'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/6ee5a0ba9340ca452cbc827902e76be0'
            },{
                name: 'xxx3.jpg',
                size: '11',
                fileUrl: 'http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/d751dd4487e265de3b8587f504eee2c3'
            }],
            hostNmae: location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)),
            fileIconEnum: [{
                type: ['xls', 'xlsx'],
                icon: 'icon-xlsx color-xlsx'
            }, {
                type: ['pdf'],
                icon: 'icon-pdf color-pdf'
            }, {
                type: ['zip'],
                icon: 'icon-zip'
            }, {
                type: ['doc', 'docx'],
                icon: 'icon-doc color-doc'
            }, {
                type: ['ppt', 'pptx'],
                icon: 'icon-ppt color-ppt'
            }],
            isValidate:false,
            isViewerShow:false,
            viewerIndex:0
        };
    },

    computed: {
        param() {
            return this.model.initParam?this.model.initParam:{};
        }
    },

    watch: {
        value() {
            this.queryAttachments();
        }
    },

    created() {
        //debugger
        this.queryAttachments();
    },

    methods: {
        queryAttachments() {
            if (this.value) {
                Utils.Post(this.hostNmae + '/sys/emapcomponent/file/getUploadedAttachment.do', {
                    fileToken: this.value
                }).then(({ data }) => {
                    if (data.success) {
                        this.attachments = data.items;
                    }
                });
            }
        },
        getFileSize(file) {
            var fileSize = (file.size / (1000 * 1000)).toFixed(1);
            if (fileSize >= 1) {
                return fileSize + 'MB';
            } else {
                return (file.size / 1000).toFixed(0) + 'KB';
            }
        },
        getTypeIcon(file) {
            let type = this._getFiltType(file);
            let i = this.fileIconEnum.length - 1;
            while (i >= 0) {
                let iconMap = this.fileIconEnum[i];
                if (iconMap.type.indexOf(type) > -1) {
                    return iconMap.icon;
                }
                i--;
            }
            return 'icon-others color-others';
        },
        _getFiltType(file) {
            let match = file.name.toLowerCase().match(/.+\.(.+)?/);
            if (match) {
                return match[1];
            }
            return file.name;
        },
        _isImage(file) {
            let type = this._getFiltType(file);
            return /jpg$|jpeg$|png$|gif$|bmp$/.test(type);
        },
        handleClick(file,indexNum) {
            if (this._isImage(file)) {
                let isWeiXin = () => /micromessenger/.test(navigator.userAgent.toLowerCase());
                let isDingTalk = () => /dingtalk/.test(navigator.userAgent.toLowerCase());
                let isDaliyCampus = () => /wisedu/.test(navigator.userAgent.toLowerCase());
                if (isWeiXin() || isDingTalk() || isDaliyCampus()) {
                    let imgs = [];
                    let index = 0;
                    this.attachments.forEach((item) => {
                        if (this._isImage(item)) {
                            if (item.fileUrl === file.fileUrl) {
                                index = imgs.length;
                            }
                            imgs.push({
                                url:location.origin + item.fileUrl
                            });
                        }
                    });
                    Utils.getJsSDK().preViewImages(imgs, index);
                }else {
                    //window.open(location.origin + file.fileUrl,"_blank");
                    this.isViewerShow = true;
                    this.viewerIndex = indexNum;
                }
            }
        },
        getPreviewUrl(file) {
            if (this._isImage(file)) {
                return null;
            }
            let type = this._getFiltType(file);
            if (type === 'pdf') {
                return this.hostNmae + '/sys/emapcomponent/pdf/index.do?file=' + encodeURIComponent(file.fileUrl);
            }
            return location.origin + file.fileUrl;
        }
    },
    components: {
        [ImageViewer.name]: ImageViewer,
    }
};
</script>
<style lang="css" scoped>
.__em-attachment-list {
    /* padding-left: 17px; */
    
}
.__em-files {
    box-shadow: inset 0 -1px 0 0 #EDF2FB;
    margin-left: 17px;
}
.__em-attachment-list .iconfont {
    font-size: 32px;
    vertical-align: middle;
    margin-right: 8px;
}
.__em-attachment-list-title {
    padding:8px 0;
    /* font-size:14px; */
}
.__em-attachment-list .file-info {
    flex: 1;
}

.__em-attachment-list .color-pdf {
    color: #F26666;
}

.__em-attachment-list .color-doc {
    color: #4A90E2;
}

.__em-attachment-list .color-xlsx {
    color: #A2D06B;
}

.__em-attachment-list .color-ppt {
    color: #F26666;
}

.__em-attachment-list .color-zip {
    color: #92969C;
}

.__em-attachment-list .color-others {
    color: #FFB950;
}

.__em-file-info_size {
    margin-top: 4px;
    font-size: 14px;
    color: #92969C;
}

.__em-file-info {
    width: calc(100% - 42px);
    display:inline-block;
    vertical-align: top;
}

.__em-file-info>p {
    margin: 0;
    padding: 0
}

.__em-file-info .__em-file-info_name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 4px;
}

.__em-img-icon {
    height: 32px;
    width:30px;
    margin-right: 8px;
}
/* 只读表单下的设置 */
.emapm-form.emapm-form-readonly .__em-attachment-list {
    /* border-top-width: 1px;
    border-top-style: solid;
    padding: 8px 0 8px 1px;
    border-color: #E8E8E8; */
}
.emapm-form.emapm-form-readonly .__em-attachment-list-title {
    padding:6px 0;
    font-size:14px;
}
.emapm-form.emapm-form-readonly .__em-attachment-list {
    padding-left: 0px;
}
</style>
<style>
.__em-attachment-list .mint-cell-title {
    display: flex;
    align-items: center;
}
.didi-cell-noshadow.tg-cell .md-field-item .md-field-item-inner {
    box-shadow:none !important;
}
</style>