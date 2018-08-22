<template>
    <form :model="formValue" :label-width="labelWidth" :rules="validateRules" :class="{readonly:readonly}" class="cube-form_standard">
        <template v-for="item in fields" >
            <slot :name="item.name" :model="item" :value="formValue[item.name]" :display="formValue[item.name + displayFieldFormat]" :ref="'field_' + item.name" :formReadonly="readonly">
                <component :ref="'field_' + item.name" :model="item" :is="registedComponentList(item, didiForm, 'static', item.index)" v-model="formValue[item.name]" :display="formValue[item.name + displayFieldFormat]" :formReadonly="readonly" :validate="validateResult[item.name]"  @on-item-change="updateValue" v-bind="mergeDefaultParams(item)"></component>
            </slot>
        </template>
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
            validateResult:[],
            window:window
        }
    },
    computed:{
    },
    methods: {
        validate(callback) {
            var that = this;
            // var copyValidateRules = JSON.parse(JSON.stringify(this.validateRules));
            // for( var k in copyValidateRules){
            //     console.log(k+'长度:',copyValidateRules[k].length)
            //     if(copyValidateRules[k].length === 1){
            //         var caption = copyValidateRules[k][0].field.caption;
            //         console.log('caption:'+caption)
            //         var message = copyValidateRules[k][0].message;
            //         console.log('message:'+message)
            //         var total = message + caption;
            //         this.validateRules[k][0].message=total;
            //     }else {
            //         copyValidateRules[k].forEach(function(item,index){
            //             this.validateRules[k][index].message = item.message + item.field.caption;
            //         });
            //     }
            // }
            for( var k in this.validateRules){
                this.validateRules[k].forEach(function(item,index){
                    item.message +=item.field.caption;
                });
            }
            var validator = new schema(this.validateRules);
            validator.validate(that.formValue, (errors, fields) => {
                //if(errors) {
                    // validation failed, errors is an array of all errors
                    // fields is an object keyed by field name with an array of
                    // errors per field
                    return that.handleErrors(errors, fields,callback);
                //}
                // validation passed
            });
            //this.$refs.form.validate(callback)
        },
        handleErrors(errors,fields,callback){
            if(callback){
                callback(errors,fields)
            }else {
                this.validateResult = fields;
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
