<template>
    <form :model="formValue" :label-width="labelWidth" :rules="validateRules" :class="{readonly:readonly}" class="didi-form">
        <slot></slot>
    </form>
</template>

<script>
import didiForm from "./form";
import {FormConnector} from "tg-turing";
import schema from 'async-validator';


export default {
    name:"didi-fc-form-custom",
    extends: FormConnector,
    components: {
        
    },
    props:{
        labelWidth:Number,
        value:Object
    },
    watch:{
        fields(val){
            console.log(val)
        }
    },
    created(){
        //debugger
        //console.log(schema)
        //console.log(main)
        console.log(this.fields)
    },
    data(){
        return {
            //当前字段隐藏时，让listview组件所占位的格子也隐藏
            didiForm: didiForm,
            validateResult:{},
            window:window
        }
    },
    computed:{
    },
    methods: {
        validate(callback) {
            var that = this;
            // for( var k in this.validateRules){
            //     this.validateRules[k].forEach(function(item,index){
            //         if(item.message.indexOf(item.field.caption) === -1){
            //             item.message +=item.field.caption;
            //         }
            //     });
            // }
            var validator = new schema(this.validateRules);
//            当没有传入校验规则时，默认返回true校验通过
            if (!validator.rules || Object.keys(validator.rules).length === 0) {
                if (callback) {
                    callback(true);
                }
                return;
            }

            validator.validate(that.formValue, (errors, fields) => {
                return that.handleErrors(errors, fields,callback);
            });
        },
        handleErrors(errors,fields,callback){
            if(callback){
                this.validateResult = errors;
                callback(false,fields)
            }else {
                console.error('验证的回调函数呢~')
            }
            console.log(errors,fields)
        },
        validateField() {
            this.$refs.form.validateField(prop, callback)
        },
        resetFields() {
            this.$refs.form.resetFields();
        },
        mergeDefaultParams(model) {
            //debugger
            let defaultParams = "";
            if(didiForm[model.xtype]){
                defaultParams = didiForm[model.xtype].default
            }
            if (defaultParams !== undefined) {
                return Object.assign({}, JSON.parse(JSON.stringify(defaultParams)), model);
            } else {
                return model;
            }
            
        }
    }
}
</script>

<style>
</style>
