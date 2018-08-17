<template>
    <didi-fc-cell :model="model" :class="{'didi-fc-item-error':isValidate}" :ref="name">
        <cube-input v-if="!formReadonly && !readonly" slot="content" v-model="currentValue" :placeholder="placeholderText" class="van-field__control"></cube-input>
        <didi-fc-readonly v-else slot="content" :display="display" :value="value"></didi-fc-readonly>
    </didi-fc-cell>
</template>

<script>
import {ConnectItem} from 'tg-turing'
import DidiFcCell from './cell'
export default {
    name:"didi-fc-text",
    extends: ConnectItem,
    data(){
        return {
            currentValue:'',
            validateItem:this.validate,
            placeholderText:"请输入",
            isValidate:false
        } 
    },
    props:{
        validate:Array|String|Object
    },
    computed:{
        // placeholderText(){
        //     if(this.validateItem && this.validateItem.length>0){
        //         return this.validateItem[0].message;
        //     }
        //     return ;
        // }
    },
    created(){
        //debugger
        this.currentValue = this.value;
    },
    watch:{
        currentValue(val){
            this.$emit("input", val)
        },
        validate:{
            handler(newVal, oldVal) {
                console.log('------val------',newVal)
                this.validateItem = newVal;
                if(this.validateItem && this.validateItem.length>0){
                    this.isValidate = true;
                    this.placeholderText = this.validateItem[0].message;
                }
            },
            deep: true
        }
    },
    methods:{
        // onChange(value){
        //     if (event.isComposing !== true) {
        //         let label = value;
        //         this.$emit("on-item-change", this.name, value, label, this.model)
        //         this.$emit("input", currentValue)
        //     }
        // }
    },
    mounted(){
        
    }
}


</script>
<style scope>
.didi-fc-item-error .cube-input-field::-webkit-input-placeholder { /* WebKit browsers */ 
    color:red !important;
}
</style>
<style>
.cube-form-label {
    width:100px;
}
.cube-form-msg:before {
    color:red;
    content: "\E614";
    padding-left: 5px;
    font-family: cube-icon!important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: .2px;
    -moz-osx-font-smoothing: grayscale;
}
input {
    text-indent: 0;
    background: transparent;
    border: 0 none;
    resize:none; 
    outline:none;  /*清除选中效果的默认蓝色边框 */
    -webkit-appearance:none;  /*清除浏览器默认的样式 */
    line-height: normal;   
}


</style>
