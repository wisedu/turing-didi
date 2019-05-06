<template>
    <form :model="formValue" :label-width="labelWidth" :rules="validateRules" :class="{readonly:readonly}" class="didi-form">
        <tg-cell-group title="">
            <template v-for="item in fields" >
                <slot :name="item.name" :model="item" :value="formValue[item.name]" :display="formValue[item.name + displayFieldFormat]" :ref="'field_' + item.name" :formReadonly="readonly">
                    <component :ref="'field_' + item.name" :model="item" :is="registedComponentList(item, didiForm, 'static', item.index)" v-model="formValue[item.name]" :display="formValue[item.name + displayFieldFormat]" :formReadonly="readonly" :validate="validateResult[item.name]"  @on-item-change="updateValue" v-bind="mergeDefaultParams(item)"></component>
                </slot>
            </template>
        </tg-cell-group>
    </form>
</template>

<script>
import didiForm from "./form";
import {FormConnector} from "tg-turing";
import schema from 'async-validator';


export default {
    name:"didi-fc-form",
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
            var copyValidateRules = JSON.parse(JSON.stringify(this.validateRules));
            //加入长度校验规则
            that.fields.forEach(function(item,index){
                var lengthValidate = {
                    type: "string",
                    field:item,
                    message:'长度超出限制',
                    validator: function(rule, val){
                        var len = 0;
                        for (var index = 0; index < val.length; index++) {
                            if (val[index].match(/[^\x00-\xff]/ig) !== null) {
                                len += 3;
                            } else {
                                len++;
                            }
                        }
                        if (len - (item.dataSize || 400) >0) {
                            return false;
                        } else {
                            return true;
                        }
                        
                    }
                };
                if (copyValidateRules[item.name]) {
                    copyValidateRules[item.name].push(lengthValidate);
                }else {
                    copyValidateRules[item.name] = [lengthValidate];
                }
            });
            // debugger;
            for( var k in copyValidateRules){
                copyValidateRules[k].forEach(function(item,index){
                    if (item.field.msg) {
                        item.message = item.field.msg;
                    } else {
                        if(item.message.indexOf(item.field.caption) === -1){
                            item.message +=item.field.caption;
                        }
                    }
                });
            }
            var validator = new schema(copyValidateRules);

            //当没有传入校验规则时，默认返回true校验通过
            if (!validator.rules || Object.keys(validator.rules).length === 0) {
                if (callback) {
                    callback(true);
                }
                return;
            }

            validator.validate(that.formValue, (errors, fields) => {
                    console.log('validator.validate');
                    console.log(errors,fields);
                    return that.handleErrors(errors, fields,callback);

            });
        },
        handleErrors(errors,fields,callback){
            if(callback){
                if (errors) {
                    this.validateResult = errors;
                    callback(false,fields);
                }else {
                    callback(true,fields);
                }
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
.didi-form .tg-cell-group .md-field .md-field-content .md-field-item {
    /* padding-right:2px; */
}
.didi-form > .tg-cell-group > .md-field > .md-field-content > div:first-child {
    border-top: solid 1px #EDF2FB;
}

</style>
