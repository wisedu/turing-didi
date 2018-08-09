<template>
    <form :model="formValue" ref="form" :label-width="labelWidth" :rules="validateRules" :class="{readonly:readonly}" class="cube-form_standard">
        <template v-for="item in fields" v-if="item.hidden !== true">
            <slot :name="item.name" :model="item" :value="formValue[item.name]" :display="formValue[item.name + displayFieldFormat]" :ref="'field_' + item.name" :formReadonly="readonly">
                <div class="cube-form-item border-bottom-1px" :class="{'cube-form-item_required':item.required}" v-if="!item.readonly">
                    <div class="cube-form-label" v-show="item.caption"><span>{{item.caption}}</span></div>
                    <div class="cube-form-field cube-validator">
                        <component :ref="'field_' + item.name" :model="item" :is="registedComponentList(item, didiForm, 'didi-fc-static', item.index)" 
                        v-model="formValue[item.name]" :display="formValue[item.name + displayFieldFormat]" :formReadonly="item.readonly"
                        @on-item-change="updateValue" v-bind="mergeDefaultParams(item)"></component>
                    </div>
                </div>
                <didi-fc-static v-else :caption="item.caption" :prop="item.name" :value="formValue[item.name]" :display="formValue[item.name + displayFieldFormat]"></didi-fc-static>
            </slot>
        </template>
    </form>
</template>

<script>
import didiForm from "./form";
import DidiFcStatic from "./didi-fc-static.vue";
import {FormConnector} from "tg-turing";
import schema from 'async-validator'
//var schema = require('async-validator');
var descriptor = {
  XSBH: {type: "string", required: true}
};
export default {
    name:"didi-fc-form",
    extends: FormConnector,
    components: {
        DidiFcStatic
    },
    props:{
        labelWidth:Number,
        value:Object
    },
    created(){
        console.log(this.fields)
    },
    data(){
        return {
            //当前字段隐藏时，让listview组件所占位的格子也隐藏
            didiForm: didiForm,
        }
    },
    computed:{
        // itemClass() {
        //     //const rules = this.fieldValue.rules
        //     return {
        //     // only handle required rule for now
        //     'cube-form-item_required': true,
        //     'cube-form-item_btn': this.isBtnField,
        //     'cube-form-item_validating': this.validating,
        //     'cube-form-item_pending': this.pending,
        //     'cube-form-item_valid': this.valid,
        //     'cube-form-item_invalid': this.invalid
        //     }
        // }
    },
    methods: {
        validate() {
            //alert('validate')
            var that = this;
            var validator = new schema(descriptor);
            validator.validate(that.formValue, (errors, fields) => {
                if(errors) {
                    // validation failed, errors is an array of all errors
                    // fields is an object keyed by field name with an array of
                    // errors per field
                    return that.handleErrors(errors, fields);
                }
                // validation passed
            });
            //this.$refs.form.validate(callback)
        },
        handleErrors(errors,fields){
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
            let defaultParams = didiForm[model.xtype].default;
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
.cube-form_standard .cube-form-item_required .cube-form-label:before {
    position: absolute;
    left: 6px;
}
.readonly .ivu-form{
    border-top: 1px solid #e9eaec;
    border-left: 1px solid #e9eaec;
}
.readonly .ivu-form .ivu-form-item-label{
    background-color: #f8f8f9;
    border-bottom: 1px solid #e9eaec;
    border-right: 1px solid #e9eaec;
}
.readonly .ivu-form .ivu-form-item{
    margin-bottom: 0;
    display: flex;
}
.readonly .ivu-form .ivu-form-item-content{
    border-bottom: 1px solid #e9eaec;
    border-right: 1px solid #e9eaec;
    width: calc(100% - 100px);
    margin-left: 0!important;
}
.readonly .ivu-form .ivu-upload-select{
    display: none;
}
</style>
